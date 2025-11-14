import React, { createContext, useRef, useState, useCallback } from 'react';

export const MusicContext = createContext();

export function MusicProvider({ children }) {
  const audioRef = useRef(null);
  const [musicActive, setMusicActive] = useState(false);

  const toggleMusic = useCallback(() => {
    if (audioRef.current) {
      if (musicActive) {
        audioRef.current.pause();
        setMusicActive(false);
      } else {
        audioRef.current.muted = false;
        audioRef.current.play().catch(err => {
          console.log("Error al reproducir música:", err);
        });
        setMusicActive(true);
      }
    }
  }, [musicActive]);

  const value = {
    audioRef,
    musicActive,
    toggleMusic
  };

  return (
    <MusicContext.Provider value={value}>
      <audio 
        ref={audioRef} 
        loop 
        muted
        src="/music/background-pastel.mp3"
      />
      {children}
    </MusicContext.Provider>
  );
}
