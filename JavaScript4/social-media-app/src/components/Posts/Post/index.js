import { getCategory, getPostStatus } from "../../../includes/variables";
import "./styles.scss";
import { BiLike, BiDislike } from "react-icons/bi";

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

  return (
    <div className="post-item">
      <h3>{title}</h3>

      <div className="description">
        <img src={picture} alt={title} />
        <span>{content}</span>
      </div>

      <div className="info">
        <div>
          Category: <strong>{getCategory(category)}</strong>
        </div>
        <div>
          Status: <strong>{getPostStatus(status)}</strong>
        </div>
        <div className={promoteStyle}>
          Promote: <strong>{promote ? "Yes" : "No"}</strong>
        </div>
      </div>

      <div className="rate">
        <button title="I like this" className="like" onClick={handlelikesClick}>
          <BiLike /> {likes}
        </button>
        <button
          title="I dislike this"
          className="dislike"
          onClick={handleDislikesClick}
        >
          <BiDislike /> {dislikes}
        </button>
      </div>
    </div>
  );
}
