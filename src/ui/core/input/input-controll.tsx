import type { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { Input, InputProps } from './input';

type TRule = Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;

export type RuleType<T> = { [name in keyof T]: TRule };
export type InputControllerType<T extends FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    rules?: TRule;
};

interface ControlledInputProps<T extends FieldValues> extends InputProps {
    controllerProps: InputControllerType<T>;
}

export function ControlledInput<T extends FieldValues>(props: ControlledInputProps<T>) {
    const { controllerProps, ...inputProps } = props;
    const { name, control, rules } = controllerProps;

    const { field, fieldState } = useController({ control, name, rules });

    return (
        <Input
            ref={field.ref}
            autoCapitalize="none"
            onChange={field.onChange}
            value={field.value as string}
            {...inputProps}
            error={fieldState.error?.message}
        />
    );
}
