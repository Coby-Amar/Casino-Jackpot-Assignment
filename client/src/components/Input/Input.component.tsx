import { ChangeEventHandler, FC } from 'react';

import styles from './Input.module.css';

type InputTypes = 'text' | 'email' | 'password' | 'number' | 'tel';

interface InputProps {
    type: InputTypes
    name: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;

    label?: string;
    placeholder?: string;
    error?: string;
}

const Input: FC<InputProps> = ({ label, type, name, value, onChange, placeholder, error }) => {
    return (
        <div className={styles.inputContainer}>
            {label && <label htmlFor={name} className={styles.label}>{label}</label>}
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={styles.inputField}
            />
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
};

export default Input;
