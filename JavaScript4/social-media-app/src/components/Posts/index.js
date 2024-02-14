import Post from "./Post";
import "./styles.scss";

export default function Posts({ posts, setPosts, onPostDislike, onPostLike }) {
  // Sum up the total of likes and dislikes
  let totalLikes = 0;
  let totalDislikes = 0;
  posts.forEach((post) => {
    totalLikes += post.likes;
    totalDislikes += post.dislikes;
  });

  return (
    <main className="post-list">
      {posts.map((post, index) => (
        <Post
          key={index}
          {...post}
          dislikes={post.dislikes}
          onPostLike={onPostLike}
          onPostDislike={onPostDislike}
        ></Post>
      ))}

      <div className="total-rate">
        Total Likes: {totalLikes} | Total Dislikes: {totalDislikes}
      </div>
    </main>
  );
}
