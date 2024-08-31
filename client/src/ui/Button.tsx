import { Button as ButtonLibrary } from '@nextui-org/react';
import { ButtonProps } from '../types';

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <ButtonLibrary
      color="danger"
      size="lg"
      radius="sm"
      variant="shadow"
      onClick={onClick}
    >
      {text}
    </ButtonLibrary>
  );
};

export default Button;
