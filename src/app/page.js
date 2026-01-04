import { blogs } from "@/.velite/generated";
import HomeCoverSection from "../components/Home/HomeCoverSection";
import FeaturedPosts from "../components/Home/FeaturedPosts";
import RecentPosts from "../components/Home/RecentPosts";

export default function Home() {
  const safeBlogs = Array.isArray(blogs) ? blogs : [];

  // 详细调试：查看所有文章的homeCover状态
  console.log('=== 首页数据详细调试 ===');
  console.log('总文章数:', safeBlogs.length);
  
  if (safeBlogs.length > 0) {
    // 检查第一篇的完整数据结构
    const firstBlog = safeBlogs[0];
    console.log('第一篇完整数据:', JSON.stringify(firstBlog, null, 2));
    
    // 查找所有可能的homeCover字段
    console.log('\n=== 查找homeCover字段 ===');
    safeBlogs.forEach((blog, index) => {
      console.log(`\n文章 ${index + 1}: ${blog.title || '无标题'}`);
      
      // 检查所有可能的属性
      const possiblePaths = [
        'homeCover',
        'frontmatter.homeCover',
        'metadata.homeCover',
        'data.homeCover'
      ];
      
      possiblePaths.forEach(path => {
        const value = getValueByPath(blog, path);
        if (value !== undefined) {
          console.log(`  ${path}: ${value} (类型: ${typeof value})`);
        }
      });
      
      // 检查所有属性名中包含"cover"的
      Object.keys(blog).forEach(key => {
        if (key.toLowerCase().includes('cover')) {
          console.log(`  发现cover相关属性: ${key} = ${blog[key]}`);
        }
      });
      
      if (blog.frontmatter) {
        Object.keys(blog.frontmatter).forEach(key => {
          if (key.toLowerCase().includes('cover')) {
            console.log(`  frontmatter中发现: ${key} = ${blog.frontmatter[key]}`);
          }
        });
      }
    });
  }

  // 辅助函数：通过路径获取嵌套对象的值
  function getValueByPath(obj, path) {
    return path.split('.').reduce((acc, part) => {
      return acc && acc[part] !== undefined ? acc[part] : undefined;
    }, obj);
  }

  return (
    <div className="glass-card w-full max-w-6xl mx-auto my-20">
      {/* 临时显示所有文章的homeCover状态 */}
      <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h3 className="font-bold mb-2">所有文章homeCover状态:</h3>
        {safeBlogs.map((blog, index) => {
          const homeCoverValue = blog.homeCover || blog.frontmatter?.homeCover;
          const hasCover = homeCoverValue === true || homeCoverValue === 'true';
          
          return (
            <div key={index} className={`mb-2 p-2 rounded ${hasCover ? 'bg-green-100' : 'bg-gray-50'}`}>
              <div className="flex justify-between">
                <span className="font-medium">{blog.title}</span>
                <span className={`px-2 py-1 rounded text-xs ${hasCover ? 'bg-green-500 text-white' : 'bg-gray-300'}`}>
                  {hasCover ? '✅ homeCover: true' : '❌ homeCover: false'}
                </span>
              </div>
              {hasCover && <div className="text-xs text-gray-600 mt-1">值: {String(homeCoverValue)}</div>}
            </div>
          );
        })}
      </div>
      
      <HomeCoverSection blogs={safeBlogs} />
      <FeaturedPosts blogs={safeBlogs} />
      <RecentPosts blogs={safeBlogs} />
    </div>
  );
}
