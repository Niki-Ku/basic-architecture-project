import { Link } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import { ReactComponent as ArrowDownShort } from '../../assets/icons/ArrowDownShort.svg';
import { useTranslation } from 'react-i18next';

interface ISubLink {
  title: string;
  id: string;
}

interface ISidebarDropdown {
  title: string;
  subLinks?: ISubLink[] | null;
  id: string;
  openSection?: string;
  activeTopic?: string;
  allSections: HTMLDivElement[];
  setActiveTopic: Function ;
}

const SidebarDropdown:React.FC<ISidebarDropdown> = ({ title, subLinks, id, activeTopic, allSections, setActiveTopic, openSection }) => {
  const { t } = useTranslation();
  const handleDetailsClick = (e:React.MouseEvent) => {
    e.preventDefault();
    setActiveTopic(id);
    allSections.find(section => section.id === id)?.scrollIntoView({behavior: 'smooth'});
  }
  
  const handleDetailsChildClick = (e:React.MouseEvent, id:string) => {
    e.stopPropagation();
    allSections.find(section => section.id === id)?.scrollIntoView({behavior: 'smooth'})
  }
  
  const [arrowStyles, setArrowStyles] = useState({})

  useEffect(() => {
    if (openSection === `${id}-dropdown` && id === activeTopic) {
      setArrowStyles({transform: 'rotate(0deg)', transformOrigin: 'center', fill: 'rgb(var(--text-accent))'})
    } else if (`${id}-dropdown` === openSection) {
      setArrowStyles({transform: 'rotate(0deg)', transformOrigin: 'center'})
    } else {
      setArrowStyles({})
    }
  }, [openSection, activeTopic, id])
  
  return (
    <div className="text-text-default w-full">
      <details 
        open={openSection === `${id}-dropdown`}
        onClick={(e) => handleDetailsClick(e)}
      >
        <summary 
            className={`text-base p-2 cursor-pointer list-none`}
            style={activeTopic === id ? {color: "rgb(var(--text-default-reverce))", backgroundColor: "rgb(var(--bg-accent))"} : {}}
          >
          <Link
            onClick={() => window.scrollTo({ top: 0, })}
            to="#collectCategories"
            className="flex justify-between"
          >
            <p>{t(title)}</p>
            {subLinks && (
              <ArrowDownShort 
                className={`w-6 h-6 mr-2 fill-text-default -rotate-90 duration-100 shrink-0`} 
                style={arrowStyles}
              />
            )}
          </Link>
        </summary>
        {subLinks && (
          <ul className="">
            {subLinks.map(link => (
              <div key={link.title} className="mx-5 py-5">
                <li 
                  onClick={(e) => handleDetailsChildClick(e, link.id)}
                  className={`p-2 inline-block w-full text-wrap cursor-pointer`}
                  style={activeTopic === link.id ? {color: "rgb(var(--text-default-reverce))", backgroundColor: "rgb(var(--bg-accent))"} : {}}
                >
                  {t(link.title)}
                </li>
              </div>
            ))}
          </ul>
        )}
      </details>
    </div>
  )
};

export default SidebarDropdown;
