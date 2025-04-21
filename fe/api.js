import axios from "axios";

const newsApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

console.log("Base URL:", import.meta.env.VITE_API_URL);


console.log(import.meta.env.VITE_API_URL);

const fetchArticles = (topic, sortBy, sortOrder, limit) => {
  let url = `/articles?sort_by=${sortBy}&order=${sortOrder}`;
  if (topic) {
    url += `&topic=${topic}`;
  }

  if (limit) {
    url += `&limit=${limit}`;
  }
  
  return newsApi.get(url).then((response) => {
    console.log(response.data.articles)
    return response.data.articles;
  });
};

const fetchComments = (article_id) => {
  return newsApi.get(`/articles/${article_id}/comments`).then((response) => {
    return response.data.comments;
  });
};

const fetchArticle = (article_id) => {
  return newsApi.get(`/articles/${article_id}`).then((response) => {
    return response.data.article;
  });
};

const changeVotesNumber = (article_id, change) => {
  let newVote = { inc_votes: 0 };
  if (change === "increment") {
    newVote = { inc_votes: +1 };
  } else if (change === "decrement") {
    newVote = { inc_votes: -1 };
  }
  return newsApi.patch(`/articles/${article_id}`, newVote);
};

const postComment = (commentInput, loggedInUser, article_id) => {
  const commentData = {
    username: loggedInUser.username,
    body: commentInput,
  };
  return newsApi
    .post(`/articles/${article_id}/comments`, commentData)
    .then((response) => {
      return response.data;
    });
};

const fetchUsers = () => {
  return newsApi.get(`/users`).then((response) => {
    const users = response.data.users;
    return users;
  });
};

const deleteComment = (comment_id) => {
  return newsApi.delete(`/comments/${comment_id}`);
};

const fetchTopics = () => {
  return newsApi.get(`/topics`).then((response) => {
    return response.data;
  });
};

export {
  fetchArticles,
  fetchComments,
  fetchArticle,
  changeVotesNumber,
  fetchUsers,
  postComment,
  fetchTopics,
  deleteComment,
};
