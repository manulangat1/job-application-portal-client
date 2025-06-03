import { useDispatch } from "react-redux";
import Resume from "../../../assets/usersvg.svg";
import { NavLink } from "react-router";
import { reset } from "../../../store/slices/auth/authSlice";

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
  const dispatch = useDispatch();
  const onLogout = () => {
    localStorage.clear();
    dispatch(reset());
  };
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
        <NavLink to="/signin" onClick={onLogout}>
          {" "}
          Log out{" "}
        </NavLink>
      </section>
    </nav>
  );
}

export default Header;
