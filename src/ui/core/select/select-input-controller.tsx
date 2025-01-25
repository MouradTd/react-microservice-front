import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { SelectInput, SelectProps } from '.';

export type SelectInputControllerType<T extends FieldValues> = {
    name: Path<T>;
    control: Control<T>;
};

interface ControlledInputProps<T extends FieldValues> extends SelectProps {
    controllerProps: SelectInputControllerType<T>;
}

export function ControlledSelectInput<T extends FieldValues>(props: ControlledInputProps<T>) {
    const { controllerProps, ...inputProps } = props;
    const { name, control } = controllerProps;

    const { field, fieldState } = useController({ control, name });

    return (
        <SelectInput
            ref={field.ref}
            autoCapitalize="none"
            onChange={field.onChange}
            value={field.value as string}
            {...inputProps}
            error={fieldState.error?.message}
        />
    );
}
