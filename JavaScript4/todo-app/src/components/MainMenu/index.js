import "./styles.scss";
import { NavLink } from "react-router-dom";

export default function MainMenu() {
  return (
    <nav className="main">
      <NavLink to="/">Tasks</NavLink>
      <NavLink to="/Add">Add</NavLink>
      <NavLink to="/Help">Help</NavLink>
    </nav>
  );
}
