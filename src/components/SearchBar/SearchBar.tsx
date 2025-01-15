import { Link } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../../assets/icons/SearchIcon.svg";
import useDebounce from "../../hooks/useDebounce";
import { Links } from "../../types/global";
import "./SearchBar.css";
import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";

interface SearchBarProps {
  links: Links[];
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  onSubmit?: (e: React.FormEvent) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ links, query, setQuery, onSubmit, placeholder }) => {
  const { t } = useTranslation();
  const filteredItems = links.filter(item => item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  const debouncedFilteredItems = useDebounce(filteredItems);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFocused(false);
    if (inputRef.current) {
      inputRef.current.blur()
    }
    if (onSubmit) {
      onSubmit(e)
    }
  }
  
  return (
    <div className={`h-max w-full rounded p-0.5 z-10 relative text-left
      bg-gradient-to-r from-[#e50914] from-[-0.08%] via-[#c94ff5] via-[81%] to-[#5b79f1] to-[99.92%]
      ${query.length > 0 && 'rounded-br-none rounded-bl-none'}`}
    >
      <div className={`rounded overflow-hidden ${query.length > 0 && 'rounded-br-none rounded-bl-none'}`}>
        <form className="relative" onSubmit={(e) => handleSubmit(e)}>
          <input 
            onChange={(e) => setQuery(e.target.value)} 
            onFocus={() => setIsFocused(true)}
            ref={inputRef}
            type="search" 
            value={query}
            placeholder={placeholder ? t(placeholder) :t('typeQuestionTopicOrIssue')}
            className="w-full bg-bg-primary text-text-default placeholder:text-text-secondary text-base pl-[52px] appearance-none pr-4 py-[9px] focus:outline-none"
          />
          <SearchIcon className="w-6 h-6 fill-text-default absolute top-[9px] left-3.5 pointer-events-none" />
        </form>
        <div className=" absolute left-0 w-full block rounded-br rounded-bl bg-gradient-to-r from-[#e50914] from-[-0.08%] via-[#c94ff5] via-[81%] to-[#5b79f1] to-[99.92%]">
          <div className="bg-bg-primary mt-0 m-[2px] rounded-br rounded-bl">
            <ul className={`${filteredItems.length > 0 && query.length > 0 && "flex flex-col gap-2 p-1 border-t border-black-10"}`}>
              {isFocused && query.length > 0 && debouncedFilteredItems.slice(0, 5).map((link, index) => (
                  <li 
                    key={`seach-item-${link.name}-${index}`} 
                    className="bg-bg-primary text-text-default mx-4 hover:bg-bg-secondary cursor-pointer border-b border-text-transparent-10 last:border-0 py-[9px]"
                  >
                  <Link
                    onClick={() => window.scrollTo({ top: 0, })}
                    to={link.path}
                    className="text-base w-full h-full block z-10"
                  >
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
