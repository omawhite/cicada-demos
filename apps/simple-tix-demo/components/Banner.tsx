import Image from "next/image";

export default function Banner() {
  return (
    <div
      className="relative w-full h-[28rem] md:h-[36rem] lg:h-[48rem] overflow-hidden border-t-2 border-b-2 border-gradient-to-r border-transparent border-opacity-30"
      style={{
        borderImage:
          "linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent) 1",
      }}
    >
      {/* Background curtain image */}
      <Image
        src="/images/Cicada_Curtain_CROP_2.png"
        alt="Cicada Cinema Banner"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
