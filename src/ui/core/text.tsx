import React from 'react';

interface Props {
    variant?: keyof typeof textVariants;
    className?: string;
    children: any;
}

export const textVariants = {
    defaults: 'text-base text-black font-inter  font-normal',
    h1: 'text-[32px] leading-[48px] font-medium',
    h2: 'text-[28px] leading-[42px] font-medium',
    h3: 'text-[24px] leading-[36px] font-medium',
    xl: 'text-[20px] leading-[30px]',
    lg: 'text-[18px] leading-[30px]',
    md: '',
    sm: 'text-[14px] leading-[21px]',
    xs: 'text-[12px] leading-[18px]',
    error: ' text-[12px] leading-[30px] text-danger-500'
};

export const Text: React.FC<Props> = ({ variant = 'md', className = '', children, ...props }) => {
    return (
        <span
            className={`${textVariants.defaults} ${textVariants[variant]}${className} text-danger-500`}
            {...props}
        >
            {children}
        </span>
    );
};
