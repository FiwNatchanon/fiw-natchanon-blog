import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Smile, Copy } from "lucide-react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Navbar } from "@/components/WebSections/Navbar";
import { Footer } from "@/components/WebSections/Footer";
import { LoginRequiredDialog } from "@/components/LoginRequiredDialog";
import NotFoundPage from "@/pages/NotFoundPage";

const API_BASE_URL = "https://blog-post-project-api.vercel.app";
const isLoggedIn = false;

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ViewPostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [comment, setComment] = useState("");
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      setNotFound(false);

      try {
        const { data } = await axios.get(`${API_BASE_URL}/posts/${postId}`);
        setPost(data);
      } catch (error) {
        console.error(error);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const requireLogin = () => {
    if (!isLoggedIn) {
      setShowLoginDialog(true);
      return true;
    }
    return false;
  };

  const handleLike = () => {
    requireLogin();
  };

  const handleSendComment = () => {
    if (requireLogin()) return;
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch (error) {
      console.error(error);
    }
  };

  const shareUrl = encodeURIComponent(window.location.href);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] font-sans text-gray-900 flex flex-col justify-between">
        <Navbar />
        <main className="flex flex-1 items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (notFound || !post) {
    return <NotFoundPage />;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-gray-900 flex flex-col justify-between">
      <Navbar />
      <main className="w-full max-w-[1200px] mx-auto px-6 md:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-16">
          <article>
            <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-green-200 px-3 py-1 font-semibold text-green-600">
                {post.category}
              </span>
              <span className="text-gray-500">{formatDate(post.date)}</span>
            </div>

            <h1 className="mb-6 text-3xl font-bold leading-tight text-[#222] md:text-4xl">
              {post.title}
            </h1>

            <img
              src={post.image}
              alt={post.title}
              className="mb-8 w-full rounded-2xl object-cover max-h-[460px]"
            />

            <div className="markdown text-gray-600">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            <section className="mt-10 border-t border-gray-200 pt-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleLike}
                  className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Smile size={18} />
                  <span>{post.likes}</span>
                </button>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Copy size={16} />
                    Copy
                  </button>

                  <a
                    href={`https://www.facebook.com/share.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Facebook"
                    className="flex size-10 items-center justify-center rounded-full bg-[#2A2A2A] text-white hover:bg-black transition-colors"
                  >
                    <FaFacebook size={16} />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on LinkedIn"
                    className="flex size-10 items-center justify-center rounded-full bg-[#2A2A2A] text-white hover:bg-black transition-colors"
                  >
                    <FaLinkedin size={16} />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Twitter"
                    className="flex size-10 items-center justify-center rounded-full bg-[#2A2A2A] text-white hover:bg-black transition-colors"
                  >
                    <FaTwitter size={16} />
                  </a>
                </div>
              </div>
            </section>

            <section className="mt-10">
              <h2 className="mb-4 text-xl font-bold text-[#222]">Comment</h2>
              <textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="What are your thoughts?"
                className="mb-4 min-h-[120px] w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-gray-200"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSendComment}
                  className="rounded-full bg-[#2A2A2A] px-6 py-2.5 text-sm font-medium text-white hover:bg-black transition-colors"
                >
                  Send
                </button>
              </div>
            </section>
          </article>

          <aside className="lg:pt-16">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                Author
              </span>
              <img
                src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
                alt={post.author}
                className="mt-4 mb-4 size-16 rounded-full object-cover"
              />
              <h3 className="mb-3 text-xl font-bold text-[#222]">{post.author}</h3>
              <p className="text-sm leading-relaxed text-gray-500">
                I am a pet enthusiast and freelance writer who specializes in animal
                behavior and care. With a deep love for cats, I enjoy sharing insights
                on feline companionship and wellness.
              </p>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
      <LoginRequiredDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} />
    </div>
  );
}
