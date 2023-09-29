import classes from "./Header.module.css";
import logo from "../../assets/images/logo.png";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const redirectToHome = () => {
    navigate("/");
  };
  return (
    <>
      <nav className={classes.navBarContainer}>
        <div className={classes.container} onClick={redirectToHome}>
          <img src={logo} className={classes.logo} alt="logo" />
        </div>
        <NavLink to="/" className={classes.navlink}>
          Home
        </NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Header;
