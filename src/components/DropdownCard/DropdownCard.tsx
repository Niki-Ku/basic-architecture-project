import Dropdown from '../Dropdown/Dropdown'
import { icons } from '../../config/dynamicIcons';

// make interfaces, make separate file with related interfaces

interface ISubCategories {
  subCategoryName: string;
  subCategoryPath: string;
}

interface ICategory {
  categoryTitle: string;
  subCategories: ISubCategories[];
}

interface IDropdownCard {
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
    <div className="rounded-lg px-3 pt-3 border border-gray-40 text-black-default overflow-hidden">
      <div className="flex items-center pt-[6px] pb-4 border-b border-transparentGray">
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