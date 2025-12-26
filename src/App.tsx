import { useState, useRef, useEffect, type ChangeEvent } from 'react';
import './App.css';

function App() {
  const [started, setStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.1); 
  const audioRef = useRef<HTMLAudioElement>(null);

  const bgPath = "/bg.jpg";
  const musicPath = "/music.mp3";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleStart = () => {
    setStarted(true);
    if (audioRef.current) {
      audioRef.current.play().catch(error => console.log("Erro ao tocar:", error));
    }
  };

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
    }
  };

  return (
    <>
      <audio ref={audioRef} src={musicPath} loop />

      {!started ? (
        <div style={{
          height: '100vh',
          width: '100vw',
          backgroundColor: '#0d0d0d',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: '#f4e4bc'
        }}>
          <h1 style={{ fontFamily: 'Cinzel, serif', marginBottom: '20px' }}>O Condado espera por você</h1>
          <button 
            onClick={handleStart}
            style={{
              padding: '15px 30px',
              fontFamily: 'Cinzel, serif',
              background: 'transparent',
              border: '1px solid #f4e4bc',
              color: '#f4e4bc',
              cursor: 'pointer',
              fontSize: '1.2rem'
            }}
          >
            Entrar no Refúgio
          </button>
        </div>
      ) : (
        <div style={{ 
          height: '100vh',
          width: '100vw',
          backgroundImage: `linear-gradient(rgba(40, 20, 0, 0.6), rgba(0, 0, 0, 0.7)), url(${bgPath})`,
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
              style={{ cursor: 'pointer', accentColor: '#f4e4bc', width: '120px' }}
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
                textTransform: 'uppercase'
              }}
            >
              {isMuted ? "Restaurar Som" : "Silenciar"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;