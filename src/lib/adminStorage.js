import {
  defaultArticles,
  defaultCategories,
} from "@/data/adminMockData";

const ARTICLES_KEY = "blog_admin_articles";
const CATEGORIES_KEY = "blog_admin_categories";

function getNextId(items) {
  if (items.length === 0) {
    return 1;
  }

  let maxId = 0;

  for (const item of items) {
    if (item.id > maxId) {
      maxId = item.id;
    }
  }

  return maxId + 1;
}

export function getArticles() {
  const stored = localStorage.getItem(ARTICLES_KEY);

  if (!stored) {
    localStorage.setItem(ARTICLES_KEY, JSON.stringify(defaultArticles));
    return defaultArticles;
  }

  return JSON.parse(stored);
}

export function saveArticles(articles) {
  localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
}

export function getArticleById(id) {
  const articles = getArticles();
  return articles.find((article) => article.id === Number(id));
}

export function createArticle(articleData) {
  const articles = getArticles();
  const newArticle = {
    id: getNextId(articles),
    date: new Date().toISOString(),
    ...articleData,
  };

  articles.push(newArticle);
  saveArticles(articles);

  return newArticle;
}

export function updateArticle(id, articleData) {
  const articles = getArticles();
  const index = articles.findIndex((article) => article.id === Number(id));

  if (index === -1) {
    return null;
  }

  articles[index] = {
    ...articles[index],
    ...articleData,
  };
  saveArticles(articles);

  return articles[index];
}

export function deleteArticle(id) {
  const articles = getArticles();
  const filtered = articles.filter((article) => article.id !== Number(id));
  saveArticles(filtered);
}

export function getCategories() {
  const stored = localStorage.getItem(CATEGORIES_KEY);

  if (!stored) {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(defaultCategories));
    return defaultCategories;
  }

  return JSON.parse(stored);
}

export function saveCategories(categories) {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
}

export function getCategoryById(id) {
  const categories = getCategories();
  return categories.find((category) => category.id === Number(id));
}

export function createCategory(name) {
  const categories = getCategories();
  const trimmedName = name.trim();

  if (categories.some((category) => category.name === trimmedName)) {
    return { error: "Category name already exists." };
  }

  const newCategory = {
    id: getNextId(categories),
    name: trimmedName,
  };

  categories.push(newCategory);
  saveCategories(categories);

  return { success: true, category: newCategory };
}

export function updateCategory(id, name) {
  const categories = getCategories();
  const index = categories.findIndex((category) => category.id === Number(id));
  const trimmedName = name.trim();

  if (index === -1) {
    return { error: "Category not found." };
  }

  if (
    categories.some(
      (category) => category.name === trimmedName && category.id !== Number(id)
    )
  ) {
    return { error: "Category name already exists." };
  }

  categories[index] = {
    ...categories[index],
    name: trimmedName,
  };
  saveCategories(categories);

  return { success: true, category: categories[index] };
}

export function deleteCategory(id) {
  const categories = getCategories();
  const filtered = categories.filter((category) => category.id !== Number(id));
  saveCategories(filtered);
}
