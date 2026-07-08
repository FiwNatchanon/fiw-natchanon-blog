import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const API_BASE_URL = "https://blog-post-project-api.vercel.app";

function getUniquePosts(postList) {
  const seenTitles = new Set();

  return postList.filter((post) => {
    if (seenTitles.has(post.title)) return false;
    seenTitles.add(post.title);
    return true;
  });
}

export default function ArticleSearch({ category, inputClassName, iconSize = 18 }) {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!keyword.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsSearching(true);

      try {
        const params = { keyword: keyword.trim(), limit: 6 };
        if (category !== "Highlight") {
          params.category = category;
        }

        const { data } = await axios.get(`${API_BASE_URL}/posts`, { params });
        setSearchResults(getUniquePosts(data.posts));
        setShowDropdown(true);
      } catch (error) {
        console.error(error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [keyword, category]);

  const handleSelectResult = () => {
    setKeyword("");
    setShowDropdown(false);
    setSearchResults([]);
  };

  return (
    <div className="relative w-full">
      <Input
        placeholder="Search"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        onFocus={() => keyword.trim() && setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
        className={inputClassName}
      />
      <Search
        className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 pointer-events-none"
        size={iconSize}
      />

      {showDropdown && keyword.trim() && (
        <ul className="absolute top-full left-0 right-0 z-20 mt-2 max-h-80 overflow-y-auto rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
          {isSearching ? (
            <li className="px-4 py-3 text-sm text-gray-500">Loading...</li>
          ) : searchResults.length > 0 ? (
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
            ))
          ) : (
            <li className="px-4 py-3 text-sm text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
}
