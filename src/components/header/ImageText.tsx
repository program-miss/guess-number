import { HeaderImageTextProps } from '@/types';
import Image from 'next/image';

const ImageText: React.FC<HeaderImageTextProps> = ({ image, text }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Image src={image} alt="medal" width={20} height={20} />
      <div>{text}</div>
    </div>
  );
};

export default ImageText;
