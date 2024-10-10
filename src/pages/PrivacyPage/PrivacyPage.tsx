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

// TODO:
// find solution to keep active elements of sidebar in view
// make onpen/close state of each section
// pass openSection value as props to components
// useMemo

const PrivacyPage = () => {
  const [ activeTopic, setActiveTopic ] = useState('');
  const [ openSection, setOpenSection ] = useState('');
  const topicRefs = useRef<HTMLDivElement[]>([]);
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  const activeTopicRef = useRef(activeTopic);
  const activeSectionRef = useRef(openSection); 

  useEffect(() => {
    activeTopicRef.current = activeTopic;
  }, [activeTopic]);

  useEffect(() => {
    activeSectionRef.current = openSection;
  }, [openSection]);

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
    <div className="bg-white text-black-default">
      <div> back to home link and print button here </div>
      <div>
        <div className="sideBar sticky top-[100px] max-w-[275px] w-[25%] overflow-y-auto float-left border-t-4 border-red-default">
          <SidebarNavigation activeTopic={activeTopic} setActiveTopic={setActiveTopic} allSections={topicRefs.current} openSection={openSection} />
        </div>
        <div className="flex flex-col ml-auto">
          <PrivacyStatement id="privacy-statement" ref={addToRefs} />
          <ContactingUs id="contacting-us" ref={addToRefs} />
          <section ref={addToSectionRefs} id="hidden-section" className=""></section>
          <section ref={addToSectionRefs} id="section-a-dropdown">
            <h2 
              className={`text-3xl my-10 `} 
              id="section-a" 
              ref={addToRefs}
            > 
              Section A: Our Collection, Use, and Disclosure of Personal Information
            </h2>
            <TheCategoriesOfPersonal ref={addToRefs} id="the-categories-of-personal-information-we-collect" />
            <WhereWeCollectPersonal ref={addToRefs} id="where-we-collect-personal-information-from" />
            <HowWeUsePersonal ref={addToRefs} id="how-we-use-your-personal-information" />
          </section>
          <section ref={addToSectionRefs} id="section-b-dropdown">
            <h2 
              className={`text-3xl my-10 `} 
              id="section-b" 
              ref={addToRefs}
            > 
              Section B: Your Rights and Controls
            </h2>
            <YourPrivacyRights ref={addToRefs} id="your-privacy-rights" />
            <ComunicationAndMarketing ref={addToRefs} id="communication-and-marketing-preferences" />
            <AdvertisingChoices ref={addToRefs} id="advertising-choices" />
          </section>
        </div>
      </div>
        {/* remove in the end */}
        <div className="min-h-[200dvh]"></div>
    </div>
  )
};

export default PrivacyPage;
