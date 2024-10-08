import Image from 'next/image';
import { ImageLabelProps } from '../types';

const ImageLabel: React.FC<ImageLabelProps> = ({ image, text }) => {
  return (
    <div className="flex items-center gap-1">
      <Image src={`/${image}.png`} alt={image} width={20} height={20} />
      <label>{text}</label>
    </div>
  );
};
export default ImageLabel;
