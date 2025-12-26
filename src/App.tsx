import { useState, useRef, useEffect, type ChangeEvent } from 'react';
import './App.css';
import bg from "./assets/bg.jpg";
import music from "./assets/A New World.mp3";

function App() {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.1); 
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      audioRef.current.muted = newVolume === 0;
      setIsMuted(newVolume === 0);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={music} autoPlay loop />

      <div style={{ 
        height: '100vh',
        width: '100vw',
        backgroundImage: `linear-gradient(rgba(40, 20, 0, 0.6), rgba(0, 0, 0, 0.7)), url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        color: '#f4e4bc',
        textAlign: 'center'
      }}>
        
        <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '3.5rem', marginBottom: '1rem' }}>
          O Refúgio do Condado
        </h1>
        <p style={{ fontFamily: 'Lora, serif', fontSize: '1.4rem', fontStyle: 'italic' }}>
          Sinta o calor da lareira, a jornada pode esperar.
        </p>

        <div style={{
          position: 'absolute',
          bottom: '40px',
          right: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid rgba(244, 228, 188, 0.2)',
          backdropFilter: 'blur(5px)'
        }}>
          <label style={{ fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '1px' }}>
            Volume da Taverna
          </label>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume} 
            onChange={handleVolumeChange}
            style={{ 
              cursor: 'pointer',
              accentColor: '#f4e4bc',
              width: '120px'
            }}
          />
          <button 
            onClick={toggleMute}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#f4e4bc',
              fontFamily: 'Cinzel, serif',
              cursor: 'pointer',
              fontSize: '0.65rem',
              textTransform: 'uppercase',
              opacity: 0.8
            }}
          >
            {isMuted ? "Restaurar Som" : "Silenciar"}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;