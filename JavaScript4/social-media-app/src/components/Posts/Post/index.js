export default function Post({
  id,
  title,
  content,
  category,
  promote,
  status,
  picture,
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
      <img src={picture} alt={title} width="400" />
      <div>{content}</div>
      <div>Category: {category}</div>
      <div>Promote: {promote ? "Yes" : "No"}</div>
      <div>Status: {status}</div>

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
