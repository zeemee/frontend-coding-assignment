import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import searchIcon from '../assets/Search-Icon.svg';

export default function Header() {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate({ to: '/', search: { q: input } });
  }

  return (
    <header className="w-full px-6 py-4 flex items-center justify-between z-10 relative border-b border-white/20">
      <h1 className="text-white text-xl font-bold tracking-wide m-0">BarCraft</h1>
      <form onSubmit={handleSubmit} className="flex items-center mx-auto border border-white rounded-xl overflow-hidden">
        <div className="relative flex-1">
          <img
            src={searchIcon}
            alt=""
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
          />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search all drinks"
            className="bg-transparent pl-12 pr-4 py-3 text-base text-white placeholder-white/40 focus:outline-none w-80"
          />
        </div>
        <button
          type="submit"
          className="border-l border-white px-6 py-3 text-base text-white font-semibold hover:bg-white/10 transition-colors"
        >
          GO
        </button>
      </form>
    </header>
  );
}
