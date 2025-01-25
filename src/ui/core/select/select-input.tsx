import React, { Fragment, SelectHTMLAttributes } from 'react';
import { Text } from '..';

interface SelectType {
    key: string;
    value: string;
}
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    id: string;
    data: SelectType[];
    error?: string;
}

export const SelectInput = React.forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
    const { data, label, error, id, ...propsInput } = props;
    const [isFocussed, setIsFocussed] = React.useState(false);
    const onBlur = React.useCallback(() => setIsFocussed(false), []);
    const onFocus = React.useCallback(() => setIsFocussed(true), []);

    return (
        <Fragment>
            <label htmlFor={id} className="block text-sm font-medium text-gray-900">
                {label}
            </label>
            <select
                ref={ref}
                onBlur={onBlur}
                onFocus={onFocus}
                {...propsInput}
                id={id}
                className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
            >
                <option value="">Please select</option>
                {React.Children.toArray(
                    data.map((item) => <option value={item.value}> {item.key} </option>)
                )}
            </select>
            {error && <Text variant="error">{error}</Text>}
        </Fragment>
    );
});
