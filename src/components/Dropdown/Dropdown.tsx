import { Link } from 'react-router-dom';
import React from 'react';
import { ReactComponent as ArticleIcon } from '../../assets/icons/ArticleIcon.svg';
import { ReactComponent as ArrowDownShort } from '../../assets/icons/ArrowDownShort.svg';

interface ISubCategories {
  subCategoryName: string;
  subCategoryPath: string;
}

interface ICategory {
  categoryTitle: string;
  subCategories: ISubCategories[];
}

interface ICategoryCard {
  links: ICategory;
  Toggle: (id:string, e: React.MouseEvent)=>void;
  open: string;
  id: string;
}

const CategoryCard:React.FC<ICategoryCard> = ({ links, Toggle, open, id }) => {
  return (
    <div className="bg-white text-black w-full border-b border-transparentGray last:border-none">
      <details 
        id={`id-${links.categoryTitle}`} 
        onClick={(e) => Toggle(id, e)}
        open={open === id}
      >
        <summary className="flex text-base py-3 cursor-pointer justify-between">
          <strong className="font-bold">{links.categoryTitle}</strong>
          <ArrowDownShort className={`w-6 h-6 mr-2 ${open === id && 'origin-center rotate-180'} duration-100`} />
        </summary>
        <ul className="pt-4 pb-1">
          {links.subCategories.map(subCategory => (
            <div 
              key={subCategory.subCategoryName} 
              className="flex flex-wrap mb-4 w-max"
            >
              <ArticleIcon className="w-[16px] h-[16px] fill-black mr-2 mt-1" />
              <Link 
                to={subCategory.subCategoryPath}
                className="underline hover:text-[#000000b3]"
              >
                <li className="text-wrap">{subCategory.subCategoryName}</li>
              </Link>
            </div>
          ))}
        </ul>
      </details>
    </div>
  )
};

export default CategoryCard;
