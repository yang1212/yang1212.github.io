<template>
  <div class="markdown-content" v-html="renderedContent"></div>
</template>

<script>
import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';
import toc from 'markdown-it-toc-done-right';
import prism from 'markdown-it-prism';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-sql';

export default {
  name: 'MarkdownRenderer',
  props: {
    content: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      md: new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
        breaks: true
      })
    };
  },
  created() {
    this.md
      .use(anchor, {
        permalink: true,
        permalinkBefore: true,
        permalinkSymbol: '#'
      })
      .use(toc, {
        level: [2, 3],
        containerClass: 'table-of-contents',
        listType: 'ul'
      })
      .use(prism);
  },
  computed: {
    renderedContent() {
      return this.md.render(this.content);
    }
  }
};
</script>

<style>
.markdown-content {
  line-height: 1.8;
  color: #2c3e50;
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  margin: 1.5em 0 1em;
  font-weight: 600;
  position: relative;
}

.markdown-content h1 { font-size: 2em; }
.markdown-content h2 { font-size: 1.8em; }
.markdown-content h3 { font-size: 1.6em; }
.markdown-content h4 { font-size: 1.4em; }
.markdown-content h5 { font-size: 1.2em; }
.markdown-content h6 { font-size: 1em; }

.markdown-content p {
  margin: 1em 0;
}

.markdown-content a {
  color: #667eea;
  text-decoration: none;
}

.markdown-content a:hover {
  text-decoration: underline;
}

.markdown-content code {
  background-color: #f5f7fa;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', monospace;
  font-size: 0.9em;
}

.markdown-content pre {
  background-color: #f5f7fa;
  padding: 1em;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1em 0;
}

.markdown-content pre code {
  background-color: transparent;
  padding: 0;
  font-size: 0.9em;
  line-height: 1.5;
}

.markdown-content blockquote {
  border-left: 4px solid #667eea;
  margin: 1em 0;
  padding: 0.5em 1em;
  background-color: #f8fafc;
}

.markdown-content ul,
.markdown-content ol {
  padding-left: 2em;
  margin: 1em 0;
}

.markdown-content img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1em 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.markdown-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1em 0;
}

.markdown-content th,
.markdown-content td {
  border: 1px solid #e2e8f0;
  padding: 0.5em 1em;
  text-align: left;
}

.markdown-content th {
  background-color: #f8fafc;
  font-weight: 600;
}

.markdown-content tr:nth-child(even) {
  background-color: #f8fafc;
}

/* 目录样式 */
.table-of-contents {
  background: #f8fafc;
  padding: 1.5em;
  border-radius: 8px;
  margin: 2em 0;
}

.table-of-contents ul {
  list-style-type: none;
  padding-left: 1.5em;
}

.table-of-contents li {
  margin: 0.5em 0;
}

.table-of-contents a {
  color: #2c3e50;
  text-decoration: none;
}

.table-of-contents a:hover {
  color: #667eea;
}

/* 标题锚点样式 */
.header-anchor {
  float: left;
  margin-left: -0.87em;
  padding-right: 0.23em;
  margin-top: 0.125em;
  opacity: 0;
  transition: opacity 0.2s;
  text-decoration: none;
  color: #667eea;
}

.markdown-content h1:hover .header-anchor,
.markdown-content h2:hover .header-anchor,
.markdown-content h3:hover .header-anchor,
.markdown-content h4:hover .header-anchor,
.markdown-content h5:hover .header-anchor,
.markdown-content h6:hover .header-anchor {
  opacity: 1;
}

/* 代码块行号 */
.line-numbers .line-numbers-rows {
  border-right: 1px solid #ddd;
}

/* 代码高亮主题覆盖 */
.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: #898ea4;
}

.token.punctuation {
  color: #5e6687;
}

.token.namespace {
  opacity: .7;
}

.token.operator,
.token.boolean,
.token.number {
  color: #c76b29;
}

.token.property {
  color: #c08b30;
}

.token.tag {
  color: #3d8fd1;
}

.token.string {
  color: #22a2c9;
}

.token.selector {
  color: #6679cc;
}

.token.attr-name {
  color: #c76b29;
}

.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
  color: #22a2c9;
}

.token.attr-value,
.token.keyword,
.token.control,
.token.directive,
.token.unit {
  color: #ac9739;
}

.token.statement,
.token.regex,
.token.atrule {
  color: #22a2c9;
}

.token.placeholder,
.token.variable {
  color: #3d8fd1;
}

.token.deleted {
  text-decoration: line-through;
}

.token.inserted {
  border-bottom: 1px dotted #202746;
  text-decoration: none;
}

.token.italic {
  font-style: italic;
}

.token.important,
.token.bold {
  font-weight: bold;
}

.token.important {
  color: #c94922;
}

.token.entity {
  cursor: help;
}
</style> 