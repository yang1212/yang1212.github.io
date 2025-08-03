<template>
  <div class="container">
    <aside class="sidebar">
      <ul>
        <li
          v-for="file in files"
          :key="file.name"
          :class="{ active: file.name === selectedFile }"
          @click="loadFile(file.name)"
        >
          {{ file.title }}
        </li>
      </ul>
    </aside>
    <div class="content">
      <h1>前端｜框架</h1>
      <div class="top-bar">
        <button
            v-for="type in types"
            :key="type.value"
            :class="{ active: currentType === type.value }"
            @click="switchType(type.value)"
        >
            {{ type.label }}
        </button>
      </div>
      <!-- <img src="@/assets/bg1.png" alt="Psychology" class="content-img" /> -->
     <MarkdownRender :html="renderedContent" class="markdown-body"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { marked } from 'marked';
import MarkdownRender from '@/components/MarkdownRender.vue';

export default {
  name: 'FrameworkPage',
  components: { MarkdownRender },
  props: ['type', 'file'],
  data() {
    return {
        currentType: '',
        types: [
            { value: 'react', label: 'React' },
            { value: 'rn', label: 'React Native' },
            { value: 'vue2', label: 'Vue2' },
            { value: 'vue3', label: 'Vue3' },
            { value: 'css', label: 'CSS' },
            { value: 'program', label: '小程序' }
        ],
        fileMap: {
            react: [
              { name: 'file1', title: '知识点归纳' },
              { name: 'file2', title: '今天只学一个知识点：hooks' },
              { name: 'file3', title: '常用Hooks' },
            ],
            rn: [
              { name: 'file1', title: '知识点归纳' },
              { name: 'file2', title: '对接海外Stripe支付' },
              { name: 'file3', title: '路由导航' },
              { name: 'file4', title: '缓存' },
              { name: 'file5', title: 'Mac配置' },
              { name: 'file6', title: 'android应用签名、打包发布google play ' }
            ],
            vue2: [
              { name: 'file1', title: '知识点归纳' },
            ],
            vue3: [
              { name: 'file1', title: '知识点归纳' },
            ],
            css: [
              { name: 'file1', title: '知识点归纳' },
            ],
            program: [
              { name: 'file1', title: '知识点归纳' },
            ]
        },
        files: [],
        selectedFile: '',
        renderedContent: ''
    };
  },
  watch: {
    '$route.params': {  // 修改为深度监听整个params对象
      handler(newParams) {
        console.log('路由参数变化:', newParams);
        const newType = newParams.type;
        const newFile = newParams.file;

        if (newType) {
          if (this.currentType !== newType) {
            this.currentType = newType;
            this.switchType(newType, false);  // 传入参数跳过路由推送
          }
          if (newFile) {
            this.loadFile(newFile, false);  // 传入参数跳过路由推送
          } else if (this.files.length > 0 && (!this.selectedFile || newType !== this.currentType)) {
            // 如果没有文件参数或类型已变化，加载第一个文件
            this.loadFile(this.files[0].name, false);
          }
        } else if (!this.currentType) {
          // 如果没有类型参数且currentType为空，默认显示react
          this.currentType = 'react';
          this.switchType('react', false);
        }
      },
      deep: true  // 启用深度监听
    }
  },
  mounted() {
    // 初始化时从路由参数获取类型和文件
    const type = this.$route.params.type;
    const file = this.$route.params.file;

    if (type) {
      this.currentType = type;
      this.switchType(type);
      if (file) {
        // 直接加载文件
        this.loadFile(file);
      }
    } else {
      // 默认显示react
      this.currentType = 'react';
      this.switchType('react');
    }
  },
  methods: {
    switchType(type, pushRoute = true) {  // 添加参数控制是否推送路由
      const oldType = this.currentType;
      this.currentType = type;
      this.files = this.fileMap[type] || [];

      if (oldType !== type && pushRoute) {
        const firstFile = this.files.length > 0 ? this.files[0].name : '';
        this.$router.push({
          name: 'Framework',
          params: { type, file: firstFile }
        });
      } else if (this.files.length > 0 && !this.selectedFile) {
        this.loadFile(this.files[0].name, false);
      }
    },
    async loadFile(filename, pushRoute = true) {  // 添加参数控制是否推送路由
      this.selectedFile = filename;

      if (pushRoute) {
        const currentRoute = this.$route;
        if (currentRoute.params.type !== this.currentType || currentRoute.params.file !== filename) {
          this.$router.push({
            name: 'Framework',
            params: { type: this.currentType, file: filename },
            replace: true
          });
        }
      }

      try {
        const res = await axios.get(`/framework/${this.currentType}/${filename}.md`);
        this.renderedContent = marked(res.data);
        console.log('文件加载成功:', filename);
      } catch (err) {
        this.renderedContent = `<p style="color:red;">无法加载文件：${filename}.md</p>`;
        console.error('文件加载失败:', err);
      }
    }
  }
};
</script>

