import { useState } from 'react';
import searchIcon from '../assets/Search-Icon.svg';

interface HeaderProps {
  onSearch: (query: string) => void;
  navigate: (to: string) => void;
}

export default function Header({ onSearch, navigate }: HeaderProps) {
  const [input, setInput] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch(input);
    navigate('/');
  }

  return (
    <header className="w-full px-6 py-4 flex items-center justify-between z-10 relative">
      <h1 className="text-white text-xl font-bold tracking-wide m-0">BarCraft</h1>
      <form onSubmit={handleSubmit} className="flex items-center gap-2 mx-auto">
        <div className="relative">
          <img
            src={searchIcon}
            alt=""
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
          />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search all drinks"
            className="bg-white/10 border border-white/20 rounded-md pl-9 pr-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/50 w-64"
          />
        </div>
        <button
          type="submit"
          className="bg-white/10 border border-white/20 rounded-md px-4 py-2 text-sm text-white font-semibold hover:bg-white/20 transition-colors"
        >
          GO
        </button>
      </form>
    </header>
  );
}
