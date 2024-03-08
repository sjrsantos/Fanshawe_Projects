import "./styles.scss";
import { VscTasklist } from "react-icons/vsc";
import MainMenu from "../MainMenu";

export default function Header() {
  return (
    <>
      <header className="main">
        <h1 className="app-name">
          <VscTasklist />
          Todo App
        </h1>
        <h2 className="founder">by Silvio dos Santos Junior</h2>
      </header>
      <MainMenu />
    </>
  );
}
