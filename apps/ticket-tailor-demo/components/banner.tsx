import Image from 'next/image';

export function Banner() {
  return (
    <div
      className="relative h-[20rem] w-full overflow-hidden border-b-2 border-t-2 md:h-[24rem] lg:h-[32rem]"
      style={{
        borderImage:
          'linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent) 1',
      }}
    >
      <Image
        src="/Cicada_Curtain_CROP_2.png"
        alt="Cicada Cinema Banner"
        fill
        className="object-cover object-center"
        priority
      />
    </div>
  );
}
