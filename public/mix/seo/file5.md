## 🧭 什么是 canonical？

<link rel="canonical" href="https://example.com/page">

这是 HTML <head> 标签里的一个声明，告诉搜索引擎：

“这个页面的权威版本（也就是我希望你收录和排名的那个页面）是 https://example.com/page。”


## 💡 它解决什么问题？

在网站中，同一内容可能出现在多个不同链接，比如：

https://example.com/page

https://example.com/page?ref=ad

https://m.example.com/page

https://books.example.com/page（子域名）

https://example.com/page-copy.html（拷贝页面）

搜索引擎会认为这些是重复内容，就会分散权重、影响排名。

## ✅ canonical 的作用就是：
聚合权重    
多个重复页面的外链、权重、排名都归到你指定的 canonical 页面。

避免内容重复惩罚      
明确告诉搜索引擎“我不是在作弊，是有副本，这才是正主”。

提升 SEO 效果    
避免分散收录，让一个权威链接集中曝光。


## 📍举例说明：

假设有两个页面内容完全相同：    

https://www.yangfu.asia/books（主站）

https://books.yangfu.asia/（子域名）

你希望主站 /books 得权重，那就应该在子域名页面的 <head> 中加：

````javascript
<link rel="canonical" href="https://www.yangfu.asia/books" />

````
这句话的意思就是：

“虽然这是 books.yangfu.asia，但真正权威版本是 www.yangfu.asia/books，

请你收录和排名它。”

