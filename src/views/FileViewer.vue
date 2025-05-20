<template>
  <div class="file-viewer">
    <!-- 面包屑导航 -->
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

    <div v-if="loading" class="loading-state">
      <i class="fas fa-spinner fa-spin"></i>
      <span>加载中...</span>
    </div>

    <div v-else-if="error" class="error-state">
      <i class="fas fa-exclamation-circle"></i>
      <p>{{ error }}</p>
    </div>

    <div v-else class="file-content">
      <!-- 文件信息头部 -->
      <div class="file-header">
        <div class="file-title">
          <i :class="fileIcon"></i>
          <h1>{{ displayName }}</h1>
        </div>
        <div class="file-meta">
          <span class="file-type">{{ fileType }}</span>
          <button @click="handlePrint" class="print-btn">
            <i class="fas fa-print"></i>
            打印
          </button>
        </div>
      </div>

      <!-- 文件内容 -->
      <div class="file-body" :data-filename="displayName">
        <!-- Markdown 预览 -->
        <div v-if="isMarkdown" class="markdown-viewer">
          <markdown-renderer :content="fileContent" />
        </div>
        
        <!-- 图片预览 -->
        <div v-else-if="isImage" class="image-viewer">
          <img :src="fileUrl" :alt="displayName" />
        </div>
        
        <!-- 其他文件类型 -->
        <div v-else class="unsupported-file">
          <i class="fas fa-file"></i>
          <p>此文件类型暂不支持预览</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownRenderer from '@/components/MarkdownRenderer.vue';

export default {
  name: 'FileViewer',
  components: {
    MarkdownRenderer
  },
  props: {
    path: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: true,
      error: null,
      fileUrl: null,
      fileContent: null
    }
  },
  computed: {
    fileName() {
      return this.path.split('/').pop();
    },
    displayName() {
      return this.fileName
        .replace(/^\d+\s*-\s*/, '') // 移除开头的序号
        .replace(/\.[^/.]+$/, '');   // 移除扩展名
    },
    fileExtension() {
      return this.fileName.split('.').pop().toLowerCase();
    },
    isImage() {
      return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(this.fileExtension);
    },
    isMarkdown() {
      return this.fileExtension === 'md';
    },
    fileIcon() {
      const icons = {
        md: 'fas fa-file-alt',
        jpg: 'fas fa-image',
        jpeg: 'fas fa-image',
        png: 'fas fa-image',
        gif: 'fas fa-image',
        pdf: 'fas fa-file-pdf',
        default: 'fas fa-file'
      };
      return icons[this.fileExtension] || icons.default;
    },
    fileType() {
      const types = {
        md: 'Markdown 文档',
        jpg: '图片文件',
        jpeg: '图片文件',
        png: '图片文件',
        gif: '动图文件',
        pdf: 'PDF 文档',
        default: '未知文件类型'
      };
      return types[this.fileExtension] || types.default;
    },
    breadcrumbs() {
      const crumbs = [{
        name: '首页',
        path: '/'
      }];
      
      let currentPath = '/category';
      const segments = this.path.split('/');
      
      // 移除最后一个（文件名）
      segments.pop();
      
      for (const segment of segments) {
        currentPath += '/' + segment;
        crumbs.push({
          name: segment,
          path: currentPath
        });
      }
      
      return crumbs;
    }
  },
  methods: {
    async loadFile() {
      this.loading = true;
      this.error = null;
      
      try {
        // 构建 GitHub raw 文件 URL
        const encodedPath = this.path
          .split('/')
          .map(part => encodeURIComponent(part))
          .join('/');
          
        this.fileUrl = `https://raw.githubusercontent.com/yang1212/collection-about/master/${encodedPath}`;
        
        // 如果是 Markdown 文件，获取内容
        if (this.isMarkdown) {
          const response = await fetch(this.fileUrl);
          if (!response.ok) {
            throw new Error('Failed to fetch file content');
          }
          this.fileContent = await response.text();
        }
        
        this.loading = false;
      } catch (error) {
        console.error('Error loading file:', error);
        this.error = '加载文件时发生错误';
        this.loading = false;
      }
    },
    handlePrint() {
      if (this.isImage) {
        // 如果是图片，创建一个新窗口来打印图片
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
          <html>
            <head>
              <title>${this.displayName}</title>
              <style>
                @media print {
                  * {
                    color: #000000 !important;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                    color-adjust: exact !important;
                  }
                  body {
                    margin: 0;
                    padding: 20px;
                  }
                  .print-title {
                    text-align: center;
                    font-size: 18pt;
                    font-weight: 900;
                    margin-bottom: 20px;
                    color: #000000 !important;
                    -webkit-text-fill-color: #000000 !important;
                  }
                  .print-image {
                    display: flex;
                    justify-content: center;
                  }
                  img {
                    max-width: 100%;
                    height: auto;
                  }
                }
              </style>
            </head>
            <body>
              <div class="print-title">${this.displayName}</div>
              <div class="print-image">
                <img src="${this.fileUrl}" alt="${this.displayName}">
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.onload = function() {
          printWindow.focus();
          printWindow.print();
          setTimeout(() => printWindow.close(), 1000);
        };
      } else {
        // 如果是 Markdown 文件，直接打印当前页面
        window.print();
      }
    }
  },
  created() {
    this.loadFile();
  },
  watch: {
    path: {
      handler: 'loadFile',
      immediate: true
    }
  }
}
</script>

<style scoped>
.file-viewer {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  color: #666;
  font-size: 0.9em;
  margin-bottom: 20px;
}

.breadcrumb-item {
  color: inherit;
  text-decoration: none;
}

.breadcrumb-item:hover {
  color: #42b983;
}

.separator {
  color: #999;
}

.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #666;
  gap: 15px;
}

.file-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.file-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.file-title {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.file-title i {
  font-size: 2em;
  color: #42b983;
}

.file-title h1 {
  font-size: 1.8em;
  color: #2c3e50;
  margin: 0;
}

.file-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #666;
}

.file-type {
  background: #f0f2f5;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.9em;
}

.print-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.2s;
}

.print-btn:hover {
  background-color: #3aa876;
}

.print-btn i {
  font-size: 1em;
}

.file-body {
  padding: 20px;
}

.markdown-viewer {
  line-height: 1.6;
  font-size: 16px;
}

.image-viewer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 4px;
}

.image-viewer img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.unsupported-file {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 40px;
  color: #666;
  text-align: center;
}

.unsupported-file i {
  font-size: 3em;
  color: #42b983;
}

@media (max-width: 768px) {
  .file-viewer {
    padding: 10px;
  }
  
  .file-title h1 {
    font-size: 1.4em;
  }
  
  .file-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}

@media print {
  /* 隐藏所有不必要的元素 */
  .navbar,
  .breadcrumb,
  .file-meta,
  .file-header,
  .file-title i,
  .unsupported-file i {
    display: none !important;
  }

  /* 移除所有装饰性样式 */
  * {
    background: none !important;
    box-shadow: none !important;
    border: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  /* 只显示文件名和内容 */
  .file-body {
    padding: 20px !important;
  }

  .file-body::before {
    content: attr(data-filename);
    display: block;
    text-align: center;
    font-size: 24pt !important;
    font-weight: 900 !important;
    color: rgb(0, 0, 0) !important;
    -webkit-text-fill-color: rgb(0, 0, 0) !important;
    margin-bottom: 30px !important;
    font-family: 'Times New Roman', serif !important;
  }
}
</style> 