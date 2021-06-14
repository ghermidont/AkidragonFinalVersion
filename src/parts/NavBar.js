import React, {useState} from 'react';
import {Link} from 'react-router-dom';
//import {useAuthContext} from '../context/AuthContext';
import {useLanguageContext} from '../context/LanguageContext';
import {useTranslation} from 'react-i18next';
import SearchBar from "../components/SearchBar/SearchBar";
import logo from '../assets/images/src/DragonLogo.png';
import {useAuthContext} from "../context/AuthContext";
//import UpdateUserProfilePage from "../pages/UserAccount/UpdateUserProfilePage";

export default function NavBar() {
  const {currentUser, handleLogout, clearInput} = useAuthContext();
  const {setAppLanguage, appLanguage} = useLanguageContext();
  const {t, i18n} = useTranslation();

//TODO implement the burger menu closing setting in all the buttons.

  console.log("NavBar() worked!");
  const [toggleMenu, setToggleMenu] = useState('');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (

    <header className="header">
      <div className="header__inner">
        <div className="header-burger" onClick={() => setToggleMenu('menu--active')}>
          <span></span>
        </div>
        <Link className='header__logo' to="/">
          <img className="header__img" src={logo} alt="Akidragon"/>
        </Link>

        <nav className={`menu header__menu ${toggleMenu}`}>
          <div className="menu-close" onClick={() => setToggleMenu('')}>
            <span></span>
          </div>
          <ul className="menu__list">
            <li className="menu__item">
              <a className="menu__link">{t('NavBar.Menu.OurUniverse.OurUniverse')}</a>

              <span className="icon-angle-down arrow"></span>
              <ul className="sub-menu__list">
                <li className="sub-menu__item">
                  <Link className="sub-menu__link" onClick={() => setToggleMenu('')} to="/TournamentsPage">
                    {t('NavBar.Menu.OurUniverse.Tournaments')}
                  </Link>
                </li>
                {/*Phase 2*/}
                {/*<li className="sub-menu__item">*/}
                {/*    <Link to="/ContactUsPage">*/}
                {/*        <a className="sub-menu__link">Team e giochi</a>*/}
                {/*    </Link>*/}
                {/*</li>*/}
                {/*<li className="sub-menu__item">*/}
                {/*    <Link to="/ContactUsPage">*/}
                {/*        <a className="sub-menu__link">Sale Gaming</a>*/}
                {/*    </Link>*/}
                {/*</li>*/}
              </ul>
            </li>

            <li className="menu__item">
              <a className="menu__link">{t('NavBar.Menu.Community.Community')}</a>
              <span className="icon-angle-down arrow"></span>
              <ul className="sub-menu__list">
                <li className="sub-menu__item">
                  <Link className="sub-menu__link" onClick={() => setToggleMenu('')} to="/BlogPage">
                    {t('NavBar.Menu.Community.Blog')}
                  </Link>
                </li>
                <li className="sub-menu__item">
                  <Link className="sub-menu__link" onClick={() => setToggleMenu('')} to="/ContentPage">
                    {t('NavBar.Menu.Community.Content')}
                  </Link>
                </li>
              </ul>
            </li>

            <li className="menu__item">
              <a className="menu__link">{t('NavBar.Menu.TheBrand.TheBrand')}</a>
              <span className="icon-angle-down arrow"></span>
              <ul className="sub-menu__list">
                <li className="sub-menu__item">
                  <Link className="sub-menu__link" onClick={() => setToggleMenu('')} to="/AboutUsPage">
                    {t('NavBar.Menu.TheBrand.AboutUs')}
                  </Link>
                </li>
                <li className="sub-menu__item">
                  <Link className="sub-menu__link" onClick={() => setToggleMenu('')} to="/SponsorshipPage">
                    {t('NavBar.Menu.TheBrand.Sponsorship')}
                  </Link>
                </li>
              </ul>
            </li>

            <li className="menu__item">
              <Link className="menu__link menu__link--contact" to="/ContactUsPage">
                {t('NavBar.Menu.Contacts')}
              </Link>
            </li>

            <li className="menu__item">
              <ul className="lang header__lang">
                <li className="lang__item">
                  <button className="lang__link" onClick={() => {
                    changeLanguage("it");
                    if (appLanguage === "en") setAppLanguage("it");
                    console.log(appLanguage);
                  }
                  }>ITA
                  </button>
                </li>
                <li className="lang__item">
                  <button className="lang__link" onClick={() => {
                    changeLanguage("en");
                    if (appLanguage === "it") setAppLanguage("en");
                    console.log(appLanguage);
                  }
                  }>ENG
                  </button>
                </li>
              </ul>
            </li>
            {/*<div>Current language is "{appLanguage}"</div>*/}
            <li className="menu__item">
              <ul className="box-user__list">
                <li className="box-user__item">
                  {!currentUser &&
                  <Link className='box-user__enter' to='/MainLoginPage'>
                    <span className="icon-enter box-user__icon"></span>
                  </Link>
                  }
                </li>

                <li className="box-user__item">
                  {currentUser &&
                  <Link className="box-user__userpic" to='/UserProfilePage'>
                    <span className="icon-user box-user__icon"></span>
                  </Link>
                  }
                </li>
                <li className="box-user__item">
                  {currentUser &&
                  <Link to='/UpdateUserProfilePage' className='box-user__exit'>
                    <span className="icon-cog box-user__icon"></span>
                  </Link>
                  }
                </li>
                <li className="box-user__item">
                  {currentUser &&
                  <button className='box-user__exit' onClick={()=>{handleLogout(); clearInput();}}>
                    <span className="icon-exit box-user__icon"></span>
                  </button>
                  }
                </li>
              </ul>
            </li>
            <li className="menu__item">
              <div className="search header__search">
                <SearchBar/>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
     );
}

