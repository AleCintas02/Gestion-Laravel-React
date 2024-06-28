import { useEffect, FormEventHandler, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [nameError, setNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [passwordConfirmationError, setPasswordConfirmationError] = useState<string | null>(null);

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const validateName = (name: string) => {
        return name.length >= 3 ? null : 'El nombre debe tener al menos 3 caracteres.';
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) ? null : 'El correo electrónico no tiene un formato válido.';
    };

    const validatePassword = (password: string) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);

        if (password.length < minLength) {
            return `La contraseña debe tener al menos ${minLength} caracteres.`;
        }

        if (!hasUpperCase) {
            return 'La contraseña debe tener al menos una letra mayúscula.';
        }

        if (!hasLowerCase) {
            return 'La contraseña debe tener al menos una letra minúscula.';
        }

        if (!hasNumber) {
            return 'La contraseña debe tener al menos un número.';
        }

        return null;
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setData('name', newName);
        setNameError(validateName(newName));
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setData('email', newEmail);
        setEmailError(validateEmail(newEmail));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setData('password', newPassword);
        setPasswordError(validatePassword(newPassword));
    };

    const handlePasswordConfirmationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPasswordConfirmation = e.target.value;
        setData('password_confirmation', newPasswordConfirmation);
        setPasswordConfirmationError(
            newPasswordConfirmation !== data.password ? 'Las contraseñas no coinciden.' : null
        );
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const nameValidationError = validateName(data.name);
        setNameError(nameValidationError);

        const emailValidationError = validateEmail(data.email);
        setEmailError(emailValidationError);

        const passwordValidationError = validatePassword(data.password);
        setPasswordError(passwordValidationError);

        if (!nameValidationError && !emailValidationError && !passwordValidationError && !passwordConfirmationError) {
            post(route('register'));
        }
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Nombre" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={handleNameChange}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                    {nameError && <p className="text-red-500 text-xs mt-2">{nameError}</p>}
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Correo" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={handleEmailChange}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                    {emailError && <p className="text-red-500 text-xs mt-2">{emailError}</p>}
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Contraseña" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={handlePasswordChange}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                    {passwordError && <p className="text-red-500 text-xs mt-2">{passwordError}</p>}
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirmar Contraseña" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={handlePasswordConfirmationChange}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                    {passwordConfirmationError && <p className="text-red-500 text-xs mt-2">{passwordConfirmationError}</p>}
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Ya estas registrado?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        REGISTRARSE
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
