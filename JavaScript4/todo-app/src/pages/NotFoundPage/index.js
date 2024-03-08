import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div title="Not Found">
      <p>Sorry, the page you are looking for does not exist.</p>
      <ul>
        <li>
          <Link to="/">Click here</Link> to go to Home Page.
        </li>
      </ul>
    </div>
  );
}
