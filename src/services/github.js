const GITHUB_API_BASE = 'https://api.github.com';

// 你的 GitHub 用户名和仓库名
const GITHUB_USERNAME = 'yang1212';  // 替换成你的 GitHub 用户名
const REPO_NAME = 'collection-about';  // 替换成你的文章仓库名

// GitHub Personal Access Token
const GITHUB_TOKEN = process.env.VUE_APP_GITHUB_TOKEN;

// 打印环境变量信息用于调试
console.log('环境变量信息:', {
  'VUE_APP_GITHUB_TOKEN 是否存在': !!process.env.VUE_APP_GITHUB_TOKEN,
  'TOKEN 是否有效': !!GITHUB_TOKEN,
  'TOKEN 长度': GITHUB_TOKEN ? GITHUB_TOKEN.length : 0,
  'process.env keys': Object.keys(process.env).filter(key => key.startsWith('VUE_APP_'))
});

// 基础请求头
const BASE_HEADERS = {
  'Accept': 'application/vnd.github.v3+json',
  'User-Agent': 'yang1212.github.io'
};

// 获取带认证的请求头
function getAuthHeaders() {
  const headers = { ...BASE_HEADERS };
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    console.log('使用认证请求');
  } else {
    console.warn('⚠️ 未配置 GitHub Token，将使用未认证请求（可能很快触及限制）');
  }
  return headers;
}

// 目录映射关系
const DIRECTORY_MAP = {
  'language': '1-语言',
  'framework': '2-框架',
  'engineering': '3-工程化',
  'dev-tools': '4-工具',
  'mix': '5-混合',
  'english': '6-英语',
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

// 添加重试次数和延迟时间配置
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1秒

// 添加 API 限制监控
let lastRateLimitWarning = 0; // 用于控制警告频率
const RATE_LIMIT_WARNING_THRESHOLD = 10; // 当剩余次数低于这个值时发出警告
const WARNING_INTERVAL = 5 * 60 * 1000; // 5分钟内不重复警告

async function checkRateLimit(response) {
  const rateLimit = {
    limit: response.headers.get('x-ratelimit-limit'),
    remaining: parseInt(response.headers.get('x-ratelimit-remaining')),
    reset: response.headers.get('x-ratelimit-reset'),
    used: response.headers.get('x-ratelimit-used')
  };

  // 记录当前使用情况
  console.log('GitHub API 使用情况:', {
    限制: rateLimit.limit,
    剩余: rateLimit.remaining,
    重置时间: new Date(rateLimit.reset * 1000).toLocaleString()
  });

  // 检查是否需要发出警告
  if (rateLimit.remaining < RATE_LIMIT_WARNING_THRESHOLD) {
    const now = Date.now();
    if (now - lastRateLimitWarning > WARNING_INTERVAL) {
      lastRateLimitWarning = now;
      const resetTime = new Date(rateLimit.reset * 1000);
      const minutesUntilReset = Math.ceil((resetTime - now) / (60 * 1000));
      
      console.warn(`⚠️ GitHub API 调用次数即将耗尽:
        - 剩余次数: ${rateLimit.remaining}
        - 限制次数: ${rateLimit.limit}
        - 重置时间: ${resetTime.toLocaleString()}
        - 约 ${minutesUntilReset} 分钟后重置`);
    }
  }

  return rateLimit;
}

// 修改 fetchWithRetry 函数
async function fetchWithRetry(url, options = {}, retryCount = 0) {
  try {
    // 确保每个请求都带上认证头
    const headers = {
      ...getAuthHeaders(),
      ...(options.headers || {})
    };

    const requestOptions = {
      ...options,
      headers
    };

    console.log('发送 GitHub API 请求:', {
      url,
      认证状态: !!GITHUB_TOKEN,
      重试次数: retryCount
    });

    const response = await fetch(url, requestOptions);
    
    // 检查 API 限制情况
    const rateLimit = await checkRateLimit(response);
    
    if (response.status === 403) {
      const errorBody = await response.text().catch(() => '无法获取错误详情');
      
      if (errorBody.includes('rate limit exceeded')) {
        const resetTime = new Date(rateLimit.reset * 1000);
        const resetTimeStr = resetTime.toLocaleString();
        const waitMinutes = Math.ceil((resetTime - new Date()) / (1000 * 60));
        
        throw new Error(`GitHub API 限制已达上限:
          - 每小时限制: ${rateLimit.limit}
          - 已使用: ${rateLimit.used}
          - 剩余: ${rateLimit.remaining}
          - 重置时间: ${resetTimeStr}
          - 需等待: ${waitMinutes} 分钟
          - Token状态: ${GITHUB_TOKEN ? '已配置' : '未配置'}
          - 详细信息: ${errorBody}`);
      }
    }

    if (!response.ok) {
      throw new Error(`GitHub API 请求失败: ${response.status} ${response.statusText}`);
    }

    return response;
  } catch (error) {
    console.error('GitHub API 请求失败:', {
      url,
      error: error.message,
      retryCount,
      token状态: GITHUB_TOKEN ? '已配置' : '未配置'
    });

    if (retryCount < MAX_RETRIES) {
      const delay = RETRY_DELAY * (retryCount + 1);
      console.log(`等待 ${delay}ms 后重试...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retryCount + 1);
    }

    throw error;
  }
}

// 修改所有使用 API 的函数，确保使用统一的请求方式
export async function getMarkdownFiles(path = '') {
  try {
    const pathParts = path.split('/').map((part, index) => {
      return index === 0 ? getActualDirectoryName(part) : part;
    });
    
    const encodedPath = pathParts
      .map(part => encodeURIComponent(part))
      .join('/');

    const apiUrl = `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${encodedPath}`;
    const response = await fetchWithRetry(apiUrl);
    const data = await response.json();
    
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    return data.filter(item => 
      !item.name.startsWith('.') && (
        item.type === 'dir' ||
        (item.type === 'file' && (
          item.name.endsWith('.md') ||
          imageExtensions.some(ext => item.name.toLowerCase().endsWith(ext))
        ))
      )
    ).map(item => ({
      name: item.name,
      path: item.path,
      type: item.type,
      download_url: item.download_url
    }));
  } catch (error) {
    console.error('获取文件列表失败:', error);
    throw error;
  }
}

// 获取单个文件内容
export async function getFileContent(path) {
  try {
    const pathParts = path.split('/');
    if (pathParts.length > 1) {
      pathParts[0] = getActualDirectoryName(pathParts[0]);
    }
    
    const encodedPath = pathParts
      .map(part => encodeURIComponent(part))
      .join('/');

    const apiUrl = `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${encodedPath}`;
    const response = await fetchWithRetry(apiUrl);

    const fileInfo = await response.json();
    const downloadUrl = fileInfo.download_url;

    // 使用 download_url 获取文件内容
    const contentResponse = await fetchWithRetry(downloadUrl);

    const content = await contentResponse.text();
    return {
      content,
      lastUpdated: new Date(fileInfo.sha)
    };
  } catch (error) {
    console.error('获取文件内容失败:', error);
    throw error;
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

    const response = await fetchWithRetry(
      `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${REPO_NAME}/issues?${params}`
    );
    return await response.json();
  } catch (error) {
    console.error('获取 Issues 失败:', error);
    throw error;
  }
}

// 获取单个 Issue 详情
export async function getIssueDetail(issueNumber) {
  try {
    const response = await fetchWithRetry(
      `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${REPO_NAME}/issues/${issueNumber}`
    );
    return await response.json();
  } catch (error) {
    console.error('获取 Issue 详情失败:', error);
    throw error;
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