// components/Navbar.tsx

import { ChangeEvent, useState , useEffect } from 'react';
import Image from 'next/image';
import { Howl } from 'howler';

interface NavbarProps {
    searchTerm: string;
    onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Navbar: React.FC<NavbarProps> = ({ searchTerm, onSearchChange }) => {
    // State to manage mute/unmute status
    const [isMuted, setIsMuted] = useState(true);

    // Create Howl instance
    const sound = new Howl({
        src: ['/data/genshin.mp3'],
        loop: true,
        volume: isMuted ? 0 : 1,
        onloaderror: (id, error) => {
            console.error('Howl load error:', error);
        },
    });

    // Play sound on component mount
    useEffect(() => {
        sound.play();
        return () => {
            sound.unload();  // Clean up sound when component unmounts
        };
    }, [sound]);

    // Toggle mute/unmute
    const handleMuteClick = () => {
        setIsMuted((prev) => {
            const newMuted = !prev;
            sound.volume(newMuted ? 0 : 1);
            return newMuted;
        });
    };

    return (
        <>
            <nav className="w-full bg-gradient-to-r from-[#8ecae6] to-[#219ebc] shadow-md p-4 mb-6 flex flex-col sm:flex-row sm:justify-between items-center rounded-lg">
                <div className="flex items-center mb-2 sm:mb-0">
                    <h2 className="text-2xl font-semibold text-white">Noor Weird Gallery</h2>
                </div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={onSearchChange}
                    placeholder="Search characters..."
                    className="p-2 border border-white text-white rounded-md bg-[#023047] sm:w-1/2 lg:w-1/3"
                />
                <button
                    onClick={handleMuteClick}
                    className="mt-4 sm:mt-0 p-2 bg-[#023047] text-white rounded-md shadow-md hover:bg-[#002f3c]"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                    {isMuted ? (
                        <span role="img" aria-label="Unmute">🔇</span>
                    ) : (
                        <span role="img" aria-label="Mute">🔊</span>
                    )}
                </button>
            </nav>
        </>
    );
};

export default Navbar;
