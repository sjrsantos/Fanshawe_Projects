import { getCategory, getPostStatus } from "../../../includes/variables";
import "./styles.scss";

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

  const promoteStyle = promote ? "promote-yes" : "promote-no";

  const dislikeStyle = dislikes >= 10 ? "too-many-dislikes" : "";

  return (
    <div className="post-item">
      <h3>{title}</h3>
      <img src={picture} alt={title} width="400" />
      <div className="post-text">{content}</div>
      <div>Category: {getCategory(category)}</div>
      <div className={promoteStyle}>
        Promote: <strong>{promote ? "Yes" : "No"}</strong>
      </div>
      <div>Status: {getPostStatus(status)}</div>

      <div>
        likes: {likes}
        <button onClick={handlelikesClick}>likes</button>
      </div>
      <div className={dislikeStyle}>
        Dislikes: {dislikes}
        <button onClick={handleDislikesClick}>Dislikes</button>
      </div>
    </div>
  );
}
