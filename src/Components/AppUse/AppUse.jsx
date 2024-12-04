import { useState } from 'react';
import styles from './AppUse.module.css';

const initialState = {
	email: '',
	password: '',
	confirmPassword: '',
};

const useStore = () => {
	const [state, setState] = useState(initialState);

	return {
		getState: () => state,
		updateState: (fieldName, newValue) => {
			setState({ ...state, [fieldName]: newValue });
		},
		resetState: () => setState(initialState),
	};
};

const sendData = (formData) => {
	console.log(formData);
};

export const AppUse = () => {
	const { getState, updateState, resetState } = useStore();
	const [errors, setErrors] = useState({});

	const onSubmit = (event) => {
		event.preventDefault();
		sendData(getState());
		resetState();
	};

	const { email, password, confirmPassword } = getState();

	const onChange = ({ target }) => {
		const { name, value } = target;
		updateState(name, value);

		let error = '';

		if (
			name === 'email' &&
			/^[\w.%+-]+@[\w.-]+\.(ru)$/i.test(value)
		) {
			error = '';
		}

		if (
			name === 'password' &&
			/^.{12,}$/.test(value) &&
			/.*\d.*/.test(value)
		) {
			error = '';
		}

		if (name === 'confirmPassword' && value === password) {
			error = '';
		}

		setErrors((prev) => ({ ...prev, [name]: error }));
	};

	const onBlur = ({ target }) => {
		const { name, value } = target;
		let error = '';

		if (
			name === 'email' &&
			!/^[\w.%+-]+@[\w.-]+\.(ru)$/i.test(value)
		) {
			error =
				'Email должен быть валидным и принадлежать домену "ru"';
		}

		if (
			name === 'password' &&
			(!/^.{12,}$/.test(value) || !/.*\d.*/.test(value))
		) {
			error =
				'Пароль должен быть длиной не менее 12 символов и содержать хотя бы одну цифру.';
		}

		if (name === 'confirmPassword' && value !== password) {
			error = 'Пароли не совпадают.';
		}

		setErrors((prev) => ({ ...prev, [name]: error }));
	};

	const isFormValid =
		email &&
		password &&
		confirmPassword &&
		!Object.values(errors).some((err) => err);

	return (
		<div className={styles.wrapper}>
			<form
				className={styles.form}
				onSubmit={onSubmit}
			>
				<div className={styles.appName}>UseState</div>
				<div className={styles.field}>
					<input
						className={styles.input}
						type="email"
						name="email"
						value={email}
						placeholder="Почта"
						onChange={onChange}
						onBlur={onBlur}
					/>
					{errors.email && (
						<div className={styles.error}>
							{errors.email}
						</div>
					)}
				</div>
				<div className={styles.field}>
					<input
						className={styles.input}
						type="password"
						name="password"
						value={password}
						placeholder="Пароль"
						onChange={onChange}
						onBlur={onBlur}
					/>
					{errors.password && (
						<div className={styles.error}>
							{errors.password}
						</div>
					)}
				</div>

				<div className={styles.field}>
					<input
						className={styles.input}
						type="password"
						name="confirmPassword"
						value={confirmPassword}
						placeholder="Подтвердите пароль"
						onChange={onChange}
						onBlur={onBlur}
					/>
					{errors.confirmPassword && (
						<div className={styles.error}>
							{errors.confirmPassword}
						</div>
					)}
				</div>

				<button
					className={styles.button}
					type="submit"
					disabled={!isFormValid}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
