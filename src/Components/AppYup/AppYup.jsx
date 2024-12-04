import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import styles from './AppYup.module.css';

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.email('Введите корректный email')
		.matches(/\.ru$/, 'Email должен принадлежать домену "ru"')
		.required('Email обязателен'),
	password: Yup.string()
		.min(12, 'Пароль должен содержать не менее 12 символов')
		.matches(/\d/, 'Пароль должен содержать хотя бы одну цифру')
		.required('Пароль обязателен'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
		.required('Подтверждение пароля обязательно'),
});

const sendData = (formData) => {
	console.log(formData);
};

export const AppYup = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, dirtyFields },
		reset,
		setFocus,
	} = useForm({
		resolver: yupResolver(validationSchema),
		mode: 'onBlur',
	});

	const onSubmit = (data) => {
		sendData(data);
		reset();
	};

	useEffect(() => {
		if (isValid && Object.keys(dirtyFields).length > 0) {
			setFocus('submit');
		}
	}, [isValid, dirtyFields, setFocus]);

	return (
		<div className={styles.wrapper}>
			<form
				className={styles.form}
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className={styles.appName}>
					React Hook Form & Yup
				</div>
				<div className={styles.field}>
					<input
						className={styles.input}
						type="email"
						placeholder="Почта"
						{...register('email')}
					/>
					{errors.email && (
						<div className={styles.error}>
							{errors.email.message}
						</div>
					)}
				</div>
				<div className={styles.field}>
					<input
						className={styles.input}
						type="password"
						placeholder="Пароль"
						{...register('password')}
					/>
					{errors.password && (
						<div className={styles.error}>
							{errors.password.message}
						</div>
					)}
				</div>

				<div className={styles.field}>
					<input
						className={styles.input}
						type="password"
						placeholder="Подтвердите пароль"
						{...register('confirmPassword')}
					/>
					{errors.confirmPassword && (
						<div className={styles.error}>
							{errors.confirmPassword.message}
						</div>
					)}
				</div>

				<button
					id="submit"
					className={styles.button}
					type="submit"
					disabled={!(isValid && Object.keys(dirtyFields).length > 0)}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
