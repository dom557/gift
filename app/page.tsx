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
    <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-[#023047]">
      <Navbar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex mb-12">
        <h1 className="text-4xl font-bold text-[#8ecae6]">Character Cards</h1>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredCharacters.map((character) => (
          <div
            key={character.name}
            className="p-4 border border-[#219ebc] rounded-lg cursor-pointer bg-white shadow-lg transition-transform transform hover:scale-105 hover:bg-[#8ecae6]"
            onClick={() => handleCardClick(character)}
          >
            <h2 className="text-2xl font-semibold text-center text-[#023047]">{character.name}</h2>
          </div>
        ))}
      </div>

      {selectedCharacter && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50"
          onClick={handleOverlayClick}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg"
            onClick={stopPropagation}
          >
            <Image
              src={selectedCharacter.icon}
              alt={selectedCharacter.name}
              width={200}
              height={200}
              className="mx-auto"
            />
            <h2 className="text-2xl text-center mt-4 text-[#219ebc]">{selectedCharacter.name}</h2>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
