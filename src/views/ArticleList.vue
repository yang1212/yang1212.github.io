<template>
  <div class="article-list-page">
    <header class="category-header">
      <h1>{{ currentCategory.name }}</h1>
      <p>{{ currentCategory.description }}</p>
      
      <!-- 添加面包屑导航 -->
      <div class="breadcrumb" v-if="breadcrumbs.length > 1">
        <router-link 
          v-for="(crumb, index) in breadcrumbs" 
          :key="index"
          :to="crumb.path"
          class="breadcrumb-item"
        >
          {{ crumb.name }}
          <span v-if="index < breadcrumbs.length - 1" class="separator">/</span>
        </router-link>
      </div>
    </header>

    <div v-if="loading" class="loading-state">
      <i class="fas fa-spinner fa-spin"></i>
      <span>加载中...</span>
    </div>

    <div v-else-if="error" class="error-state">
      <i class="fas fa-exclamation-circle"></i>
      <p>{{ error }}</p>
      <el-button type="primary" @click="loadContent">重试</el-button>
    </div>

    <div v-else class="content">
      <div v-if="folders.length === 0 && files.length === 0" class="empty-state">
        <i class="fas fa-inbox"></i>
        <p>暂无内容</p>
      </div>
      
      <!-- 显示文件夹 -->
      <div class="folders" v-if="folders.length > 0">
        <router-link 
          v-for="folder in folders" 
          :key="folder.path"
          :to="currentFullPath + '/' + folder.name"
          class="folder-card"
        >
          <div class="folder-content">
            <i class="fas fa-folder"></i>
            <h3>{{ folder.name }}</h3>
          </div>
        </router-link>
      </div>

      <!-- 显示文章和其他文件 -->
      <div class="articles-grid" v-if="files.length > 0">
        <router-link 
          v-for="file in files" 
          :key="file.path"
          :to="getFileRoute(file)"
          class="file-card"
        >
          <div class="file-content">
            <i :class="getFileIcon(file)"></i>
            <h2>{{ getDisplayName(file.name) }}</h2>
            <p class="file-meta">
              <span class="date">{{ formatDate(file.lastModified) }}</span>
              <span class="file-type">{{ getFileType(file) }}</span>
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getMarkdownFiles } from '@/services/github';

