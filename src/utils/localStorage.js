// Retrieve all posts from local storage
export const getPosts = () => {
  if (typeof window !== "undefined") {
    const storedPosts = localStorage.getItem("posts");
    return storedPosts ? JSON.parse(storedPosts) : [];
  }
  return [];
};

// Save a new post to local storage
export const savePost = (post) => {
  if (typeof window !== "undefined") {
    const currentPosts = getPosts();
    const updatedPosts = [...currentPosts, post];
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  }
};

// Retrieve a specific post by ID
export const getPostById = (id) => {
  const posts = getPosts();
  return posts.find((post) => post.id === id);
};

// Update the status of a post (e.g., "posted", "pending")
export const updatePostStatus = (id, status) => {
  if (typeof window !== "undefined") {
    const posts = getPosts();
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, status } : post
    );
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  }
};

// Retrieve posts by date
export const getPostsByDate = (date) => {
  const posts = getPosts();
  return posts.filter((post) => post.date === date);
};

// Delete a post by ID
export const deletePostById = (id) => {
  if (typeof window !== "undefined") {
    const posts = getPosts();
    const updatedPosts = posts.filter((post) => post.id !== id);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  }
};
export const getCampaigns = () => {
  if (typeof window !== "undefined") {
    const campaigns = localStorage.getItem("campaigns");
    return campaigns ? JSON.parse(campaigns) : [];
  }
  return [];
};

export const saveCampaign = (newCampaign) => {
  if (typeof window !== "undefined") {
    const existingCampaigns = getCampaigns();
    const updatedCampaigns = [
      ...existingCampaigns.filter((c) => c.date !== newCampaign.date),
      newCampaign,
    ];
    localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));
  }
};
