import PageContainer from "../../components/PageContainer";
import { NavLink, Outlet } from "react-router-dom";
import "./styles.scss";

export default function AboutUsPage() {
  return (
    <PageContainer title="Help" className="help-page">
      <article>
        <Outlet />
      </article>

      {/* Side Menu */}
      <aside>
        <NavLink to="/help" end>
          Introduction
        </NavLink>
        <NavLink to={"/help/adding-tasks"}>Add Tasks</NavLink>
        <NavLink to={"/help/removing-tasks"}>Remove Tasks</NavLink>
        <NavLink to={"/help/changing-status"}>Change Tasks</NavLink>
      </aside>
    </PageContainer>
  );
}
