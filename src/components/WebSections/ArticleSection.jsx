import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,  
  SelectValue,
} from "@/components/ui/select"
import { blogPosts } from "@/data/blogPost";


function BlogCard(props) {
    return (
      <div className="flex flex-col gap-4">
        <a href="#" className="relative h-[212px] sm:h-[360px]">
          <img className="w-full h-full object-cover rounded-md" src={props.image} alt={props.title}/>
        </a>
        <div className="flex flex-col">
          <div className="flex">
            <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600 mb-2">{props.category}</span>
          </div>
          <a href="#">
            <h2 className="text-start font-bold text-xl mb-2 line-clamp-2 hover:underline">
              {props.title}
            </h2>
          </a>
          <p className="text-muted-foreground text-sm mb-4 grow line-clamp-3">
            {props.description} 
          </p>
          <div className="flex items-center text-sm">
            <img className="w-8 h-8 rounded-full mr-2" src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg" alt="Tomson P." />
            <span>{props.author}</span>
            <span className="mx-2 text-gray-300">|</span>
            <span>{props.date}</span>   
          </div>
        </div>
      </div>
    );
  }

export default function ArticleSection() {
  const categories = ["Highlight", "Cat", "Inspiration", "General"];

    return (
      <section className="w-full max-w-[1980px] mx-auto px-6 md:px-12 xl:px-20 mt-20">
        <h3 className="text-3xl font-bold text-[#222] mb-6">Latest articles</h3>
        
        <div className="hidden md:flex bg-[#F4F4F4] rounded-2xl p-3 justify-between items-center gap-4">
          {/* Tabs */}
          <div className="flex space-x-1">
            {categories.map((item, index) => {
              const isFirstItem = index === 0;
              return (
                <button 
                  key={index}
                  className={`px-6 py-2 rounded-xl text-sm transition-colors ${
                    isFirstItem 
                      ? "bg-[#E2E2E2] text-gray-800 font-semibold" 
                      : "text-gray-500 hover:text-gray-800 font-medium" 
                  }`}
                >
                  {item}
                </button>
              )
            })}
          </div>
  
          {/* Search */}
          <div className="relative w-[300px]">
            <Input 
              placeholder="Search" 
              className="w-full pl-4 pr-10 py-2.5 h-auto rounded-xl bg-white border border-gray-200 focus-visible:ring-2 focus-visible:ring-gray-200 text-sm shadow-sm" 
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
  
        <div className="flex md:hidden bg-[#F4F4F4] rounded-2xl p-5 flex-col gap-5">
          
          {/* Search Bar (Mobile) */}
          <div className="relative w-full">
            <Input 
              placeholder="Search" 
              className="w-full pl-4 pr-12 py-3.5 h-auto rounded-xl bg-white border border-gray-200 focus-visible:ring-2 focus-visible:ring-gray-200 text-base shadow-sm" 
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          </div>
  
          {/* Category Select (Mobile) */}
          <div>
            <label className="block text-gray-500 font-medium mb-2 text-[15px]">
              Category
            </label>
            <Select defaultValue={categories[0]}>
            <SelectTrigger className="w-full bg-white h-auto py-6.5 px-4 rounded-xl border-gray-200 text-base font-medium text-gray-500 shadow-sm focus:ring-2 focus:ring-gray-200">
              <SelectValue /> 
            </SelectTrigger>
            <SelectContent className="rounded-xl w-[--radix-select-trigger-width]">
              <SelectGroup>
                {categories.map((item, index) => (
                  <SelectItem 
                    key={index} 
                    value={item} 
                    className="text-base text-gray-600 rounded-lg py-2 cursor-pointer"
                  >
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-16 mt-16 mb-20">
        {blogPosts.map((post) => (
            <BlogCard
              key={post.id}
              image={post.image}
              category={post.category}
              title={post.title}
              description={post.description}
              author={post.author}
              date={post.date}
            />
          ))}
        </div>
      </section>
    );
  }