import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import NetflixLogo from '../../assets/images/netflix-logo.png';
import { links, unauthorizedLinks } from '../../config/routeConfig';
import ToggleButton from "../ToggleButton/ToggleButton";
import BurgerButton from "../BurgerButton/BurgerButton";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { doSignOut } from "../../services/firebaseAuth";
import { useNavigate } from "react-router-dom";

const Header = ({
  darkMode,
  handleDarkModeChange
}: {
  darkMode: string,
  handleDarkModeChange: () => void
}) => {
  const location = useLocation();
  const { t } = useTranslation();
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const showLinks = userLoggedIn ? links : unauthorizedLinks;

  const onLogoutClick = () => {
    doSignOut();
    navigate('/');
  }

  const activeClass = ( path:string ) => {
    return location.pathname === path
    ? "text-lg font-semibold text-orange-500"
    : "text-lg font-semibold text-white hover:text-orange-500"
  };

  const [open, setOpen] = useState(false);
  const bodyClass = document.body.classList;
  open ? bodyClass.add('overflow-hidden') : bodyClass.remove('overflow-hidden');

  return (
    <header className="md:flex md:justify-between z-20 md:items-center bg-black-default text-center p-6 fixed top-0 left-0 w-full relative">
      <div className="max-w-max">
        <Link onClick={() => window.scrollTo({top: 0,})} to="/">
          <img src={NetflixLogo} alt="Netflix Logo" />
        </Link>
      </div>
      <div className="absolute top-[20%] right-[6%] md:hidden">
        <BurgerButton isOpen={open} variant="burger" ariaLabel="Main menu" onClick={() => setOpen(!open)} />
      </div>
      <nav className="flex">
        <ul 
          className={`
          bg-slate-900 absolute w-full left-0 top-0 pt-10 h-screen z-[-1]
          ease-in transition durarion-1000 md:duration-0 ${open ? '' : '-translate-y-[100vh]'} 
          md:flex md:h-auto md:p-0 gap-5 md:static md:z-auto md:translate-y-0 md:bg-transparent 
          `}
        >
          {
            showLinks.map((link) => (
              <li key={`li-${link.name}`} className="transform p-4 md:p-0 hover:scale-110 transition duration-200">
                <Link 
                  key={link.name}
                  className={activeClass(`${link.path}`)} 
                  to={link.path}
                  onClick={() => { setOpen(false); window.scrollTo({top: 0,}) }}
                >
                  {t(link.name)}
                </Link>
              </li>
            ))
          }
          {userLoggedIn && (
            <li className="transform p-4 md:p-0 hover:scale-110 transition duration-200">
              <button className="text-lg font-semibold text-white hover:text-orange-500" onClick={onLogoutClick} >{t('sign-out')}</button>
            </li>
          )}
          <li className="mx-auto inline-block">
            <ToggleButton id="toggle" checked={darkMode === "dark"} onChange={handleDarkModeChange} />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
