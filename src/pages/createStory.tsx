import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axios';
import { useAuth } from '../context/AuthContext';

const CreateStory = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Conto');

    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Comece sua crônica aqui...</p>',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editor) return;

        const htmlContent = editor.getHTML();

        try {
            await api.post('api/storys/create', {
                userID: user?.user?.uid,
                userCreator: user?.user?.displayName,
                title,
                content: htmlContent,
                category,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            alert("Sua lenda foi imortalizada!");
            navigate('/list-story');
        } catch (error) {
            console.error("Erro ao salvar:", error);
        }
    };

    return (
        <div className="desk-container">
            <button
                className="btn-back"
                onClick={() => navigate('/list-story')}
            >
                ← Voltar ao Condado
            </button>

            <div className="editor-paper">
                <h2 style={{ fontFamily: 'Cinzel, serif', textAlign: 'center', color: '#2c1e14' }}>
                    Nova Escritura
                </h2>

                <form onSubmit={handleSubmit} className="story-form">
                    <div className="input-group">
                        <label>Título da Crônica</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Ex: O Retorno do Rei"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Tipo de Registro</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="Conto">Conto Original</option>
                            <option value="Curiosidade">Curiosidade</option>
                            <option value="Teoria">Teoria Épica</option>
                        </select>
                    </div>

                    <div className="tiptap-wrapper">
                        <MenuBar editor={editor} />
                        <EditorContent editor={editor} className="tiptap-content" />
                    </div>

                    <button type="submit" className="btn-action">Selar Pergaminho</button>
                </form>
            </div>
        </div>
    );
};

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) return null;

    return (
        <div className="tiptap-menu">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active' : ''}
            >
                B
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active' : ''}
            >
                I
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
            >
                H1
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
                Lista
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? 'is-active' : ''}
            >
                Citação
            </button>
        </div>
    );
};

export default CreateStory;