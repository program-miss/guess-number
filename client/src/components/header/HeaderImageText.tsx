import Image from 'next/image';
import { HeaderImageTextProps } from '../../types';

const HeaderImageText: React.FC<HeaderImageTextProps> = ({ image, text }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Image src={image} alt="medal" width={20} height={20} />
      <div>{text}</div>
    </div>
  );
};

export default HeaderImageText;