<style scoped>
.top-bar {
  margin-bottom: 20px;
  text-align: left;
}

.top-bar button {
  background: #f0f0f0;
  border: none;
  padding: 8px 16px;
  margin: 10px 8px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
  transition: background 0.3s ease;
}

.top-bar button:hover {
  background: #e0e0e0;
}

.top-bar button.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  font-weight: bold;
}

.content-img {
  display: block;
  width: 80%;       /* 宽度 60% */
  /* 最大宽度限制 */
  height: auto;
  margin: 0 auto 24px 20px; /* 居中，底部留间距 */
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.markdown-body {
  width: 80%;         /* 文字宽度和图片宽度一致 */
  margin: 0 auto 0 15px;
  box-sizing: border-box;
  line-height: 1.7;
  color: #444;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  margin-top: 2em;        /* 增大标题上间距，段落感更强 */
  margin-bottom: 0.8em;
  font-weight: bold;
  line-height: 1.3;
  color: #222;
}

.markdown-body ul,
.markdown-body ol {
  margin-top: 1.2em;
  margin-bottom: 1.5em;
  padding-left: 1.8em;
  color: #444;
}

.markdown-body blockquote {
  margin: 1.5em 0;
  padding-left: 1em;
  border-left: 4px solid #ddd;
  color: #666;
  font-style: italic;
}

.markdown-body pre {
  margin: 1.5em 0;
  background: #f6f8fa;
  padding: 1em;
  border-radius: 6px;
  overflow-x: auto;
}

.container {
  display: flex;
  height: 100vh;
  font-family: 'Helvetica Neue', sans-serif;
}

.sidebar {
  width: 220px;
  background: #f8f9fa;
  border-right: 1px solid #e0e0e0;
  padding: 20px 10px;
  box-sizing: border-box;
  overflow-y: auto;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  padding: 10px 16px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.sidebar li:hover {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color:#fff;
;
}

.sidebar li.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color:#fff;
;
  font-weight: bold;
}

.content {
  flex: 1;
  padding: 0 30px 30px 30px;
  overflow-y: auto;
  line-height: 2;
}

.content h1,
.content h2,
.content h3 {
  color: #333;
  margin-top: 1.2em;
}
.content h1 {
  text-align: center;
  margin-top: 0.2em;
}
.content p {
  color: #555;
  margin-bottom: 1em;
}


@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
    padding: 10px;
  }

  .sidebar ul {
    display: flex;
    overflow-x: auto;
    padding-bottom: 8px;
  }

  .sidebar li {
    flex-shrink: 0;
    white-space: nowrap;
    margin: 0 8px 0 0;
    background: #fff;
    border: 1px solid #ddd;
  }

  .sidebar li.active {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: #fff;
  }

  .content {
    padding: 16px;
  }

  .top-bar {
    flex-wrap: wrap;
  }

  .top-bar button {
    margin: 6px 4px;
    font-size: 14px;
    padding: 6px 12px;
  }

  .markdown-body,
  .content-img {
    width: 100%;
  }
}
</style>
