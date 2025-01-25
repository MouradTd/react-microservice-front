import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, ControlledInput } from '@/ui';
import { useForm, Form } from 'react-hook-form';

const schema = z.object({
    email: z.string({ required_error: 'email is required' }).email({ message: 'invalide email' }),
    password: z
        .string({ required_error: 'password is required' })
        .min(3, { message: 'password is required' })
});
export type FormType = z.infer<typeof schema>;

export const LoginPage: React.FC = () => {
    const { control, handleSubmit } = useForm<FormType>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: zodResolver(schema)
    });
    const submit_data = (data: FormType) => {
        console.log('data submited by form');
        console.log(data);
    };
    return (
        <div className="flex flex-col justify-center items-center w-full h-screen">
            <h2 className="block mb-5 font-sans text-5xl font-semibold leading-tight tracking-normal text-inherit antialiased">
                Login
            </h2>
            <Form
                control={control}
                className="max-w-[500px] w-full flex flex-col gap-4 justify-center "
            >
                <ControlledInput
                    id="email"
                    label="Email"
                    controllerProps={{ control, name: 'email' }}
                    className="mb-2"
                />
                <ControlledInput
                    id="password"
                    label="Password"
                    type="password"
                    controllerProps={{ control, name: 'password' }}
                />
                <Button
                    type="submit"
                    onClick={handleSubmit(submit_data)}
                    title="LOGIN"
                    variant="primary"
                />
            </Form>
        </div>
    );
};
