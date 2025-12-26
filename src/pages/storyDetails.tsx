import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../axios';

interface Story {
  title: string;
  content: string;
  category: string;
  userCreator?: string;
  createdAt: any;
}

const StoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await api.get(`api/storys/${id}`);
        setStory(response.data);
      } catch (error) {
        console.error("Erro ao resgatar pergaminho:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  if (loading) return <div className="loading-screen">Abrindo Pergaminho...</div>;
  
  if (!story) return (
    <div className="loading-screen">
      <p>Crônica não encontrada nos arquivos.</p>
      <button onClick={() => navigate('/list')} className="btn-back" style={{ position: 'static', marginTop: '20px' }}>
        Voltar à Biblioteca
      </button>
    </div>
  );

  return (
    <div className="desk-container">
      <button className="btn-back" onClick={() => navigate('/list')}>
        ← Voltar à Biblioteca
      </button>

      <article className="parchment-scroll fade-in">
        <header className="scroll-header">
          <div className="category-badge">{story.category}</div>
          <h1 className="story-title-detail">{story.title}</h1>
          <div className="story-meta">
            <span>Escrito por: {story?.userCreator || 'Viajante Desconhecido'}</span>
          </div>
          <div className="ornament"></div>
        </header>

        <div 
          className="story-content-render"
          dangerouslySetInnerHTML={{ __html: story.content }}
        />

        <footer className="scroll-footer">
          <div className="ornament flip"></div>
          <p>Fim da Crônica</p>
        </footer>
      </article>
    </div>
  );
};

export default StoryDetail;