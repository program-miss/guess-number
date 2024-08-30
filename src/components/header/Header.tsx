import ImageText from './ImageText';
import Input from './Input';

const Header: React.FC = () => {
  return (
    <header className="flex-row">
      <Input label="Points" step={25} defaultValue={50} />
      <Input label="Multiplier" step={0.25} defaultValue={1.0} />
      <ImageText image="/medal.png" text="1,000" />
      <ImageText image="/user.png" text="Thomas" />
      <ImageText image="/clock.png" text="21.30" />
    </header>
  );
};

export default Header;
