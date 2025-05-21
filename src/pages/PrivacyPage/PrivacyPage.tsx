import PrivacyStatement from "./PrivacyPageComponents/PrivacyStatement";
import ContactingUs from "./PrivacyPageComponents/ContactingUs";
import SidebarNavigation from "../../components/SidebarNavigation/SidebarNavigation";
import { useEffect, useMemo, useRef, useState } from "react";
import TheCategoriesOfPersonal from "./PrivacyPageComponents/TheCategoriesOfPersonal";
import WhereWeCollectPersonal from "./PrivacyPageComponents/WhereWecollectPersonal";
import HowWeUsePersonal from "./PrivacyPageComponents/HowWeUsePersonal";
import YourPrivacyRights from "./PrivacyPageComponents/YourPrivacyRights";
import ComunicationAndMarketing from "./PrivacyPageComponents/ComunicationAndMarketing";
import AdvertisingChoices from "./PrivacyPageComponents/AdvertisingChoices";
import "./PrivacyPage.css";
import { useTranslation} from "react-i18next";
import PrivacyPageHeader from "./PrivacyPageComponents/PrivacyPageHeader";
import PrivacyPageMobileNavigation from "./PrivacyPageComponents/PrivacyPageMobileNavigation";

const PrivacyPage = () => {
  const [ activeTopic, setActiveTopic ] = useState('');
  const [ openSection, setOpenSection ] = useState('');
  const topicRefs = useRef<HTMLDivElement[]>([]);
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  const activeTopicRef = useRef(activeTopic);
  const activeSectionRef = useRef(openSection);
  const { t } = useTranslation();

  const options = useMemo(() => {
    return {
      threshold: 0,
      rootMargin: '-10px'
    }
  }, [])

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !topicRefs.current.includes(el)) {
      topicRefs.current.push(el);
    }
  };

  const addToSectionRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  }

  const handleIntersection = (
    entries: IntersectionObserverEntry[],
    refs:React.MutableRefObject<HTMLDivElement[]>, 
    activeRef:React.MutableRefObject<string>,
    setActive:React.Dispatch<React.SetStateAction<string>>
  ) => {
    const entry = entries[0];
    const currentEntryId = entry.target.id;
    const currentEntryIndex = refs.current.findIndex(el => el.id === currentEntryId);
    const activeSectionIndex = refs.current.findIndex(el => el.id === activeRef.current);
    const previouseToActiveSectionId = refs.current[activeSectionIndex - 1]?.id;
    const nextSectionId = refs.current[activeSectionIndex + 1]?.id;
    
    if (currentEntryIndex === activeSectionIndex && !entry.isIntersecting) {
      setActive(nextSectionId);
      return
    }
    if (previouseToActiveSectionId === currentEntryId && entry.isIntersecting) {
      setActive(currentEntryId)
      return
    }
  }

  const topicObserver = useMemo(() => {
    return new IntersectionObserver((entries) => {
      handleIntersection(entries, topicRefs, activeTopicRef, setActiveTopic)
    }, options);
  }, [options])
  
  const sectionObserver = useMemo(() => {
    return new IntersectionObserver((entries) => {
      handleIntersection(entries, sectionRefs, activeSectionRef, setOpenSection)
    }, options);
  }, [options]) 

  useEffect(() => {
    activeTopicRef.current = activeTopic;
  }, [activeTopic]);

  useEffect(() => {
    activeSectionRef.current = openSection;
  }, [openSection]);

useEffect(() => {
  const currentTopicRefs = topicRefs.current;

    if (activeTopic === '') {
        setActiveTopic(currentTopicRefs[0]?.id);
    }

    topicRefs.current.forEach(ref => {
        topicObserver.observe(ref);
    });

    return () => {  
      currentTopicRefs.forEach(ref => {
          topicObserver.unobserve(ref);
      });
    };
}, [openSection, activeTopic, topicObserver]);

useEffect(() => {
  const currentSectionRefs = sectionRefs.current;
  if (openSection === '') {
    setOpenSection(currentSectionRefs[0].id);
  }

  sectionRefs.current.forEach(ref => {
    sectionObserver.observe(ref);
  })

  return () => {
    currentSectionRefs.forEach(ref => {
      sectionObserver.unobserve(ref);
  });
  }
}, [openSection, sectionObserver]);

  return(
    <div className="bg-bg-default text-text-default pt-8 pb-12 flex justify-center">
      <div className="px-3 max-w-[1248px]">
        <div className="flex items-center relative">
          <PrivacyPageHeader />
          <div className="md:hidden w-[60px]">
            <div className="fixed top-[102px] right-3 z-10">
              <PrivacyPageMobileNavigation
                activeTopic={activeTopic} 
                setActiveTopic={setActiveTopic} 
                allSections={topicRefs.current} 
                openSection={openSection}
              />
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="sideBar mr-10 hidden md:block sticky top-[200px] max-w-[275px] w-[25%] overflow-y-auto float-left border-t-4 border-red-default">
            <SidebarNavigation 
              activeTopic={activeTopic} 
              setActiveTopic={setActiveTopic} 
              allSections={topicRefs.current} 
              openSection={openSection}
            />
          </div>
          <div className="flex flex-col ml-auto md:max-w-[70%]">
            <section ref={addToSectionRefs} id="hidden-section" className="flex flex-col gap-20">
              <PrivacyStatement id="privacy-statement" ref={addToRefs} />
              <ContactingUs id="contacting-us" ref={addToRefs} />
            </section>
            <section ref={addToSectionRefs} id="section-a-dropdown" className="flex flex-col gap-10">
              <h2 
                className={`text-3xl mt-20 `} 
                id="section-a" 
                ref={addToRefs}
              >
                {t('sectionA')}
              </h2>
              <TheCategoriesOfPersonal ref={addToRefs} id="the-categories-of-personal-information-we-collect" />
              <WhereWeCollectPersonal ref={addToRefs} id="where-we-collect-personal-information-from" />
              <HowWeUsePersonal ref={addToRefs} id="how-we-use-your-personal-information" />
            </section>
            <section ref={addToSectionRefs} id="section-b-dropdown" className="flex flex-col gap-10">
              <h2 
                className={`text-3xl mt-20`} 
                id="section-b" 
                ref={addToRefs}
              >
                {t('sectionB')}
              </h2>
              <YourPrivacyRights ref={addToRefs} id="your-privacy-rights" />
              <ComunicationAndMarketing ref={addToRefs} id="communication-and-marketing-preferences" />
              <AdvertisingChoices ref={addToRefs} id="advertising-choices" />
            </section>
          </div>
        </div>
      </div>
    </div>
  )
};

export default PrivacyPage;
