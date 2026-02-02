import Link from 'next/link';
import Image from 'next/image';

const RICK_IMAGE = 'https://rickandmortyapi.com/api/character/avatar/1.jpeg';
const MORTY_IMAGE = 'https://rickandmortyapi.com/api/character/avatar/2.jpeg';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 p-4 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 via-cyan-400 to-green-500 opacity-20 animate-spin" style={{ animationDuration: '20s' }} />
          <div className="absolute inset-8 rounded-full bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 opacity-30 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
          <div className="absolute inset-16 rounded-full bg-gradient-to-r from-green-300 via-teal-400 to-green-300 opacity-20 animate-spin" style={{ animationDuration: '10s' }} />
        </div>

        <div className="absolute top-20 left-20 w-4 h-4 bg-green-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-40 right-32 w-3 h-3 bg-cyan-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }} />
        <div className="absolute bottom-32 left-40 w-5 h-5 bg-green-300 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s', animationDuration: '3.5s' }} />
        <div className="absolute bottom-20 right-20 w-3 h-3 bg-emerald-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1.5s', animationDuration: '2s' }} />
        <div className="absolute top-1/3 left-10 w-2 h-2 bg-teal-400 rounded-full animate-ping opacity-40" />
        <div className="absolute top-2/3 right-10 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-40" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        <div className="flex justify-center items-end gap-4 mb-6">
          <div className="relative">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-green-400 shadow-lg shadow-green-500/30 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
              <Image src={RICK_IMAGE} alt="Rick Sanchez" width={160} height={160} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="relative">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg shadow-yellow-500/30 transform rotate-6 hover:rotate-0 transition-transform duration-300">
              <Image src={MORTY_IMAGE} alt="Morty Smith" width={144} height={144} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="relative inline-block mb-6">
          <h1 className="text-8xl sm:text-9xl font-black">
            <span className="bg-gradient-to-r from-green-400 via-cyan-300 to-green-400 bg-clip-text text-transparent drop-shadow-lg">
              404
            </span>
          </h1>
          <div className="absolute inset-0 text-8xl sm:text-9xl font-black text-green-400 blur-xl opacity-50 -z-10">404</div>
        </div>

        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-green-500/30 shadow-xl">
          <p className="text-xl sm:text-2xl text-white font-medium mb-2">
            <span className="text-green-400">&ldquo;¡Morty!</span> *burp* Te perdiste en el multiverso, Morty.
          </p>
          <p className="text-lg sm:text-xl text-subtle">
            Esta página está en otra dimensión.<span className="text-green-400">&rdquo;</span>
          </p>
          <p className="text-sm text-gray-500 mt-4 italic">— Rick Sanchez, Dimensión C-137</p>
        </div>

        <div className="flex justify-center gap-4 mb-8 text-sm">
          <div className="bg-gray-800/60 backdrop-blur px-4 py-2 rounded-full border border-gray-700">
            <span className="text-gray-400">Dimensión actual:</span>
            <span className="text-red-400 ml-2 font-mono">ERROR-404</span>
          </div>
          <div className="bg-gray-800/60 backdrop-blur px-4 py-2 rounded-full border border-gray-700">
            <span className="text-gray-400">Estado:</span>
            <span className="text-yellow-400 ml-2">Perdido</span>
          </div>
        </div>

        <Link
          href="/"
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold text-lg rounded-full transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105"
        >
          <svg className="w-6 h-6 animate-spin" style={{ animationDuration: '3s' }} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="2" strokeDasharray="4 2" />
            <circle cx="12" cy="12" r="6" strokeWidth="2" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
          </svg>
          <span>Usar Portal Gun</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>

        <p className="mt-6 text-gray-500 text-sm">
          o intenta buscar en{' '}
          <Link href="/" className="text-green-400 hover:text-green-300 underline underline-offset-2">
            la dimensión correcta
          </Link>
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-900/20 to-transparent pointer-events-none" />
    </div>
  );
}
