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
}

const Button: React.FC<ButtonProps> = ({
  type,
  size,
  disabled,
  loading,
  onClick,
  className,
  style,
  icon,
  children,
}) => {
  const buttonClass = classNames(
    styles.button,
    styles[`button-${type}`],
    styles[`button-${size}`],
    { [styles.disabled]: disabled || loading },
    className,
  );

  return (
    <button
      className={buttonClass}
      style={style}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <span className={styles.spinner}></span>}{' '}
      {/* 加载中的 spinner */}
      {icon && <span className={styles.icon}>{icon}</span>} {/* 图标 */}
      {children && <span className={styles.text}>{children}</span>} {/* 文本 */}
    </button>
  );
};

export default Button;
