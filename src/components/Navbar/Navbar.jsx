import React, { useContext } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import cart_icon from "../../assets/caret_icon.svg";
import { logout } from "../../firebase";
import { AuthContext } from "../../AuthContext";

const Navbar = () => {
	const { currentUser } = useContext(AuthContext);

	return (
		<div className="navbar">
			<div className="navbar-left">
				<img src={logo} alt="" />
				<ul>
					<li>Home</li>
					<li>Tv Shows</li>
					<li>Movies</li>
					<li>New & Popular</li>
					<li>My List</li>
					<li>Browse by Languages</li>
				</ul>
			</div>
			<div className="navbar-right">
				<img src={search_icon} alt="" className="icons" />
				<p>Children</p>
				<img src={bell_icon} alt="" className="icons" />
				<div className="navbar-profile">
					<img src={profile_img} alt="" className="profile" />
					<img src={cart_icon} alt="" />
					<div className="dropdown">
						{currentUser ? (
							<p onClick={logout}>Sign Out of Netflix</p>
						) : (
							<p onClick={() => navigate("/login")}>Sign In</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
