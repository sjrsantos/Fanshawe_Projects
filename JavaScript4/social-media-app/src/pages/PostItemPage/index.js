import PageContainer from "../../components/PageContainer";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NotFoundPage from "../NotFoundPage";
import "./stylex.scss";

export default function PostItemPage() {
  const params = useParams();
  const post = useSelector((state) =>
    state.post.posts.find((post) => post.id === params.id)
  );

  if (!post) {
    return <NotFoundPage />;
  }

  return (
    <PageContainer title={post.title} className="post-item-page">
      <div className="picture">
        <img src={post.picture} alt={post.title} />
      </div>
      <div className="description">{post.content}</div>

      <Link to="/posts" className="back-link">
        Back to Posts
      </Link>
    </PageContainer>
  );
}
