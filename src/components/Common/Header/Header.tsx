import Resume from "../../../assets/usersvg.svg";
import { NavLink } from "react-router";

const authenticatedNavLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "New Job",
    link: "/new",
  },
];

function Header() {
  return (
    <nav className="nav">
      <section className="nav-items">
        <img src={Resume} alt="An image of the logo" />
        <p>Jobzy web application</p>
      </section>
      <section className="nav-items nav-flex">
        {authenticatedNavLinks.map((navLink) => (
          <div className="navLinkList">
            <NavLink to={navLink.link}>{navLink.name}</NavLink>
          </div>
        ))}
      </section>
      <section className="nav-items">
        <NavLink to="/signin" onClick={() => localStorage.clear()}>
          {" "}
          Log out{" "}
        </NavLink>
      </section>
    </nav>
  );
}

export default Header;
