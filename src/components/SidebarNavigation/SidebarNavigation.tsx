import SidebarDropdown from "../SidebarDropdown/SidebarDropdown";
import { sidebarDropdownLinks } from "../../config/routeConfig";

export interface ISidebarNavigation {
  activeTopic: string;
  allSections: HTMLDivElement[];
  setActiveTopic: React.Dispatch<React.SetStateAction<string>>;
  openSection?: string;
}

const SidebarNavigation:React.FC<ISidebarNavigation> =  ({ activeTopic, allSections, setActiveTopic, openSection }) => {
  return (
    <div>
      {sidebarDropdownLinks.map(dropdownLink => (
        <SidebarDropdown 
          key={dropdownLink.id} 
          title={dropdownLink.title} 
          id={dropdownLink.id} 
          subLinks={dropdownLink.subLinks} 
          allSections={allSections} 
          activeTopic={activeTopic}
          setActiveTopic={setActiveTopic}
          openSection={openSection}
         />
      ))}
    </div>
  );
};

export default SidebarNavigation;
