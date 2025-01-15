import Dropdown from '../Dropdown/Dropdown'
import { icons } from '../../config/dynamicIcons';
import { ICategory } from '../../types/global';

export interface IDropdownCard {
  title: string;
  icon: keyof typeof icons;
  iconColor: string;
  categories: ICategory[];
  handleDropdownClick: (id:string, e: React.MouseEvent)=>void;
  open: string;
}

const DropdownCard:React.FC<IDropdownCard> = ({ title, icon, iconColor, categories, handleDropdownClick, open }) => {
  const Icon = icons[icon];
  return( 
    <div className="rounded-lg px-3 pt-3 border border-gray-40 text-text-default overflow-hidden">
      <div className="flex items-center pt-[6px] pb-4 border-b border-text-transparent-40">
        <Icon 
          className="w-5 h-5 mr-4 ml-1"
          style={{
            fill: `${iconColor}`,
          }}
        />
        <strong>{title}</strong>
      </div>
      {categories.map((category, index) => (
        <Dropdown key={category.categoryTitle} links={category} open={open} id={`id-${title}-${index}`} handleDropdownClick={handleDropdownClick} />
      ))}
    </div>
  )
};

export default DropdownCard;