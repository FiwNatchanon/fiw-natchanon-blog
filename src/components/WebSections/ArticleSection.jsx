import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ArticleSearch from "@/components/WebSections/ArticleSearch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { extraMockPosts } from "@/data/blogPost";
import {
  formatDate,
  getMockPostsByCategory,
  getNewPosts,
  removeDuplicatePosts,
} from "@/utils/blogHelpers";

const API_URL = "https://blog-post-project-api.vercel.app/posts";
const LIMIT = 6;
const CATEGORIES = ["Highlight", "Cat", "Inspiration", "General"];

function BlogCard({ id, image, category, title, description, author, date }) {
  return (
    <article className="flex flex-col gap-4">
      <Link to={`/post/${id}`} className="relative h-[212px] sm:h-[360px]">
        <img
          className="h-full w-full rounded-md object-cover"
          src={image}
          alt={title}
        />
      </Link>
      <div className="flex flex-col">
        <span className="mb-2 w-fit rounded-full bg-green-200 px-3 py-1 text-sm font-semibold text-green-600">
          {category}
        </span>
        <Link to={`/post/${id}`}>
          <h2 className="mb-2 line-clamp-2 text-start text-xl font-bold hover:underline">
            {title}
          </h2>
        </Link>
        <p className="mb-4 grow line-clamp-3 text-sm text-muted-foreground">
          {description}
        </p>
        <div className="flex items-center text-sm">
          <img
            className="mr-2 h-8 w-8 rounded-full"
            src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
            alt={author}
          />
          <span>{author}</span>
          <span className="mx-2 text-gray-300">|</span>
          <span>{date}</span>
        </div>
      </div>
    </article>
  );
}

export default function ArticleSection() {
  const [category, setCategory] = useState("Highlight");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // ใช้สำหรับ pagination ตาม assignment
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [hasLoadedMock, setHasLoadedMock] = useState(false);
  const [canLoadFromApi, setCanLoadFromApi] = useState(true);

  const mockPosts = getMockPostsByCategory(category, extraMockPosts);
  const displayedPosts = removeDuplicatePosts(posts);

  const nextPage = currentPage + 1;
  const remainingMockPosts = getNewPosts(displayedPosts, mockPosts);
  const hasMore =
    (canLoadFromApi && currentPage < totalPages) ||
    (!hasLoadedMock && remainingMockPosts.length > 0);

  // โหลดบทความหน้าแรกเมื่อ category เปลี่ยน
  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      setHasLoadedMock(false);
      setCanLoadFromApi(true);

      const params = { page: 1, limit: LIMIT };
      if (category !== "Highlight") {
        params.category = category;
      }

      try {
        const response = await axios.get(API_URL, { params });
        const total = Math.ceil(response.data.totalPosts / LIMIT);

        setPosts(response.data.posts);
        setCurrentPage(1);
        setTotalPages(total);
      } catch (error) {
        console.error(error);
        setPosts(mockPosts.slice(0, LIMIT));
        setCurrentPage(1);
        setTotalPages(0);
        setCanLoadFromApi(false);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, [category]);

  async function handleViewMore() {
    if (!hasMore || isLoading) {
      return;
    }

    setIsLoading(true);
    let postsToAdd = [];

    try {
      // ขั้นที่ 1: ลองโหลดจาก API หน้าถัดไป
      if (canLoadFromApi && nextPage <= totalPages) {
        const params = { page: nextPage, limit: LIMIT };
        if (category !== "Highlight") {
          params.category = category;
        }

        const response = await axios.get(API_URL, { params });
        postsToAdd = getNewPosts(displayedPosts, response.data.posts);

        if (postsToAdd.length > 0) {
          setCurrentPage(nextPage);
        } else {
          // API ส่งข้อมูลซ้ำ → ไม่โหลดหน้า API ซ้ำอีก
          setCanLoadFromApi(false);
        }
      }

      // ขั้นที่ 2: ถ้า API ไม่มีข้อมูลใหม่ ใช้ mock data
      if (postsToAdd.length === 0 && !hasLoadedMock) {
        postsToAdd = remainingMockPosts;
        setHasLoadedMock(true);
      }

      if (postsToAdd.length > 0) {
        setPosts([...posts, ...postsToAdd]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="mx-auto mt-20 w-full max-w-[1980px] px-6 md:px-12 xl:px-20">
      <h3 className="mb-6 text-3xl font-bold text-[#222]">Latest articles</h3>

      {/* Desktop: ปุ่ม category + search */}
      <div className="hidden items-center justify-between gap-4 rounded-2xl bg-[#F4F4F4] p-3 md:flex">
        <div className="flex space-x-1">
          {CATEGORIES.map((item) => {
            const isSelected = category === item;

            return (
              <button
                key={item}
                type="button"
                disabled={isSelected}
                onClick={() => setCategory(item)}
                className={`rounded-xl px-6 py-2 text-sm transition-colors ${
                  isSelected
                    ? "cursor-default bg-[#E2E2E2] font-semibold text-gray-800"
                    : "font-medium text-gray-500 hover:bg-white hover:text-gray-800"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        <div className="relative w-[300px]">
          <ArticleSearch
            category={category}
            inputClassName="h-auto w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-gray-200"
          />
        </div>
      </div>

      {/* Mobile: search + select category */}
      <div className="flex flex-col gap-5 rounded-2xl bg-[#F4F4F4] p-5 md:hidden">
        <ArticleSearch
          category={category}
          iconSize={20}
          inputClassName="h-auto w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-4 pr-12 text-base shadow-sm focus-visible:ring-2 focus-visible:ring-gray-200"
        />

        <div>
          <label className="mb-2 block text-[15px] font-medium text-gray-500">
            Category
          </label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-auto w-full rounded-xl border-gray-200 bg-white px-4 py-6.5 text-base font-medium text-gray-500 shadow-sm focus:ring-2 focus:ring-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="w-[--radix-select-trigger-width] rounded-xl">
              <SelectGroup>
                {CATEGORIES.map((item) => (
                  <SelectItem
                    key={item}
                    value={item}
                    className="cursor-pointer rounded-lg py-2 text-base text-gray-600"
                  >
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* แสดงบทความ */}
      {isLoading && displayedPosts.length === 0 ? (
        <p className="mb-20 mt-16 text-center text-gray-500">Loading...</p>
      ) : (
        <div className="mb-10 mt-16 grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 lg:gap-x-16">
          {displayedPosts.map((post) => (
            <BlogCard
              key={post.id}
              id={post.id}
              image={post.image}
              category={post.category}
              title={post.title}
              description={post.description}
              author={post.author}
              date={formatDate(post.date)}
            />
          ))}
        </div>
      )}

      {/* ปุ่ม View more */}
      {hasMore && (
        <div className="mb-20 mt-8 text-center">
          <button
            type="button"
            onClick={handleViewMore}
            disabled={isLoading}
            className="font-medium underline hover:text-muted-foreground disabled:opacity-50"
          >
            {isLoading ? "Loading..." : "View more"}
          </button>
        </div>
      )}
    </section>
  );
}
