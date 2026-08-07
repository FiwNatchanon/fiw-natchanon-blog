import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreatePostComponent() {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    description: "",
    content: "",
    category_id: "",
    status_id: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a valid image file (JPEG, PNG, GIF, WebP).");
      event.target.value = "";
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert("The file is too large. Please upload an image smaller than 5MB.");
      event.target.value = "";
      return;
    }

    setImageFile(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (statusId) => {
    if (!imageFile) {
      alert("Please select an image file.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("category_id", post.category_id);
    formData.append("description", post.description);
    formData.append("content", post.content);
    formData.append("status_id", statusId);
    formData.append("imageFile", imageFile);

    try {
      await axios.post(
        "http://localhost:4000/posts",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );
      alert("Post created successfully!");
      navigate("/admin/posts");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create post.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-post-container">
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            value={post.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={post.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={post.content}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="imageFile">Image</label>
          <input
            id="imageFile"
            type="file"
            name="imageFile"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <button
            type="button"
            onClick={() => handleSave(1)}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save as Draft"}
          </button>
          <button
            type="button"
            onClick={() => handleSave(2)}
            disabled={isLoading}
          >
            {isLoading ? "Publishing..." : "Save and Publish"}
          </button>
        </div>
      </form>
    </div>
  );
}
