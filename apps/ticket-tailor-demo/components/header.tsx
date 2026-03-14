import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-black px-8 py-4 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-start">
        <Link href="/" className="flex items-center">
          <Image
            src="/Cicada_Cinema_2024_icon_5-circle-white_80x@2x.png"
            alt="Cicada Cinema"
            width={60}
            height={60}
            className="h-[4.5rem] w-[4.5rem]"
          />
        </Link>
        <nav className="ml-12 flex items-center gap-8">
          <Link
            href="/"
            className="text-white transition-colors duration-200 hover:text-gray-300"
          >
            Home
          </Link>
          <Link
            href="/all-screenings"
            className="text-white transition-colors duration-200 hover:text-gray-300"
          >
            All Screenings
          </Link>
          <Link
            href="/previous-showings"
            className="text-white transition-colors duration-200 hover:text-gray-300"
          >
            Previous Showings
          </Link>
        </nav>
      </div>
    </header>
  );
}
