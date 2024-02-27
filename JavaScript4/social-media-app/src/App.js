import Header from "./components/Header/index.js";
import Posts from "./components/Posts/index.js";
import Footer from "./components/Footer/index.js";
import Form from "./components/Form/index.js";
import Settings from "./components/Settings/index.js";

export default function App() {
  // Add a new post

  // const handleAddPost = (
  //   title,
  //   content,
  //   category,
  //   promote,
  //   status,
  //   picture
  // ) => {
  //   posts.push({
  //     id: uuid(),
  //     title,
  //     content,
  //     category,
  //     promote,
  //     status,
  //     picture,
  //     likes: 0,
  //     dislikes: 0,
  //   });
  //   setPosts([...posts]);
  // };

  return (
    <>
      <Header />

      <Posts />
      <Form />
      <Settings />
      <Footer />
    </>
  );
}
