import styles from './button.module.scss';
import classNames from 'classnames';
import React from 'react';

interface ButtonProps {
  type?: 'primary' | 'secondary' | 'danger';
  size?: 'large' | 'medium' | 'small';
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  htmlType?: 'submit' | 'button' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  type = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  className,
  style,
  icon,
  children,
  htmlType = 'button',
}) => {
  const buttonClass = classNames(
    styles.button,
    styles[`button-${type}`],
    styles[`button-${size}`],
    { [styles.disabled]: disabled },
    { [styles.loading]: loading },
    className,
  );

  return (
    <button
      className={buttonClass}
      style={style}
      onClick={onClick}
      disabled={disabled}
      type={htmlType}
    >
      {loading && <span className={styles.spinner}></span>}{' '}
      {icon && !loading && <span className={styles.icon}>{icon}</span>}
      {children && <span className={styles.text}>{children}</span>}
    </button>
  );
};

export default Button;
