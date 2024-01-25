import Header from "./components/Header/index.js";
import Posts from "./components/Posts/index.js";
import Footer from "./components/Footer/index.js";
import Form from "./components/Form/index.js";
import { useState } from "react";
import uuid from "react-uuid";

export default function App() {
  const [posts, setPosts] = useState([]);

  const handleAddPost = (
    title,
    content,
    category,
    promote,
    status,
    picture
  ) => {
    posts.push({
      id: uuid(),
      title,
      content,
      category,
      promote,
      status,
      picture,
      likes: 0,
      dislikes: 0,
    });
    setPosts([...posts]);
  };

  // Update the number of likes
  const handlePostLike = (id) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        return {
          ...post,
          likes: post.likes + 1,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  // Update the number of dislikes
  const handlePostDislike = (id) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        return {
          ...post,
          dislikes: post.dislikes + 1,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <>
      <Header />
      <Posts
        posts={posts}
        onPostLike={handlePostLike}
        onPostDislike={handlePostDislike}
      />
      <Form onAddPost={handleAddPost} />
      <Footer />
    </>
  );
}
