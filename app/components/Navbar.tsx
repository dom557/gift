// components/Navbar.tsx

import { ChangeEvent } from 'react';

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Navbar: React.FC<NavbarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <nav className="w-full bg-[#8ecae6] shadow-md p-4 mb-6 flex flex-col sm:flex-row sm:justify-between items-center rounded-lg">
      <h2 className="text-2xl font-semibold text-[#023047] mb-2 sm:mb-0">Character Gallery</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={onSearchChange}
        placeholder="Search characters..."
        className="p-2 border border-[#023047] text-[#023047] rounded-md sm:w-1/2 lg:w-1/3"
      />
    </nav>
  );
};

export default Navbar;
