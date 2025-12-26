import { useState, useRef, useEffect, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { signed } = useAuth();
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const flipAudioRef = useRef<HTMLAudioElement>(null);

  const bgPath = "/bg.jpg";
  const musicPath = "/music.mp3";
  const flipPath = "/flipPage.ogg";

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
    if (flipAudioRef.current) flipAudioRef.current.volume = volume * 2;
  }, [volume]);

  const handleStart = () => {
    setIsFlipping(true);
    if (flipAudioRef.current) flipAudioRef.current.play().catch(() => {});
    if (audioRef.current) audioRef.current.play().catch(() => {});

    setTimeout(() => {
      setStarted(true);
    }, 1000);
  };

  const toggleMute = () => {
    const newMuteStatus = !isMuted;
    if (audioRef.current) audioRef.current.muted = newMuteStatus;
    if (flipAudioRef.current) flipAudioRef.current.muted = newMuteStatus;
    setIsMuted(newMuteStatus);
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleActionClickCreate = () => {
    if (signed) {
      navigate('/create-story');
    } else {
      navigate('/login');
    }
  };

  const handleActionClickList = () => {
    if (signed) {
      navigate('/list-story');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <audio ref={audioRef} src={musicPath} loop />
      <audio ref={flipAudioRef} src={flipPath} />

      {!started ? (
        <div className={`book-cover ${isFlipping ? 'flip-animation' : ''}`} style={{
          height: '100vh', width: '100vw', backgroundColor: '#1a1a1a',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', color: '#f4e4bc', position: 'fixed',
          zIndex: 100, transformOrigin: 'left center', boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)'
        }}>
          <h1 style={{ fontFamily: 'Cinzel, serif', marginBottom: '20px' }}>Crônicas da Terra Média</h1>
          <button onClick={handleStart} style={{
            padding: '15px 30px', fontFamily: 'Cinzel, serif', background: 'transparent',
            border: '1px solid #f4e4bc', color: '#f4e4bc', cursor: 'pointer',
            fontSize: '1.2rem', letterSpacing: '2px'
          }}>Abrir Livro</button>
        </div>
      ) : (
        <main className="fade-in">
          <section style={{
            height: '100vh', width: '100vw',
            backgroundImage: `linear-gradient(rgba(40, 20, 0, 0.6), rgba(0, 0, 0, 0.7)), url(${bgPath})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', position: 'relative', color: '#f4e4bc', textAlign: 'center'
          }}>
            <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '4rem' }}>O Refúgio do Condado</h1>
            <p style={{ fontFamily: 'Lora, serif', fontSize: '1.5rem', fontStyle: 'italic' }}>
              Role para baixo para descobrir as crônicas...
            </p>

            <div className="volume-control">
              <label style={{ fontFamily: 'Cinzel, serif', fontSize: '0.7rem' }}>Volume</label>
              <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
              <button onClick={toggleMute}>{isMuted ? "ATIVAR SOM" : "SILENCIAR"}</button>
            </div>
          </section>

          <section style={{
            minHeight: '100vh', backgroundColor: '#0d0d0d',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 20px'
          }}>
            <div className="scroll-content" style={{
              maxWidth: '800px', backgroundColor: '#f4e4bc', color: '#2c1e14',
              padding: '60px', borderRadius: '2px', position: 'relative',
              boxShadow: '0 0 50px rgba(0,0,0,0.8), 20px 20px 0 #2c1e14', fontFamily: 'Lora, serif'
            }}>
              <h2 style={{ fontFamily: 'Cinzel, serif', textAlign: 'center', fontSize: '2.5rem', marginBottom: '30px' }}>
                O Círculo de Histórias
              </h2>

              <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '20px' }}>
                Bem-vindo ao nosso santuário. Este é um lugar sagrado para amantes de universos fantásticos.
              </p>

              <div style={{
                borderLeft: '4px solid #2c1e14', paddingLeft: '20px', margin: '40px 0',
                backgroundColor: 'rgba(44, 30, 20, 0.05)', padding: '20px'
              }}>
                <h3 style={{ fontFamily: 'Cinzel, serif', marginBottom: '10px' }}>Partilhe o seu Conhecimento</h3>
                <p>Poste histórias originais ou explore curiosidades sobre mundos já conhecidos.</p>
                <p style={{ marginTop: '15px', color: '#8b4513', fontWeight: 'bold' }}>
                  ✨ DESTAQUE: Além de contos, compartilhe teorias e fatos ocultos sobre fantasias existentes!
                </p>
              </div>

              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <button onClick={handleActionClickList} className="btn-fantasy">Ver Crônicas</button>
                <button onClick={handleActionClickCreate} className="btn-fantasy" style={{ marginLeft: '10px', background: '#2c1e14', color: '#f4e4bc' }}>
                  Escrever Lenda
                </button>
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default Home;