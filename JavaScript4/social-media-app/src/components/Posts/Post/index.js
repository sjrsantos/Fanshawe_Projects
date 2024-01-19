export default function Post({
  id,
  title,
  likes,
  dislikes,
  onPostLike,
  onPostDislike,
}) {
  const handlelikesClick = () => {
    onPostLike(id);
  };

  const handleDislikesClick = () => {
    onPostDislike(id);
  };

  return (
    <div>
      <h3>{title}</h3>
      <div>
        likes: {likes}
        <button onClick={handlelikesClick}>likes</button>
      </div>
      <div>
        Dislikes: {dislikes}
        <button onClick={handleDislikesClick}>Dislikes</button>
      </div>
    </div>
  );
}
