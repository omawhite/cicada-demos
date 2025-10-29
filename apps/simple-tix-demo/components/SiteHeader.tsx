import Header from '@workspace/cicada-ui/components/Header';
import Image from 'next/image';
import Link from 'next/link';

export default function SiteHeader() {
  return (
    <Header
      logo={
        <Link href="/" className="flex items-center">
          <Image
            src="/images/Cicada_Cinema_2024_icon_5-circle-white_80x@2x.png"
            alt="Cicada Cinema"
            width={60}
            height={60}
            className="w-18 h-18"
          />
        </Link>
      }
      navigationLinks={
        <>
          <Link
            href="/"
            className="text-white hover:text-gray-300 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/showtimes"
            className="text-white hover:text-gray-300 transition-colors duration-200"
          >
            Showtimes
          </Link>
          <Link
            href="/events-calendar"
            className="text-white hover:text-gray-300 transition-colors duration-200"
          >
            Calendar
          </Link>
        </>
      }
    />
  );
}
