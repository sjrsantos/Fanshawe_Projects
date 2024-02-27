import { getCategory, getPostStatus } from "../../../includes/variables";
import "./styles.scss";
import { BiLike, BiDislike } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { likePost, dislikePost } from "../../../redux/postSlice";

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
}) {
  const { allowLikes, allowDislikes } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const handlelikesClick = () => {
    dispatch(likePost(id));
  };

  const handleDislikesClick = () => {
    dispatch(dislikePost(id));
  };

  const promoteStyle = promote ? "promote-yes" : "promote-no";

  let rateClassName = "rate";
  if (!allowLikes || !allowDislikes) {
    rateClassName += " rate-single-button";
  }

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

      {(allowLikes || allowDislikes) && (
        <div className={rateClassName}>
          {allowLikes && (
            <button
              title="I like this"
              className="like"
              onClick={handlelikesClick}
            >
              <BiLike /> {likes}
            </button>
          )}
          {allowDislikes && (
            <button
              title="I dislike this"
              className="dislike"
              onClick={handleDislikesClick}
            >
              <BiDislike /> {dislikes}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
