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
      <h1>前端｜语言</h1>
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

      <MarkdownRender :html="renderedContent" class="markdown-body"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import MarkdownRender from '@/components/MarkdownRender.vue';
import { marked } from 'marked';

export default {
  name: 'LanguagePage',
  components: { MarkdownRender },
  props: ['type'],
  data() {
    return {
        currentType: '',
        types: [
            { value: 'js', label: 'JS' },
            { value: 'es6', label: 'ES6' },
            { value: 'ts', label: 'TS' },
            { value: 'handwritten', label: '手写系列' },
            { value: 'designPatterns', label: '设计模式' }
        ],
        fileMap: {
            js: [
              { name: 'file1.md', title: '知识点归纳' },
              { name: 'file2.md', title: '数组方法汇总' },
              { name: 'file3.md', title: '常用原生方法' },
              { name: 'file4.md', title: '精度丢失' },
              { name: 'file5.md', title: '宏任务、微任务' }
            ],
            es6: [
              { name: 'file1.md', title: '知识点归纳' },
            ],
            ts: [
              { name: 'file1.md', title: '知识点归纳' },
            ],
            handwritten: [
              { name: 'file1.md', title: '知识点归纳' },
            ],
            designPatterns: [
              { name: 'file1.md', title: '知识点归纳' },
              { name: 'file2.md', title: '常见前端设计模式' },
            ]
        },
        files: [],
        selectedFile: '',
        renderedContent: ''
    };
  },
  watch: {
    '$route.params.type': function(newType) {
      if (newType) {
        this.currentType = newType;
        this.switchType(newType);
      } else {
        // 如果没有类型参数，默认显示js
        this.currentType = 'js';
        this.switchType('js');
      }
    }
  },
  mounted() {
    // 初始化时从路由参数获取类型
    const type = this.$route.params.type;
    console.log(233, type)
    if (type) {
      this.currentType = type;
      this.switchType(type);
    } else {
      // 默认显示js
      this.currentType = 'js';
      this.switchType('js');
    }
  },
  methods: {
    switchType(type) {
        // 保存旧类型用于比较
        const oldType = this.currentType;
        this.currentType = type;
        
        // 只有当类型实际变化时才更新路由
        if (oldType !== type) {
            this.$router.push({ name: 'Language', params: { type } });
        }
        
        // 无论类型是否变化，都更新文件列表并加载默认文件
        this.files = this.fileMap[type] || [];
        if (this.files.length > 0) {
            this.loadFile(this.files[0].name);
        }
    },
    async loadFile(filename) {
        this.selectedFile = filename;
        try {
          const res = await axios.get(`/language/${this.currentType}/${filename}`);
          this.renderedContent = marked(res.data);
        } catch (err) {
          this.renderedContent = `<p style="color:red;">无法加载文件：${filename}</p>`;
        }
    }
  }
};
</script>

<style scoped>
.top-bar {
  margin-bottom: 20px;
  text-align: left;
  margin-left: 25px;
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
  margin: 0 auto 0 15px;     /* 居中 */
  box-sizing: border-box;
  line-height: 1.7;
  color: #444;
  padding: 16px;
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