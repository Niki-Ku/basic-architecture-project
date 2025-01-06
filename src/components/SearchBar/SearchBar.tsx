import { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../../assets/icons/SearchIcon.svg";
import useDebounce from "../../hooks/useDebounce";

import "./SearchBar.css";
import { useTranslation } from "react-i18next";

// ask Yra why does removing of x from search input worked from SearchBar.css and didn't from index.css

interface SearchBarProps {
  links: {
    name: string;
    path: string;
  }[];
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ links, query, setQuery }) => {
  const { t } = useTranslation();
  // const [query, setQuery] = useState("");
  const filteredItems = links.filter(item => item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  const debouncedFilteredItems = useDebounce(filteredItems);

  return (
    <div className={`h-max w-full rounded p-0.5 z-10 relative text-left
      bg-gradient-to-r from-[#e50914] from-[-0.08%] via-[#c94ff5] via-[81%] to-[#5b79f1] to-[99.92%]
      ${query.length > 0 && 'rounded-br-none rounded-bl-none'}`}
    >
      <div className={`rounded overflow-hidden ${query.length > 0 && 'rounded-br-none rounded-bl-none'}`}>
        <form className="relative ">
          <input 
            onChange={(e) => setQuery(e.target.value)} 
            type="search" 
            value={query}
            placeholder={t('typeQuestionTopicOrIssue')}
            className="w-full bg-bg-primary text-text-default placeholder:text-text-secondary text-base pl-[52px] appearance-none pr-4 py-[9px] focus:outline-none"
          />
          <SearchIcon className="w-6 h-6 fill-text-default absolute top-[9px] left-3.5 pointer-events-none" />
        </form>
        <div className=" absolute left-0 w-full block rounded-br rounded-bl bg-gradient-to-r from-[#e50914] from-[-0.08%] via-[#c94ff5] via-[81%] to-[#5b79f1] to-[99.92%]">
          <div className="bg-bg-primary mt-0 m-[2px] rounded-br rounded-bl">
            <ul className={`${filteredItems.length > 0 && query.length > 0 && "flex flex-col gap-2 p-1 border-t border-black-10"}`}>
              {query.length > 0 && debouncedFilteredItems.slice(0, 5).map((link) => (
                  <li 
                    key={`seach-item-${link.name}`} 
                    className="bg-bg-primary text-text-default mx-4 hover:bg-bg-secondary cursor-pointer border-b border-text-transparent-10 last:border-0 py-[9px]"
                  >
                    <Link to={link.path} className="text-base">
                      {t(link.name)}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
