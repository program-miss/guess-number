import ImageText from './HeaderImageText';
import HeaderInput from './HeaderInput';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-center gap-4">
      <HeaderInput type="points" step={25} defaultValue={50} />
      <HeaderInput type="multiplier" step={0.25} defaultValue={1.0} />
      <ImageText image="/medal.png" text="1,000" />
      <ImageText image="/user.png" text="Thomas" />
      <ImageText image="/clock.png" text="21.30" />
    </header>
  );
};

export default Header;
