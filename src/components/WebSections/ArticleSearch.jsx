import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { removeDuplicatePosts } from "@/utils/blogHelpers";

const API_URL = "https://blog-post-project-api.vercel.app/posts";

export default function ArticleSearch({ category, inputClassName, iconSize = 18 }) {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // ค้นหาเมื่อ keyword หรือ category เปลี่ยน
  useEffect(() => {
    if (keyword.trim() === "") {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    async function searchPosts() {
      setIsSearching(true);

      try {
        const params = {
          keyword: keyword.trim(),
          limit: 6,
        };

        if (category !== "Highlight") {
          params.category = category;
        }

        const response = await axios.get(API_URL, { params });
        const uniqueResults = removeDuplicatePosts(response.data.posts);

        setSearchResults(uniqueResults);
        setShowDropdown(true);
      } catch (error) {
        console.error(error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }

    searchPosts();
  }, [keyword, category]);

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  function handleSelectResult() {
    setKeyword("");
    setShowDropdown(false);
    setSearchResults([]);
  }

  return (
    <div className="relative w-full">
      <Input
        placeholder="Search"
        value={keyword}
        onChange={handleKeywordChange}
        onFocus={() => {
          if (keyword.trim() !== "") {
            setShowDropdown(true);
          }
        }}
        onBlur={() => {
          setTimeout(() => setShowDropdown(false), 150);
        }}
        className={inputClassName}
      />
      <Search
        className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 pointer-events-none"
        size={iconSize}
      />

      {showDropdown && keyword.trim() !== "" && (
        <ul className="absolute top-full left-0 right-0 z-20 mt-2 max-h-80 overflow-y-auto rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
          {isSearching && (
            <li className="px-4 py-3 text-sm text-gray-500">Loading...</li>
          )}

          {!isSearching && searchResults.length === 0 && (
            <li className="px-4 py-3 text-sm text-gray-500">No results found</li>
          )}

          {!isSearching &&
            searchResults.map((post) => (
              <li key={post.id}>
                <Link
                  to={`/post/${post.id}`}
                  onClick={handleSelectResult}
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {post.title}
                </Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
