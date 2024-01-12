import Header from "./components/Header/index.js";
import Posts from "./components/Posts/index.js";
import Footer from "./components/Footer/index.js";

export default function App() {
  const sayHi = (name) => {
    console.log("Hi", name);
    console.log("How are you?");
  };

  return (
    <>
      <Header />
      <Posts />
      <Footer />

      <button onClick={() => sayHi("John")}>Say Hi to John</button>
      <button onClick={() => sayHi("Mary")}>Say Hi to Mary</button>
    </>
  );
}

// export default App;
