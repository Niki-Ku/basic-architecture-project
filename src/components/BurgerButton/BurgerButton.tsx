import React from 'react';

interface BurgerButtonProps {
    onClick?: () => void;
    variant: 'burgerBlack' | 'burger';
    background?: 'black' | 'white' | 'transparent' | 'transparentBlack';
    isOpen: boolean;
    ariaLabel?: string;
}

const BurgerButton: React.FC<BurgerButtonProps> = ({ 
    onClick, 
    variant = 'burger',
    background = 'transparent',
    isOpen,
    ariaLabel,
}) => {
    const divStyles = {
      transparentBlack: 'bg-bg-secondary inline-block p-2 relative cursor-pointer rounded',
      white: 'bg-white inline-block p-2 cursor-pointer rounded',
      black: 'bg-black-default inline-block p-2 cursor-pointer rounded',
      transparent: 'bg-transparent inline-block p-2 cursor-pointer rounded',
    }
    return (
        <div className={divStyles[background]} onClick={onClick}>
          <button
            className={`relative block w-[30px] h-[24px]`}
            aria-label={ariaLabel}
          >   
            <span className={`
              bg-bg-accent absolute left-0 h-[0.125rem] w-full 
              transition-all ease-in duration-300 delay-0	
              ${isOpen ? 'top-[50%] -rotate-45' : 'top-[0%] rotate-0'}`}
            ></span>
            <span className={`
              bg-bg-accent absolute top-[50%] left-0 h-[0.125rem] w-full
              transition-all ease-in duration-300	delay-0	
              ${isOpen && 'after:top-0 after:rotate-45 scale-0 after:scale-100'} `}
            ></span>
            <span className={`
              bg-bg-accent absolute left-0 h-[0.125rem] w-full
              transition-all ease-in duration-300 delay-0	
              ${isOpen ? 'top-[50%] rotate-45' : 'top-[100%] rotate-0'}`}
            ></span>
          </button>
        </div>
    );
};

export default BurgerButton;
