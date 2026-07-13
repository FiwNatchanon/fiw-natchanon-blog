export function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// กรองบทความที่ชื่อซ้ำ (API บางหน้าส่งชื่อเดิมมาซ้ำ)
export function removeDuplicatePosts(postList) {
  const result = [];

  for (const post of postList) {
    let isDuplicate = false;

    for (const existingPost of result) {
      if (existingPost.title === post.title) {
        isDuplicate = true;
        break;
      }
    }

    if (!isDuplicate) {
      result.push(post);
    }
  }

  return result;
}

// เอาเฉพาะบทความใหม่ที่ยังไม่มีใน list เดิม
export function getNewPosts(oldPosts, incomingPosts) {
  const newPosts = [];

  for (const post of incomingPosts) {
    let alreadyExists = false;

    for (const oldPost of oldPosts) {
      if (oldPost.title === post.title) {
        alreadyExists = true;
        break;
      }
    }

    if (!alreadyExists) {
      newPosts.push(post);
    }
  }

  return newPosts;
}

export function getMockPostsByCategory(category, mockPosts) {
  if (category === "Highlight") {
    return mockPosts;
  }

  return mockPosts.filter((post) => post.category === category);
}
