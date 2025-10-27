import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-black text-white py-4 px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-start">
        {/* Logo and brand */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/Cicada_Cinema_2024_icon_5-circle-white_80x@2x.png"
            alt="Cicada Cinema"
            width={60}
            height={60}
            className="w-18 h-18"
          />
        </Link>
        {/* Navigation links */}
        <nav className="flex items-center space-x-6 ml-8">
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
        </nav>
      </div>
    </header>
  );
}
