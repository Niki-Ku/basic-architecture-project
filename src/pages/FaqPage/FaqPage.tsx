import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from "../../components/SearchBar/SearchBar";
import DropdownCard from "../../components/DropdownCard/DropdownCard";
import { ReactComponent as ArrowDown } from "../../assets/icons/ArrowDownFull.svg";
import { accountAndBilling, startWork, Fix, Watching, quickLinks, popularTopicsLinks } from '../../config/helpCenterConfig';
import { quickLinksIcons } from '../../config/dynamicIcons';
import { footerLinks } from "../../config/routeConfig";
import "./FaqPage.css";
import { useTranslation } from 'react-i18next';

const FaqPage = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState('');
  const handleDropdownClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(prevOpen => (prevOpen === id ? '' : id));
  };
  const exploreTopics = useRef<HTMLDivElement | null>(null);
  const heading = useRef<HTMLHeadingElement | null>(null);
  const [headingIsVisible, setHeadingIsVisible] = useState(true);
  const [searchValue, setSearchValue] = useState<string>("");
  

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      setHeadingIsVisible(entry.isIntersecting)
    })
    if (!heading.current) return;
    observer.observe(heading?.current);
  }, [])


  return(
    <div className="bg-bg-primary text-text-default">
      <div className="min-h-[360px]">
        <section className="flex flex-col justify-center" style={{minHeight: 'calc(100svh - 70px)'}}>
          <div className="px-3 py-12 grow flex items-center">
            <div className="w-full max-w-[600px] m-auto">
              <h1 ref={heading} className="font-extrabold text-[40px] mb-6 text-center">{t('how_can_we_help')}</h1>
              <div className={`h-[46px] mb-6`} style={headingIsVisible ? {height: 'auto'} : {height: '46px'}}>
                <div className={`${headingIsVisible ? '' : 'fixed bg-bg-primary z-10 w-full left-0 top-0 h-[80px] py-auto border-b border-text-transparent-40 flex justify-center items-center'}`} >
                  <div className={`${headingIsVisible ? '' : 'w-full max-w-[600px]'}`} >
                    <SearchBar links={footerLinks} query={searchValue} setQuery={setSearchValue} />
                  </div>
                </div>
              </div>
              <div className="text-center text-text-transparent-70">
                <p className="inline font-bold">{t('popular_topics')}: </p>
                <div className="inline">
                  {popularTopicsLinks.map(topic => (
                    <div key={topic.title} className="inline font-medium mr-1 after:content-[','] last:after:content-['']">
                      <Link
                        to={topic.link}
                        onClick={() => window.scrollTo({ top: 0, })}
                        className="underline hover:text-text-accent"
                      >
                        {t(topic.title)}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto w-6/12 text-text-default relative justify-self-end text-center">
            <button 
              onClick={() => {exploreTopics.current?.scrollIntoView({behavior: 'smooth'})}} 
              className='arrow-parent pb-10 inline-block hover:underline' 
            >
              <span className="font-bold">{t('explore_topics')}</span>
              <ArrowDown className="arrow h-6 w-6 absolute top-6 left-0 right-0 mx-auto w-[100px] fill-text-default" />
            </button>
          </div>
        </section>
      </div>
      <section className="px-3 py-12">
        <div  ref={exploreTopics} className="mb-10 flex flex-col gap-4 max-w-[600px] m-auto">
          {[accountAndBilling, startWork, Fix, Watching].map((item, index) => (
            <DropdownCard 
              key={index} 
              title={t(item.title)} 
              iconColor={item.iconColor} 
              icon={item.icon} 
              categories={item.categories} 
              open={open} 
              handleDropdownClick={handleDropdownClick} 
            />
          ))}
        </div>
        <div className=" max-w-[600px] m-auto">
          <h3 className="text-lg font-bold border-b border-text-hover pb-2">{t('quick_links')}</h3>
          <ul>
            {quickLinks.map((item, index) => {
              const Icon = quickLinksIcons[item.icon] 
              return (
                <li key={index} className="flex gap-4 items-center py-3 border-b border-text-hover last:border-0" >
                  <Icon className="w-4 h-4 fill-text-default" />
                  <Link to={item.link} className="underline font-bold hover:text-text-transparent-70">{t(item.title)}</Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default FaqPage;
