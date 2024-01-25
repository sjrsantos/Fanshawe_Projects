import Post from "./Post";

export default function Posts({ posts, setPosts, onPostDislike, onPostLike }) {
  // Sum up the total of likes and dislikes
  let totalLikes = 0;
  let totalDislikes = 0;
  posts.forEach((post) => {
    totalLikes += post.likes;
    totalDislikes += post.dislikes;
  });

  return (
    <main>
      <h2>List of Posts:</h2>
      {posts.map((post, index) => (
        <Post
          key={index}
          {...post}
          dislikes={post.dislikes}
          onPostLike={onPostLike}
          onPostDislike={onPostDislike}
        ></Post>
      ))}

      <div>
        Total Likes: {totalLikes} | Total Dislikes: {totalDislikes}
      </div>
    </main>
  );
}
