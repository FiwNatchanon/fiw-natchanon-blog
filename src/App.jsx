import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ViewPostPage from "./pages/ViewPostPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/post/:postId" element={<ViewPostPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
