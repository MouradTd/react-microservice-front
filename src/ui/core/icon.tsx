import { Icon as FIcon, IconProps } from '@iconify/react';
import React from 'react';

// generate icon props

interface Props extends IconProps {
    name: string;
    size?: number;
    color?: string;
    className?: string;
}

export const Icon: React.FC<Props> = ({ name, color = 'black', size = 20, className = '' }) => (
    <FIcon className={className} icon={name} color={color} fontSize={size} />
);
