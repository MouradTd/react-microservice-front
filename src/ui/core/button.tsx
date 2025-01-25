import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title?: string;
    variant: VariantName;
}

type VariantName = 'defaults' | 'primary' | 'outline' | 'secondary';
type BVariant = {
    [key in VariantName]: string;
};

export const buttonVariants: BVariant = {
    defaults: 'flex-row items-center justify-center rounded-md px-12 py-2 my-2',
    primary: 'bg-primary-500 text-white',
    secondary: 'bg-primary-600',
    outline: 'border border-neutral-400'
};

export const Button: React.FC<ButtonProps> = ({ title, variant = 'primary', ...props }) => {
    return (
        <button {...props} className={`${buttonVariants.defaults} ${buttonVariants[variant]}`}>
            {title}
        </button>
    );
};
