import React, { InputHTMLAttributes } from 'react';
import { Text } from '..';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    disabled?: boolean;
    error?: string;
    id: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { label, error, id, ...inputProps } = props;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isFocussed, setIsFocussed] = React.useState(false);
    const onBlur = React.useCallback(() => setIsFocussed(false), []);
    const onFocus = React.useCallback(() => setIsFocussed(true), []);

    return (
        <div>
            <span
                className={`pointer-events-none text-xs ${
                    error ? 'text-red-500' : 'text-gray-700'
                } transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs`}
            >
                {label}
            </span>
            <label
                htmlFor={id}
                className={`flex justify-center items-center rounded-md border ${
                    error ? 'border-red-500' : 'border-gray-200'
                } shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600`}
            >
                <input
                    onBlur={onBlur}
                    onFocus={onFocus}
                    {...inputProps}
                    ref={ref}
                    id={id}
                    className="w-full peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                />
            </label>
            {error && <Text variant="error">{error}</Text>}
        </div>
    );
});
/*



         <div className="relative float-label-input">
            <input
                onBlur={onBlur}
                onFocus={onFocus}
                ref={ref}
                id={id}
                {...inputProps}
                className="block w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 block appearance-none leading-normal focus:border-blue-400"
            />
            <label
                htmlFor={id}
                className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-outbg-white px-2 text-grey-darker"
            >
                {label}
            </label>
        </div>
         */
