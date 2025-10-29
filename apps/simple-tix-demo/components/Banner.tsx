import { ImageBanner } from '@workspace/cicada-ui/components/ImageBanner';
import Image from 'next/image';

export default function Banner() {
  return (
    <ImageBanner>
      <Image
        src="/images/Cicada_Curtain_CROP_2.png"
        alt="Cicada Cinema Banner"
        fill
        className="object-cover"
        priority
      />
    </ImageBanner>
  );
}
