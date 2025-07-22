<template>
  <div class="markdown-content" v-html="html"></div>
</template>

<script>
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/github.css'

hljs.registerLanguage('javascript', javascript)

export default {
  name: 'MarkdownRenderer',
  props: {
    html: {
      type: String,
      required: true
    }
  },
  updated() {
    // 渲染后自动高亮
    this.$el.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block)
    })
  }
}
</script>

<style>
.markdown-content {
  line-height: 1.6;
  font-size: 16px;
}
pre {
  background: #fff !important;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
}
code {
  font-family: Menlo, Monaco, 'Courier New', monospace;
}
</style>