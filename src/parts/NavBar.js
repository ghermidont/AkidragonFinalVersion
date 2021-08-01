/* eslint-disable no-mixed-spaces-and-tabs */
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useLanguageContext} from "../context/LanguageContext";
import {useTranslation} from "react-i18next";
import SearchBar from "../components/SearchBar/SearchBar";
import logo from "../assets/images/src/DragonLogo.png";
import {useAuthContext} from "../context/AuthContext";

export default function NavBar() {
	const {currentUser, handleLogout, clearInput} = useAuthContext();
	const {setAppLanguage, appLanguage} = useLanguageContext();
	const {t, i18n} = useTranslation();
	const [toggleMenu, setToggleMenu] = useState("");

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
	};

	return (
		<header className="header">
			<div className="header__inner">
				<div className="header-burger" onClick={() => setToggleMenu("menu--active")}>
					<span></span>
				</div>
				<Link className='header__logo' to="/">
					<img className="header__img" src={logo} alt="Akidragon"/>
				</Link>

				<nav className={`menu header__menu ${toggleMenu}`}>
					<div className="menu-close" onClick={() => setToggleMenu("")}>
						<span></span>
					</div>
					<ul className="menu__list">
						<li className="menu__item">
							<a className="menu__link">{t("NavBar.Menu.OurUniverse.OurUniverse")}</a>

							<span className="icon-angle-down arrow"></span>
							<ul className="sub-menu__list">
								<li className="sub-menu__item">
									<Link className="sub-menu__link" onClick={() => setToggleMenu("")} to="/TournamentsPage">
										{t("NavBar.Menu.OurUniverse.Tournaments")}
									</Link>
								</li>
								<li className="sub-menu__item">
									<Link className="sub-menu__link" onClick={() => setToggleMenu("")} to="/GameTeamsPage">
										{t("NavBar.Menu.OurUniverse.GameTeams")}
									</Link>
								</li>
								<li className="sub-menu__item">
									<Link className="sub-menu__link" onClick={() => setToggleMenu("")} to="/GameSalesPage">
										{t("NavBar.Menu.OurUniverse.SaleGames")}
									</Link>
								</li>
							</ul>
						</li>

						<li className="menu__item">
							<a className="menu__link">{t("NavBar.Menu.Community.Community")}</a>
							<span className="icon-angle-down arrow"></span>
							<ul className="sub-menu__list">
								<li className="sub-menu__item">
									<Link className="sub-menu__link" onClick={() => setToggleMenu("")} to="/BlogPage">
										{t("NavBar.Menu.Community.Blog")}
									</Link>
								</li>
								<li className="sub-menu__item">
									<Link className="sub-menu__link" onClick={() => setToggleMenu("")} to="/ContentPage">
										{t("NavBar.Menu.Community.Content")}
									</Link>
								</li>
							</ul>
						</li>

						<li className="menu__item">
							<a className="menu__link">{t("NavBar.Menu.TheBrand.TheBrand")}</a>
							<span className="icon-angle-down arrow"> </span>
							<ul className="sub-menu__list">
								<li className="sub-menu__item">
									<Link className="sub-menu__link" onClick={() => setToggleMenu("")} to="/AboutUsPage">
										{t("NavBar.Menu.TheBrand.AboutUs")}
									</Link>
								</li>
								<li className="sub-menu__item">
									<Link className="sub-menu__link" onClick={() => setToggleMenu("")} to="/SponsorshipPage">
										{t("NavBar.Menu.TheBrand.Sponsorship")}
									</Link>
								</li>
							</ul>
						</li>

						<li className="menu__item hover-off">
							<Link className="menu__link menu__link--contact" to="/ContactUsPage" onClick={() => setToggleMenu("")}>
								{t("NavBar.Menu.Contacts")}
							</Link>
						</li>

						<li className="menu__item hover-off">
							<ul className="lang header__lang">
								<li className="lang__item">
									<button className="lang__link" onClick={() => {
										changeLanguage("it");
										if (appLanguage === "en") setAppLanguage("it");

									}
									}>ITA
									</button>
								</li>
								<li className="lang__item">
									<button className="lang__link" onClick={() => {
										changeLanguage("en");
										if (appLanguage === "it") setAppLanguage("en");
									}
									}>ENG
									</button>
								</li>
							</ul>
						</li>
						<li className="menu__item hover-off">
							<ul className="box-user__list">
								<li className="box-user__item">
									{!currentUser &&
                  <Link className='box-user__enter' to='/MainLoginPage' onClick={() => setToggleMenu("")}>
	     			  {/* eslint-disable-next-line no-mixed-spaces-and-tabs */}
                  	<span className="icon-enter box-user__icon"></span>
                  </Link>
									}
								</li>

								<li className="box-user__item">
									{currentUser &&
                  <Link className="box-user__userpic" to='/UserProfilePage' onClick={() => setToggleMenu("")}>
                  	<span className="icon-user box-user__icon"></span>
                  </Link>
									}
								</li>
								<li className="box-user__item">
									{currentUser &&
                  <Link to='/UpdateUserProfilePage' className='box-user__exit' onClick={() => setToggleMenu("")}>
                  	<span className="icon-cog box-user__icon"></span>
                  </Link>
									}
								</li>
								<li className="box-user__item">
									{currentUser &&
                  <button className='box-user__exit' onClick={()=>{handleLogout(); clearInput(); setToggleMenu("");}}>
                  	<span className="icon-exit box-user__icon"></span>
                  </button>
									}
								</li>
							</ul>
						</li>
						<li className="menu__item hover-off">
							<div className="search header__search" onClick={() => setToggleMenu("")}>
								<SearchBar/>
							</div>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}

