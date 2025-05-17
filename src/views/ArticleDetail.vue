<template>
  <div class="article-detail">
    <article class="content" v-if="article">
      <header class="article-header">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <span class="date">{{ formatDate(article.lastUpdated) }}</span>
          <span class="category">{{ article.category }}</span>
          <div class="tags" v-if="article.tags">
            <span v-for="tag in article.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </header>

      <markdown-renderer :content="article.content" />

      <footer class="article-footer">
        <div class="navigation">
          <router-link 
            v-if="article.prevArticle" 
            :to="'/article/' + article.prevArticle.id"
            class="nav-link prev"
          >
            <span class="nav-label">上一篇</span>
            <span class="nav-title">{{ article.prevArticle.title }}</span>
          </router-link>
          <router-link 
            v-if="article.nextArticle" 
            :to="'/article/' + article.nextArticle.id"
            class="nav-link next"
          >
            <span class="nav-label">下一篇</span>
            <span class="nav-title">{{ article.nextArticle.title }}</span>
          </router-link>
        </div>
      </footer>
    </article>
    <div v-else-if="error" class="error-state">
      <i class="fas fa-exclamation-circle"></i>
      <span>{{ error }}</span>
    </div>
    <div v-else class="loading">
      <i class="fas fa-spinner fa-spin"></i>
      <span>加载中...</span>
    </div>
  </div>
</template>

<script>
import MarkdownRenderer from '@/components/MarkdownRenderer.vue';
import { getFileContent, getIssueDetail, parseMarkdownMetadata } from '@/services/github';

export default {
  name: 'ArticleDetail',
  components: {
    MarkdownRenderer
  },
  data() {
    return {
      article: null,
      isIssue: false,
      error: null
    };
  },
  methods: {
    formatDate(date) {
      if (!date) return '';
      return new Date(date).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    async loadArticle() {
      const { id } = this.$route.params;
      console.log('【加载文章】开始加载:', id);
      this.article = null;
      this.error = null;

      try {
        if (id.startsWith('issue-')) {
          // 从 Issues 加载
          const issueNumber = id.replace('issue-', '');
          const issue = await getIssueDetail(issueNumber);
          if (issue) {
            this.article = {
              title: issue.title,
              content: issue.body,
              lastUpdated: issue.updated_at,
              category: issue.labels[0]?.name || '未分类',
              tags: issue.labels.map(label => label.name)
            };
          } else {
            this.error = '未找到该 Issue 或内容无法加载。';
          }
        } else {
          // 从仓库文件加载
          console.log('【加载文章】从文件加载:', id);
          
          // 1. 处理路径中的特殊字符
          const decodedId = decodeURIComponent(id);
          console.log('【加载文章】解码后的路径:', decodedId);
          
          const result = await getFileContent(decodedId);
          console.log('【加载文章】获取到结果:', result);
          
          if (result && result.content) {
            // 2. 从文件名中提取标题
            const fileName = decodedId.split('/').pop();
            const title = fileName.replace(/\.md$/, '').replace(/^\d+\s*-\s*/, '');
            
            console.log('【加载文章】解析内容:', result.content.substring(0, 100) + '...');
            const metadata = parseMarkdownMetadata(result.content);
            console.log('【加载文章】解析后的元数据:', metadata);
            
            this.article = {
              title: metadata.title || title,
              content: metadata.content || result.content,
              lastUpdated: result.lastUpdated,
              category: metadata.category || decodedId.split('/')[0] || '未分类'
            };
            console.log('【加载文章】设置文章数据:', this.article);
          } else {
            console.log('【加载文章】未获取到内容');
            this.error = '未找到该文章或内容无法加载。';
          }
        }
      } catch (error) {
        console.error('【加载文章】发生错误:', error);
        this.error = '加载文章时发生错误，请稍后重试。';
      }
    }
  },
  created() {
    this.loadArticle();
  },
  watch: {
    '$route'(to, from) {
      if (to.params.id !== from.params.id) {
        this.loadArticle();
      }
    }
  }
}
</script>

<style scoped>
.article-detail {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 40px;
}

.article-header {
  margin-bottom: 40px;
}

.article-header h1 {
  font-size: 2.5em;
  color: #2c3e50;
  margin-bottom: 20px;
}

.article-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  color: #666;
  font-size: 0.9em;
}

.tags {
  display: flex;
  gap: 8px;
}

.tag {
  background: #f0f2f5;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.9em;
}

.article-footer {
  margin-top: 60px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.navigation {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.nav-link {
  flex: 1;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background: #e9ecef;
}

.nav-link.prev {
  text-align: left;
}

.nav-link.next {
  text-align: right;
}

.nav-label {
  display: block;
  font-size: 0.9em;
  color: #666;
  margin-bottom: 5px;
}

.nav-title {
  display: block;
  font-weight: 500;
  color: #2c3e50;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #666;
  gap: 15px;
}

.loading i {
  font-size: 2em;
  color: #667eea;
}

.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #666;
  gap: 15px;
}

.error-state i {
  font-size: 2em;
  color: #e74c3c;
}

@media (max-width: 768px) {
  .article-detail {
    padding: 10px;
  }

  .content {
    padding: 20px;
  }

  .article-header h1 {
    font-size: 2em;
  }

  .navigation {
    flex-direction: column;
  }
}
</style> 