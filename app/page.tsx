"use client"
import { useState, useEffect, MouseEvent, ChangeEvent } from 'react';
import Image from 'next/image';
import Navbar from './components/Navbar'; // Adjust the import path as necessary

interface Character {
  name: string;
  icon: string;
}

const Home: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetch('/data/data.json')
      .then((response) => response.json())
      .then((data: Character[]) => {
        setCharacters(data);
        setFilteredCharacters(data);
      });
  }, []);

  const handleCardClick = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleOverlayClick = () => {
    setSelectedCharacter(null);
  };

  const stopPropagation = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    const filtered = characters.filter(character =>
      character.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCharacters(filtered);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-gradient-to-b from-[#023047] to-[#219ebc] text-white">
      <Navbar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      <div className="relative flex flex-col items-center mb-12">
        <h1 className="text-5xl text-center font-bold text-[#ffc2d1] mb-8">Happy Birthday Noor!</h1>
      </div>
      
      {/* <div className="mt-6 mb-6">
        <p>play the audio first : </p>
        <audio controls >
          <source src="/data/genshin.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div> */}

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCharacters.map((character) => (
          <div
            key={character.name}
            className="relative border p-4 bg-[#023047] text-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl cursor-pointer before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-[rgba(255,255,255,0.1)] before:to-transparent before:transition-all before:duration-300 before:transform before:skew-x-12 before:scale-x-0 hover:before:scale-x-100 after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-[rgba(255,255,255,0.1)] after:to-transparent after:transition-all after:duration-300 after:transform after:skew-x-12 after:scale-x-0 hover:after:scale-x-100"
            onClick={() => handleCardClick(character)}
          >
            <h2 className="text-2xl font-bold mb-2 relative group text-white">
              {character.name}
            </h2>
            <Image
              src={character.icon}
              alt={character.name}
              width={100}
              height={100}
              className="w-24 h-24 object-cover rounded-full mx-auto mb-4 shadow-md"
            />
          </div>
        ))}
      </div>

      {selectedCharacter && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-lg z-50">
          <div className="bg-white p-8 border rounded-lg max-w-md w-full sm:w-3/4 lg:w-1/2 text-center relative shadow-xl border-[#219ebc]">
            <button
              className="absolute top-2 right-2 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none transition-transform transform hover:rotate-90"
              onClick={() => setSelectedCharacter(null)}
            >
              &times;
            </button>
            <Image
              src={selectedCharacter.icon}
              alt={selectedCharacter.name}
              width={150}
              height={150}
              className="w-36 h-36 object-cover rounded-full mx-auto mb-4 shadow-md"
            />
            <h2 className="text-3xl font-bold mb-2 text-[#219ebc]">
              {selectedCharacter.name}
            </h2>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
