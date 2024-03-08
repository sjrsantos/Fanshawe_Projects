import PageContainer from "../../components/PageContainer";
import Posts from "../../components/Posts";
import Form from "../../components/Form";
import "./styles.scss";
import { useNavigate } from "react-router-dom";

export default function PostListPage() {
  const navigate = useNavigate();

  const handleAddPostClick = () => {
    navigate("/posts/add");
  };

  return (
    <PageContainer title="Posts">
      <Posts showOnlyPromoted={false} />

      <div className="add-post-button-container">
        <button onClick={handleAddPostClick}>Add Post</button>
      </div>
    </PageContainer>
  );
}
