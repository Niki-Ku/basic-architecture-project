import React from 'react';
import { buttonIcons } from '../../config/dynamicIcons';

interface ButtonProps {
    label: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'white';
    type?: 'button' | 'submit' | 'reset';
    icon?: keyof typeof buttonIcons;
    iconVariant?: 'black' | 'white';
    disabled?: boolean;
    wide?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
    label, 
    onClick, 
    variant = 'primary',
    iconVariant = 'black',
    type = 'button',
    icon,
    disabled,
    wide
}) => {
    const buttonStyles = {
        primary: `${wide && 'w-full'} bg-red-default hover:bg-red-secondary text-text-default py-2 px-4 rounded inline-flex justify-center items-center gap-2`,
        secondary: `${wide && 'w-full'} bg-gray-secondary hover:bg-bg-hover text-text-default py-2 px-4 rounded inline-flex justify-center items-center gap-2`,
        white: `${wide && 'w-full'} bg-white hover:bg-bg-hover text-black-default py-2 px-4 rounded inline-flex justify-center items-center gap-2`,
    };
    const iconStyles = {
        black: 'w-5 h-5 fill-text-default inline-block',
        white: 'w-5 h-5 fill-text-default inline-block',
    }
    const styles = {
        backgroundColor: disabled ? '#d1d5db' : '',
        color: disabled ? '#222222' : '',
      };
    let Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | null;
    icon ? Icon = buttonIcons[icon] : Icon = null;
    return (
        <button
            type={type}
            className={buttonStyles[variant]}
            onClick={onClick}
            disabled={disabled}
            style={styles}
        >   
            {icon && Icon && <Icon className={iconStyles[iconVariant]} />}
            {label}
        </button>
    );
};

export default Button;
