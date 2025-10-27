import Image from "next/image";
import Link from "next/link";

export default function Header() {
	return (
		<header className="bg-black text-white py-4 px-8">
			<div className="max-w-6xl mx-auto flex items-center justify-between">
				{/* Logo and brand */}
				<Link href="/" className="flex items-center space-x-3">
					<Image
						src="/images/Cicada_Cinema_2024_icon_5-circle-white_80x@2x.png"
						alt="Cicada Cinema"
						width={40}
						height={40}
						className="w-10 h-10"
					/>
					<span className="text-xl font-bold">Cicada Cinema</span>
				</Link>

				{/* Navigation links */}
				<nav className="flex items-center space-x-6">
					<Link
						href="/"
						className="text-white hover:text-gray-300 transition-colors duration-200"
					>
						Home
					</Link>
					<Link
						href="/events-calendar"
						className="text-white hover:text-gray-300 transition-colors duration-200"
					>
						Calendar
					</Link>
					<Link
						href="/showtimes"
						className="text-white hover:text-gray-300 transition-colors duration-200"
					>
						Showtimes
					</Link>
				</nav>
			</div>
		</header>
	);
}
