import Image from 'next/image';
import { HeaderImageTextProps } from '../../../types';
import styles from './HeaderImageText.module.css';

const HeaderImageText: React.FC<HeaderImageTextProps> = ({ image, text }) => {
  return (
    <div className={styles.container}>
      <Image src={image} alt="medal" width={20} height={20} />
      <div>{text || ''}</div>
    </div>
  );
};

export default HeaderImageText;
