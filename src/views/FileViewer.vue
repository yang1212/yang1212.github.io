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
          <div class="print-buttons">
            <button @click="handleBatchPrint" class="print-btn batch-print-btn" v-if="batchFiles.length > 0">
              <i class="fas fa-print"></i>
              批量打印 ({{ batchFiles.length }})
            </button>
            <button @click="handlePrint" class="print-btn">
              <i class="fas fa-print"></i>
              打印
            </button>
          </div>
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
      fileContent: null,
      batchFiles: [], // 用于存储批量打印的文件
      isBatchPrinting: false
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
    },
    isInBatchQueue() {
      return this.batchFiles.some(file => file.url === this.fileUrl);
    }
  },
  methods: {
    async fetchMarkdownFromCDN(path) {
      const cdnUrl = `https://cdn.jsdelivr.net/gh/yang1212/collection-about@master/${path}`;
      const res = await fetch(cdnUrl);
      if (!res.ok) throw new Error('加载失败');
      return await res.text();
    },
    async loadFile() {
      this.loading = true;
      this.error = null;
      
      try {
        const encodedPath = this.path
          .split('/')
          .map(part => encodeURIComponent(part))
          .join('/');
      
        
        // 调用
        this.fetchMarkdownFromCDN(`${encodedPath}`).then(content => {
          if (this.isMarkdown) {
            this.fileContent = content;
          } else if (this.isImage) {
            // 如果是图片，直接设置 CDN 地址
            this.fileUrl = `https://cdn.jsdelivr.net/gh/yang1212/collection-about@master/${encodedPath}`;
          }
          this.loading = false;
        }).catch(err => {
          console.error('拉取出错：', err);
        });
      } catch (error) {
        console.error('文件加载错误:', error);
        this.error = error.message || '加载文件时发生错误';
        this.loading = false;
      }
    },
    handlePrint() {
      if (this.isImage) {
        // 对于图片，创建新窗口
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${this.displayName}</title>
              <style>
                @media print {
                  body { margin: 0; padding: 0; }
                  .print-title {
                    text-align: center;
                    font-size: 18pt;
                    font-weight: 900;
                    margin: 0 0 20px 0;
                  }
                  img {
                    max-width: 100%;
                    height: auto;
                    display: block;
                    margin: 0 auto;
                  }
                }
              </style>
            </head>
            <body>
              <div class="print-title">${this.displayName}</div>
              <img src="${this.fileUrl}" alt="${this.displayName}" onload="window.print(); setTimeout(() => window.close(), 1000);">
            </body>
          </html>
        `);
        printWindow.document.close();
      } else {
        // 对于 Markdown，直接打印当前页面
        window.print();
      }
    },
    async handleBatchPrint() {
      this.isBatchPrinting = true;
      const printWindow = window.open('', '_blank');
      
      // 写入HTML头部
      printWindow.document.write(`
        <html>
          <head>
            <title>批量打印</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown.min.css">
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
                  padding: 0;
                }
                .print-page {
                  page-break-after: always;
                  padding: 0;
                }
                .print-title {
                  text-align: center;
                  font-size: 18pt;
                  font-weight: 900;
                  margin: 0 0 20px 0;
                  padding: 0;
                  color: #000000 !important;
                  -webkit-text-fill-color: #000000 !important;
                }
                .print-content {
                  width: 100%;
                  max-width: 100%;
                  padding: 0 20px;
                }
                img {
                  max-width: 100%;
                  height: auto;
                  display: block;
                  margin: 0 auto;
                }
                .markdown-content {
                  font-family: 'Times New Roman', serif;
                  line-height: 1.6;
                }
                .markdown-body {
                  border: none !important;
                  margin: 0 !important;
                  padding: 0 !important;
                  background: none !important;
                }
                .markdown-body pre,
                .markdown-body code {
                  white-space: pre-wrap !important;
                  word-wrap: break-word !important;
                }
              }
            </style>
          </head>
          <body>
      `);

      // 处理每个文件
      for (const file of this.batchFiles) {
        try {
          let content = '';
          if (file.type === 'markdown') {
            const response = await fetch(file.url);
            if (!response.ok) throw new Error('Failed to fetch markdown content');
            content = await response.text();
            // 使用 marked 库渲染 Markdown
            const renderedContent = this.$marked(content);
            printWindow.document.write(`
              <div class="print-page">
                <div class="print-title">${file.name}</div>
                <div class="print-content">
                  <div class="markdown-body">${renderedContent}</div>
                </div>
              </div>
            `);
          } else if (file.type === 'image') {
            printWindow.document.write(`
              <div class="print-page">
                <div class="print-title">${file.name}</div>
                <div class="print-content">
                  <img src="${file.url}" alt="${file.name}">
                </div>
              </div>
            `);
          }
        } catch (error) {
          console.error(`Error processing file ${file.name}:`, error);
        }
      }

      // 关闭HTML文档
      printWindow.document.write('</body></html>');
      printWindow.document.close();

      // 等待所有图片加载完成后打印
      const images = printWindow.document.getElementsByTagName('img');
      let loadedImages = 0;
      const totalImages = images.length;

      if (totalImages === 0) {
        printWindow.print();
        setTimeout(() => printWindow.close(), 1000);
      } else {
        for (const img of images) {
          if (img.complete) {
            loadedImages++;
            if (loadedImages === totalImages) {
              printWindow.print();
              setTimeout(() => printWindow.close(), 1000);
            }
          } else {
            img.onload = () => {
              loadedImages++;
              if (loadedImages === totalImages) {
                printWindow.print();
                setTimeout(() => printWindow.close(), 1000);
              }
            };
          }
        }
      }

      this.isBatchPrinting = false;
    },

    // 添加文件到批量打印队列
    addToBatchPrint() {
      const fileInfo = {
        name: this.displayName,
        url: this.fileUrl,
        type: this.isMarkdown ? 'markdown' : this.isImage ? 'image' : 'unsupported'
      };
      
      // 检查文件是否已在队列中
      const exists = this.batchFiles.some(file => file.url === fileInfo.url);
      if (!exists && (fileInfo.type === 'markdown' || fileInfo.type === 'image')) {
        this.batchFiles.push(fileInfo);
      }
    },

    // 从批量打印队列中移除文件
    removeFromBatchPrint() {
      const index = this.batchFiles.findIndex(file => file.url === this.fileUrl);
      if (index !== -1) {
        this.batchFiles.splice(index, 1);
      }
    },
  },
  created() {
    this.loadFile();
  },
  watch: {
    path: {
      handler: 'loadFile',
      immediate: true
    }
  },
  mounted() {
    // 添加打印样式
    const style = document.createElement('style');
    style.textContent = `
      @media print {
        .navbar, .breadcrumb, .file-meta, .print-buttons {
          display: none !important;
        }
        body {
          margin: 0;
          padding: 0;
        }
        .file-body {
          padding: 20px !important;
        }
        .file-body::before {
          content: attr(data-filename);
          display: block;
          text-align: center;
          font-size: 18pt;
          font-weight: 900;
          margin-bottom: 20px;
          font-family: 'Times New Roman', serif;
        }
        .markdown-body {
          border: none !important;
          margin: 0 !important;
          padding: 0 !important;
          background: none !important;
        }
        .markdown-body pre,
        .markdown-body code {
          white-space: pre-wrap !important;
          word-wrap: break-word !important;
        }
        img {
          max-width: 100% !important;
          height: auto !important;
          display: block !important;
          margin: 0 auto !important;
        }
        * {
          color: #000 !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
      }
    `;
    document.head.appendChild(style);
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

.print-buttons {
  display: flex;
  gap: 10px;
  align-items: center;
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
  transition: all 0.2s;
}

.print-btn:hover {
  background-color: #3aa876;
}

.toggle-batch-btn {
  background-color: #606c76;
}

.toggle-batch-btn:hover {
  background-color: #4a545c;
}

.toggle-batch-btn.selected {
  background-color: #42b983;
}

.toggle-batch-btn.selected:hover {
  background-color: #3aa876;
}

.batch-print-btn {
  background-color: #2c3e50;
}

.batch-print-btn:hover {
  background-color: #1a2634;
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

  .print-buttons {
    flex-direction: column;
    width: 100%;
  }

  .print-btn {
    width: 100%;
    justify-content: center;
  }
}

@media print {
  /* 隐藏所有不必要的元素 */
  .navbar,
  .breadcrumb,
  .file-meta,
  .file-header,
  .file-title i,
  .unsupported-file i,
  .print-buttons {
    display: none !important;
  }

  /* 移除所有装饰性样式 */
  * {
    background: none !important;
    box-shadow: none !important;
    border: none !important;
    color: #000000 !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }

  /* 只显示文件名和内容 */
  .file-body {
    padding: 0 20px !important;
  }

  .file-body::before {
    content: attr(data-filename);
    display: block;
    text-align: center;
    font-size: 18pt !important;
    font-weight: 900 !important;
    color: rgb(0, 0, 0) !important;
    -webkit-text-fill-color: rgb(0, 0, 0) !important;
    margin: 0 0 20px 0 !important;
    padding: 0 !important;
    font-family: 'Times New Roman', serif !important;
  }

  /* Markdown 内容样式 */
  .markdown-viewer {
    line-height: 1.6 !important;
    font-family: 'Times New Roman', serif !important;
  }

  .markdown-viewer pre,
  .markdown-viewer code {
    white-space: pre-wrap !important;
    word-wrap: break-word !important;
  }

  /* 图片样式 */
  .image-viewer {
    padding: 0 !important;
  }

  .image-viewer img {
    max-width: 100% !important;
    height: auto !important;
    display: block !important;
    margin: 0 auto !important;
  }
}
</style> 