import PageContainer from "../../components/PageContainer";
import { useParams, Link } from "react-router-dom";
import * as database from "../../database";
import NotFoundPage from "../NotFoundPage";
import "./stylex.scss";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";

export default function PostItemPage() {
  const params = useParams();
  const [post, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load post from the database
  useEffect(() => {
    (async () => {
      const loadedPost = await database.loadById(params.id);
      setPosts(loadedPost);
      setIsLoading(false);
    })();
  }, [params.id]);

  if (isLoading) {
    return <Loading />;
  }

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
