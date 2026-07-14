export const defaultCategories = [
  { id: 1, name: "Cat" },
  { id: 2, name: "Inspiration" },
  { id: 3, name: "General" },
];

export const defaultArticles = [
  {
    id: 1,
    title: "The Art of Mindfulness",
    description: "Discover the transformative power of mindfulness.",
    content: "Mindfulness helps us stay present and reduce stress in daily life.",
    category: "Inspiration",
    status: "published",
    image:
      "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728445654/my-blog-post/Interior-designer-and-home-stager-Minna-Rhee-in-Auckland-New-Zealand-Minna-Rhee-Photography-iNZyg7rEu1s-unsplash_a3nat3.jpg",
    date: "2024-08-21T10:00:00.000Z",
  },
  {
    id: 2,
    title: "Understanding Cat Behavior",
    description: "Learn why cats behave the way they do.",
    content: "Cats communicate through body language, vocalizations, and habits.",
    category: "Cat",
    status: "draft",
    image:
      "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg",
    date: "2024-09-01T10:00:00.000Z",
  },
  {
    id: 3,
    title: "Daily Productivity Tips",
    description: "Simple habits to boost your productivity.",
    content: "Start your day with a clear plan and take regular breaks.",
    category: "General",
    status: "published",
    image:
      "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg",
    date: "2024-09-10T10:00:00.000Z",
  },
];

export const adminNotifications = [
  {
    id: 1,
    userName: "Jacob Lash",
    userAvatar:
      "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg",
    message: "Commented on your article.",
    time: "4 hours ago",
    link: "/post/1",
  },
  {
    id: 2,
    userName: "Thompson P.",
    userAvatar:
      "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg",
    message: "Published new article.",
    time: "2 days ago",
    link: "/post/2",
  },
];
