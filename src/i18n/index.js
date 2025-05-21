import Vue from 'vue';
import VueI18n from 'vue-i18n';
import axios from 'axios';

Vue.use(VueI18n);

// 语言配置
const messages = {
  'zh-CN': {
    nav: {
      home: '首页',
      categories: '分类',
      about: '关于'
    },
    common: {
      loading: '加载中...',
      error: '发生错误',
      retry: '重试',
      print: '打印',
      batchPrint: '批量打印'
    },
    home: {
      title: '欢迎访问我的博客',
      description: '这里收集了各种有趣的技术文章和资源'
    },
    categories: {
      all: '所有分类',
      language: '编程语言',
      framework: '框架',
      engineering: '工程化',
      tools: '工具',
      mixed: '混合',
      english: '英语',
      ai: 'AI 素材',
      ppt: 'PPT'
    }
  },
  'en-US': {
    nav: {
      home: 'Home',
      categories: 'Categories',
      about: 'About'
    },
    common: {
      loading: 'Loading...',
      error: 'Error occurred',
      retry: 'Retry',
      print: 'Print',
      batchPrint: 'Batch Print'
    },
    home: {
      title: 'Welcome to My Blog',
      description: 'A collection of interesting technical articles and resources'
    },
    categories: {
      all: 'All Categories',
      language: 'Programming Languages',
      framework: 'Frameworks',
      engineering: 'Engineering',
      tools: 'Tools',
      mixed: 'Mixed',
      english: 'English',
      ai: 'AI Resources',
      ppt: 'PPT'
    }
  },
  'fr-FR': {
    nav: {
      home: 'Accueil',
      categories: 'Catégories',
      about: 'À propos'
    },
    common: {
      loading: 'Chargement...',
      error: 'Une erreur est survenue',
      retry: 'Réessayer',
      print: 'Imprimer',
      batchPrint: 'Impression par lots'
    },
    home: {
      title: 'Bienvenue sur Mon Blog',
      description: 'Une collection d\'articles techniques et de ressources intéressantes'
    },
    categories: {
      all: 'Toutes les catégories',
      language: 'Langages de programmation',
      framework: 'Frameworks',
      engineering: 'Ingénierie',
      tools: 'Outils',
      mixed: 'Mixte',
      english: 'Anglais',
      ai: 'Ressources IA',
      ppt: 'PPT'
    }
  }
};

// 支持的语言列表
export const supportedLocales = [
  { code: 'zh-CN', name: '简体中文' },
  { code: 'en-US', name: 'English' },
  // { code: 'fr-FR', name: 'Français' },
  // { code: 'ja-JP', name: '日本語' },
  // { code: 'ko-KR', name: '한국어' },
  // { code: 'de-DE', name: 'Deutsch' },
  // { code: 'es-ES', name: 'Español' },
  // { code: 'it-IT', name: 'Italiano' },
  // { code: 'ru-RU', name: 'Русский' },
  // { code: 'pt-BR', name: 'Português' }
];

// 根据 IP 获取用户所在地区
async function getLocaleFromIP() {
  try {
    const response = await axios.get('https://ipapi.co/json/');
    const countryCode = response.data.country_code;
    const languageCode = response.data.languages?.split(',')[0] || 'en-US';
    
    // 查找最匹配的语言
    const locale = supportedLocales.find(l => 
      l.code.startsWith(languageCode) || 
      l.code.startsWith(countryCode)
    );
    
    return locale?.code || 'en-US';
  } catch (error) {
    console.error('获取地区信息失败:', error);
    return 'en-US';
  }
}

// 创建 i18n 实例
const i18n = new VueI18n({
  locale: 'zh-CN', // 默认语言
  fallbackLocale: 'zh-CN', // 回退语言
  messages
});

// 初始化语言设置
export async function initializeLocale() {
  // 优先使用存储的语言设置
  const savedLocale = localStorage.getItem('userLocale');
  if (savedLocale && supportedLocales.some(l => l.code === savedLocale)) {
    i18n.locale = savedLocale;
    return;
  }

  // 否则根据 IP 获取语言设置
  const locale = await getLocaleFromIP();
  i18n.locale = locale;
  localStorage.setItem('userLocale', locale);
}

// 切换语言
export function setLocale(locale) {
  i18n.locale = locale;
  localStorage.setItem('userLocale', locale);
  document.querySelector('html').setAttribute('lang', locale);
}

export default i18n; 