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
  // First try exact match in directory map
  if (DIRECTORY_MAP[routePath]) {
    return DIRECTORY_MAP[routePath];
  }
  
  // If no match, return the path as is (for subdirectories)
  return routePath;
}

// 获取仓库中的 markdown 文件列表
export async function getMarkdownFiles(path = '') {
  try {
    // 转换目录名称，处理子目录
    const pathParts = path.split('/').map((part, index) => {
      // 只对第一级目录使用映射
      return index === 0 ? getActualDirectoryName(part) : part;
    });
    const actualPath = pathParts.join('/');

    console.log('【调试信息】');
    console.log('输入的路径:', path);
    console.log('转换后的实际路径:', actualPath);
    
    // 对路径的每个部分单独进行编码
    const encodedPath = pathParts
      .map(part => encodeURIComponent(part))
      .join('/');
    
    console.log('编码后的路径:', encodedPath);
    console.log('认证信息是否存在:', !!GITHUB_TOKEN);
    
    const apiUrl = `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${encodedPath}`;
    console.log('完整请求地址:', apiUrl);

    const response = await fetch(apiUrl, { 
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
      }
    });

    if (!response.ok) {
      console.log('请求失败信息:', {
        状态码: response.status,
        状态文本: response.statusText,
        响应头: Object.fromEntries(response.headers.entries())
      });
      
      if (response.status === 404) {
        console.warn(`Path ${actualPath} not found in repository`);
        return [];
      }
      if (response.status === 401 || response.status === 403) {
        console.error('GitHub API authentication failed. Please check your token.');
        return [];
      }
      throw new Error(`GitHub API returned ${response.status}: ${await response.text()}`);
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
    console.error('Error fetching markdown files:', error);
    return [];
  }
}

// 获取单个文件内容
export async function getFileContent(path) {
  try {
    // 处理路径中的目录部分
    const pathParts = path.split('/');
    // 只对第一级目录使用映射
    if (pathParts.length > 1) {
      pathParts[0] = getActualDirectoryName(pathParts[0]);
    }
    
    // 将路径部分分别编码后重新组合
    const encodedPath = pathParts
      .map(part => encodeURIComponent(part))
      .join('/');

    console.log('【获取文件内容】请求信息：', {
      原始路径: path,
      处理后路径: pathParts.join('/'),
      编码后路径: encodedPath
    });

    // 直接从 raw.githubusercontent.com 获取内容
    const response = await fetch(
      `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/master/${encodedPath}`
    );

    if (!response.ok) {
      console.error('【获取文件内容】请求失败：', {
        状态码: response.status,
        状态文本: response.statusText
      });
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