import { useEffect, useState } from 'react';
import api from '../axios';
import { useNavigate } from 'react-router-dom';

interface Story {
    id: string;
    title: string;
    content: string;
    category: string;
    createdAt: any;
}

const StoryList = () => {
    const [stories, setStories] = useState<Story[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await api.get('api/storys/list');
                setStories(response.data.story);
            } catch (error) {
                console.error("Erro ao carregar crônicas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStories();
    }, []);

    if (loading) return <div className="loading-screen">Consultando os Arquivos...</div>;

    return (
        <div className="library-container">
            <button className="btn-back" onClick={() => navigate('/')}>
                ← Voltar ao Condado
            </button>

            <h1 style={{ fontFamily: 'Cinzel, serif', color: '#f4e4bc', textAlign: 'center', marginBottom: '50px', fontSize: '3rem' }}>
                Grande Biblioteca de Crônicas
            </h1>

            <div className="stories-grid">
                {stories.map((story, index) => (
                    <div key={index} className={`story-card ${story.category.toLowerCase()}`}>
                        <div className="card-header">
                            <span className="category-tag">{story.category}</span>
                            <h3 style={{ fontFamily: 'Cinzel, serif' }}>{story.title}</h3>
                        </div>

                        <div
                            className="card-preview"
                            dangerouslySetInnerHTML={{ __html: story.content.substring(0, 150) + '...' }}
                        />

                        <button className="btn-read-more" onClick={() => navigate(`/list-story/${story.id}`)}>Ler Crônica Completa</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StoryList;