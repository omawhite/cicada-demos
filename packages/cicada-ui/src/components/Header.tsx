import type React from 'react';

interface HeaderProps {
  logo?: React.ReactNode;
  navigationLinks?: React.ReactNode;
}

const Header = ({ logo, navigationLinks }: HeaderProps) => {
  return (
    <header className="bg-black text-white py-4 px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {logo}
        <nav className="flex items-center space-x-6">{navigationLinks}</nav>
      </div>
    </header>
  );
};

export default Header;
