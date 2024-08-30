import { ButtonProps } from '@/types';
import { Button as ButtonLibrary } from '@nextui-org/react';

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <ButtonLibrary
      color="danger"
      size="lg"
      radius="sm"
      variant="shadow"
      onClick={onClick}
    >
      Send
    </ButtonLibrary>
  );
};

export default Button;
