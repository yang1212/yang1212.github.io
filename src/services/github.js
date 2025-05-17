const GITHUB_API_BASE = 'https://api.github.com';

// 你的 GitHub 用户名和仓库名
const GITHUB_USERNAME = 'yang1212';  // 替换成你的 GitHub 用户名
const REPO_NAME = 'collection-about';  // 替换成你的文章仓库名

// GitHub Personal Access Token
const GITHUB_TOKEN = process.env.VUE_APP_GITHUB_TOKEN;

// API 请求头
// const API_HEADERS = {
//   'Accept': 'application/vnd.github.v3+json',
//   ...(GITHUB_TOKEN ? { 'Authorization': `Bearer ${GITHUB_TOKEN}` } : {}),
//   'Cache-Control': 'no-cache'
// };

// 目录映射关系
const DIRECTORY_MAP = {
  'frontend': '1-语言',
  'backend': '2-框架',
  'mobile': '3-样式',
  'database': '4-工程化',
  'architecture': '5-浏览器 I 网络安全',
  'dev-tools': '6-工具',
  'productivity': '7-混合',
  'english': '8-英语',
  'ai': 'AI 素材',
  'ppt': 'PPT'
};

// 将路由参数转换为实际的目录名
function getActualDirectoryName(routePath) {
  if (DIRECTORY_MAP[routePath]) {
    return DIRECTORY_MAP[routePath];
  }
  return routePath;
}

// 获取仓库中的文件列表
export async function getMarkdownFiles(path = '') {
  try {
    // 转换目录名称，处理子目录
    const pathParts = path.split('/').map((part, index) => {
      return index === 0 ? getActualDirectoryName(part) : part;
    });
    const actualPath = pathParts.join('/');
    
    // 对路径的每个部分单独进行编码
    const encodedPath = pathParts
      .map(part => encodeURIComponent(part))
      .join('/');

    console.log('【调试信息】尝试获取目录内容:', {
      原始路径: path,
      实际路径: actualPath,
      编码路径: encodedPath
    });

    // 首先尝试使用 API 获取
    const apiUrl = `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${encodedPath}`;
    const headers = {
      'Accept': 'application/vnd.github.v3+json'
    };
    
    if (GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
    }

    const response = await fetch(apiUrl, { headers });

    if (!response.ok) {
      console.log('API 请求失败，尝试使用备用方案');
      
      // 如果 API 请求失败，尝试直接从 raw.githubusercontent.com 获取
      const rawUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/master/${encodedPath}`;
      const rawResponse = await fetch(rawUrl);
      
      if (!rawResponse.ok) {
        console.error('备用方案也失败了:', rawResponse.status);
        throw new Error(`Failed to fetch content: ${rawResponse.status}`);
      }

      // 解析目录内容
      const content = await rawResponse.text();
      const files = content.split('\n')
        .filter(line => line.trim())
        .map(line => {
          const name = line.trim();
          return {
            name,
            path: encodedPath ? `${encodedPath}/${name}` : name,
            type: name.includes('.') ? 'file' : 'dir'
          };
        });

      return files;
    }

    const data = await response.json();
    
    // 过滤出 markdown 文件、图片文件和目录
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    return data.filter(item => 
      item.type === 'dir' ||
      (item.type === 'file' && (
        item.name.endsWith('.md') ||
        imageExtensions.some(ext => item.name.toLowerCase().endsWith(ext))
      ))
    );
  } catch (error) {
    console.error('Error fetching files:', error);
    return [];
  }
}

// 获取单个文件内容
export async function getFileContent(path) {
  try {
    // 处理路径中的目录部分
    const pathParts = path.split('/');
    if (pathParts.length > 1) {
      pathParts[0] = getActualDirectoryName(pathParts[0]);
    }
    
    const encodedPath = pathParts
      .map(part => encodeURIComponent(part))
      .join('/');

    // 直接从 raw.githubusercontent.com 获取内容
    const rawUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/master/${encodedPath}`;
    console.log('【获取文件内容】请求地址:', rawUrl);

    const response = await fetch(rawUrl);

    if (!response.ok) {
      console.error('【获取文件内容】请求失败:', response.status);
      return null;
    }

    const content = await response.text();
    return {
      content,
      lastUpdated: new Date()
    };
  } catch (error) {
    console.error('【请求错误】获取文件内容时发生错误:', error);
    return null;
  }
}

// 获取仓库的 Issues 列表
export async function getIssues(labels = '') {
  try {
    const params = new URLSearchParams({
      state: 'open',
      labels,
      sort: 'created',
      direction: 'desc'
    });

    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${REPO_NAME}/issues?${params}`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching issues:', error);
    return [];
  }
}

// 获取单个 Issue 详情
export async function getIssueDetail(issueNumber) {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${REPO_NAME}/issues/${issueNumber}`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching issue detail:', error);
    return null;
  }
}

// 将 markdown 内容解析为文章元数据
export function parseMarkdownMetadata(content) {
  const metadataRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(metadataRegex);
  
  if (!match) return { content };

  const metadata = {};
  const metadataContent = match[1];
  const lines = metadataContent.split('\n');
  
  lines.forEach(line => {
    const [key, ...values] = line.split(':');
    if (key && values.length) {
      metadata[key.trim()] = values.join(':').trim();
    }
  });

  const articleContent = content.replace(metadataRegex, '').trim();
  
  return {
    ...metadata,
    content: articleContent
  };
}

// 获取文章分类信息
export async function getCategoryStructure() {
  try {
    const files = await getMarkdownFiles();
    const categories = new Map();

    for (const file of files) {
      if (file.type === 'dir') {
        const categoryFiles = await getMarkdownFiles(file.path);
        categories.set(file.name, categoryFiles.filter(f => f.type === 'file'));
      }
    }

    return categories;
  } catch (error) {
    console.error('Error getting category structure:', error);
    return new Map();
  }
} 