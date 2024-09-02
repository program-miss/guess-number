import { Button as ButtonLibrary } from '@nextui-org/react';
import { ButtonProps } from '../../types';
import styles from './Button.module.css';

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled }) => {
  return (
    <ButtonLibrary
      isDisabled={disabled}
      color="danger"
      size="lg"
      radius="sm"
      variant={!disabled ? 'shadow' : undefined}
      onClick={onClick}
      className={disabled ? styles.disabled : ''}
    >
      {text}
    </ButtonLibrary>
  );
};

export default Button;
