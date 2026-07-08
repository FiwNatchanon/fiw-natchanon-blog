import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { extraMockPosts } from "@/data/blogPost";

const API_BASE_URL = "https://blog-post-project-api.vercel.app";

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getMockPostsByCategory(category) {
  if (category === "Highlight") return extraMockPosts;
  return extraMockPosts.filter((post) => post.category === category);
}

function getUniquePosts(postList) {
  const seenTitles = new Set();

  return postList.filter((post) => {
    if (seenTitles.has(post.title)) return false;
    seenTitles.add(post.title);
    return true;
  });
}

function getPostsNotYetShown(existingPosts, incomingPosts) {
  const existingTitles = new Set(existingPosts.map((post) => post.title));

  return incomingPosts.filter((post) => !existingTitles.has(post.title));
}

function BlogCard(props) {
  return (
    <article className="flex flex-col gap-4">
      <a href="#" className="relative h-[212px] sm:h-[360px]">
        <img
          className="w-full h-full object-cover rounded-md"
          src={props.image}
          alt={props.title}
        />
      </a>
      <div className="flex flex-col">
        <div className="flex">
          <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600 mb-2">
            {props.category}
          </span>
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
          <img
            className="w-8 h-8 rounded-full mr-2"
            src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
            alt={props.author}
          />
          <span>{props.author}</span>
          <span className="mx-2 text-gray-300">|</span>
          <span>{props.date}</span>
        </div>
      </div>
    </article>
  );
}

export default function ArticleSection() {
  const categories = ["Highlight", "Cat", "Inspiration", "General"];
  const limit = 6;

  const [category, setCategory] = useState("Highlight");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [apiTotalPosts, setApiTotalPosts] = useState(0);
  const [canLoadMoreFromApi, setCanLoadMoreFromApi] = useState(false);

  const mockPosts = getMockPostsByCategory(category);
  const displayedPosts = getUniquePosts(posts);
  const hasRemainingMock = getPostsNotYetShown(displayedPosts, mockPosts).length > 0;
  const hasMore =
    hasRemainingMock || (canLoadMoreFromApi && currentPage < totalPages);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);

      try {
        const params = { page: 1, limit };
        if (category !== "Highlight") {
          params.category = category;
        }

        const { data } = await axios.get(`${API_BASE_URL}/posts`, { params });
        const calculatedTotalPages = Math.ceil(data.totalPosts / limit);

        setPosts(data.posts);
        setApiTotalPosts(data.totalPosts);
        setCurrentPage(1);
        setTotalPages(calculatedTotalPages);
        setCanLoadMoreFromApi(calculatedTotalPages > 1);
        setNextPage(calculatedTotalPages > 1 ? 2 : null);
      } catch (error) {
        console.error(error);
        const categoryMockPosts = getMockPostsByCategory(category);

        setPosts(categoryMockPosts.slice(0, limit));
        setApiTotalPosts(0);
        setCurrentPage(1);
        setTotalPages(0);
        setCanLoadMoreFromApi(false);
        setNextPage(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [category]);

  const handleViewMore = async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);

    try {
      let postsToAdd = [];
      let pageToLoad = currentPage + 1;

      if (canLoadMoreFromApi && pageToLoad <= totalPages) {
        const params = { page: pageToLoad, limit };
        if (category !== "Highlight") {
          params.category = category;
        }

        const { data } = await axios.get(`${API_BASE_URL}/posts`, { params });
        postsToAdd = getPostsNotYetShown(displayedPosts, data.posts);

        if (postsToAdd.length === 0) {
          setCanLoadMoreFromApi(false);
        } else {
          setCurrentPage(pageToLoad);
          setNextPage(pageToLoad < totalPages ? pageToLoad + 1 : null);
        }
      }

      if (postsToAdd.length === 0) {
        postsToAdd = getPostsNotYetShown(displayedPosts, mockPosts);
      }

      if (postsToAdd.length > 0) {
        setPosts((prevPosts) => getUniquePosts([...prevPosts, ...postsToAdd]));
      }
    } catch (error) {
      console.error(error);

      setPosts((prevPosts) =>
        getUniquePosts([
          ...prevPosts,
          ...getPostsNotYetShown(getUniquePosts(prevPosts), mockPosts),
        ])
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full max-w-[1980px] mx-auto px-6 md:px-12 xl:px-20 mt-20">
      <h3 className="text-3xl font-bold text-[#222] mb-6">Latest articles</h3>

      <div className="hidden md:flex bg-[#F4F4F4] rounded-2xl p-3 justify-between items-center gap-4">
        <div className="flex space-x-1">
          {categories.map((item) => {
            const isSelected = category === item;
            return (
              <button
                key={item}
                type="button"
                disabled={isSelected}
                onClick={() => setCategory(item)}
                className={`px-6 py-2 rounded-xl text-sm transition-colors ${
                  isSelected
                    ? "bg-[#E2E2E2] text-gray-800 font-semibold cursor-default"
                    : "text-gray-500 hover:bg-white hover:text-gray-800 font-medium"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        <div className="relative w-[300px]">
          <Input
            placeholder="Search"
            className="w-full pl-4 pr-10 py-2.5 h-auto rounded-xl bg-white border border-gray-200 focus-visible:ring-2 focus-visible:ring-gray-200 text-sm shadow-sm"
          />
          <Search
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
      </div>

      <div className="flex md:hidden bg-[#F4F4F4] rounded-2xl p-5 flex-col gap-5">
        <div className="relative w-full">
          <Input
            placeholder="Search"
            className="w-full pl-4 pr-12 py-3.5 h-auto rounded-xl bg-white border border-gray-200 focus-visible:ring-2 focus-visible:ring-gray-200 text-base shadow-sm"
          />
          <Search
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            size={20}
          />
        </div>

        <div>
          <label className="block text-gray-500 font-medium mb-2 text-[15px]">
            Category
          </label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full bg-white h-auto py-6.5 px-4 rounded-xl border-gray-200 text-base font-medium text-gray-500 shadow-sm focus:ring-2 focus:ring-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl w-[--radix-select-trigger-width]">
              <SelectGroup>
                {categories.map((item) => (
                  <SelectItem
                    key={item}
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

      {isLoading && displayedPosts.length === 0 ? (
        <p className="text-center text-gray-500 mt-16 mb-20">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-16 mt-16 mb-10">
          {displayedPosts.map((post) => (
            <BlogCard
              key={post.title}
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

      {hasMore && (
        <div className="text-center mt-8 mb-20">
          <button
            type="button"
            onClick={handleViewMore}
            disabled={isLoading}
            className="hover:text-muted-foreground font-medium underline disabled:opacity-50"
          >
            {isLoading ? "Loading..." : "View more"}
          </button>
        </div>
      )}
    </section>
  );
}