export default {
  name: 'ArticleList',
  props: {
    categoryId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      files: [],
      folders: [],
      loading: false,
      error: null
    }
  },
  computed: {
    // 获取当前完整路径
    currentFullPath() {
      return '/category' + (this.categoryId ? '/' + this.categoryId : '');
    },
    // 获取当前路径数组
    pathSegments() {
      return this.categoryId ? this.categoryId.split('/') : [];
    },
    // 生成面包屑导航
    breadcrumbs() {
      const crumbs = [{
        name: '首页',
        path: '/'
      }];
      
      let path = '/category';
      for (const segment of this.pathSegments) {
        path += '/' + segment;
        crumbs.push({
          name: this.getDisplayName(segment),
          path: path
        });
      }
      
      return crumbs;
    },
    currentCategory() {
      const firstSegment = this.pathSegments[0];
      if (!firstSegment) {
        return {
          name: '所有分类',
          description: '浏览所有文章分类'
        };
      }

      // 遍历所有分类组查找匹配的分类
      for (const group of this.$root.$data.categoryGroups) {
        const category = group.categories.find(cat => cat.id === firstSegment);
        if (category) {
          // 如果有子目录，显示完整路径
          if (this.pathSegments.length > 1) {
            const subPath = this.pathSegments.slice(1).join(' / ');
            return {
              name: `${category.name} / ${subPath}`,
              description: category.description
            };
          }
          return {
            name: category.name,
            description: category.description
          };
        }
      }

      return {
        name: this.getDisplayName(this.pathSegments[this.pathSegments.length - 1]),
        description: '浏览当前目录内容'
      };
    }
  },
  methods: {
    // 获取文件图标
    getFileIcon(file) {
      const ext = file.name.split('.').pop().toLowerCase();
      const icons = {
        md: 'fas fa-file-alt',
        jpg: 'fas fa-image',
        jpeg: 'fas fa-image',
        png: 'fas fa-image',
        gif: 'fas fa-image',
        pdf: 'fas fa-file-pdf',
        default: 'fas fa-file'
      };
      return icons[ext] || icons.default;
    },
    
    // 获取文件类型显示名称
    getFileType(file) {
      const ext = file.name.split('.').pop().toLowerCase();
      const types = {
        md: 'Markdown',
        jpg: '图片',
        jpeg: '图片',
        png: '图片',
        gif: '图片',
        pdf: 'PDF',
        default: '文件'
      };
      return types[ext] || types.default;
    },
    
    // 获取文件路由
    getFileRoute(file) {
      return '/file/' + file.path;
    },
    
    // 获取显示名称（去掉序号和扩展名）
    getDisplayName(fileName) {
      return fileName
        .replace(/^\d+\s*-\s*/, '') // 移除开头的序号
        .replace(/\.[^/.]+$/, '');   // 移除扩展名
    },
    
    formatDate(date) {
      if (!date) return '';
      return new Date(date).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    
    // 添加自然排序函数
    naturalSort(a, b) {
      const pattern = /(\d+)|(\D+)/g;
      const ax = [], bx = [];
      
      a.name.match(pattern).forEach(item => {
        ax.push(item.match(/\d+/) ? parseInt(item) : item.toLowerCase());
      });
      
      b.name.match(pattern).forEach(item => {
        bx.push(item.match(/\d+/) ? parseInt(item) : item.toLowerCase());
      });
      
      for (let i = 0; i < Math.min(ax.length, bx.length); i++) {
        if (ax[i] !== bx[i]) {
          return ax[i] > bx[i] ? 1 : -1;
        }
      }
      return ax.length - bx.length;
    },
    
    async loadContent() {
      this.loading = true;
      this.error = null;
      
      try {
        // 获取当前路径的内容
        const items = await getMarkdownFiles(this.categoryId || '');
        
        // 分离文件夹和文件并排序
        this.folders = items
          .filter(item => item.type === 'dir')
          .sort(this.naturalSort);
          
        this.files = items
          .filter(item => item.type === 'file')
          .sort(this.naturalSort);
      } catch (error) {
        console.error('Error loading content:', error);
        this.error = '加载内容时发生错误，请稍后重试。';
      } finally {
        this.loading = false;
      }
    }
  },
  created() {
    this.loadContent();
  },
  watch: {
    categoryId: {
      handler: 'loadContent',
      immediate: true
    }
  }
}
</script>

<style scoped>
.article-list-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.category-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
}

.category-header h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
}

.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 40px;
  color: #666;
}

.loading-state i,
.error-state i,
.empty-state i {
  font-size: 2em;
  margin-bottom: 10px;
  color: #667eea;
}

.error-state {
  color: #dc3545;
}

.error-state i {
  color: #dc3545;
}

.articles {
  display: grid;
  gap: 20px;
}

.article-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease;
}

.article-card:hover {
  transform: translateY(-5px);
}

.article-content {
  padding: 20px;
}

.article-content h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #2c3e50;
}

.article-meta {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 0.9em;
  color: #666;
}

.date {
  margin-right: 15px;
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  background: #f0f2f5;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.8em;
}

.article-excerpt {
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .article-list-page {
    padding: 10px;
  }

  .category-header {
    padding: 20px 0;
  }

  .category-header h1 {
    font-size: 2em;
  }
}

.folders {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.folder-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
}

.folder-card:hover {
  transform: translateY(-5px);
}

.folder-content {
  display: flex;
  align-items: center;
  gap: 15px;
}

.folder-content i {
  font-size: 24px;
  color: #667eea;
}

.folder-content h3 {
  margin: 0;
  font-size: 1.2em;
  color: #2c3e50;
}

.articles-grid {
  display: grid;
  gap: 20px;
}

/* 添加面包屑导航样式 */
.breadcrumb {
  margin-top: 20px;
  font-size: 0.9em;
  color: rgba(255, 255, 255, 0.9);
}

.breadcrumb-item {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb-item:hover {
  color: white;
  text-decoration: underline;
}

.separator {
  margin: 0 8px;
  color: rgba(255, 255, 255, 0.7);
}

.file-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  color: inherit;
  overflow: hidden;
}

.file-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.file-content {
  padding: 20px;
}

.file-content i {
  font-size: 2em;
  color: #42b983;
  margin-bottom: 15px;
}

.file-content h2 {
  margin: 10px 0;
  font-size: 1.2em;
  color: #2c3e50;
}

.file-meta {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.9em;
}

.file-type {
  background: #f0f2f5;
  padding: 2px 8px;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .articles-grid {
    grid-template-columns: 1fr;
  }
}
</style> 