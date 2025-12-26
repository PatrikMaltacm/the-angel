import React, { useState } from 'react';
import api from '../axios';
import { useAuth } from '../context/AuthContext';

interface RegisterProps {
    onSwitch: () => void;
    onRegisterSuccess: () => void;
}

const Register = ({ onSwitch, onRegisterSuccess }: RegisterProps) => {
    const {signIn} = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post('/api/auth/signup', {
                displayName: formData.username,
                email: formData.email,
                password: formData.password
            });

            // O signIn do seu contexto salvará no localStorage e atualizará o estado
            signIn(response.data);
            onRegisterSuccess();

        } catch (error) {
            console.error("Erro na jornada:", error);
        }
    };

    return (
        <div className='auth-container'>
            <div className="parchment-card">
                <h2 style={{ fontFamily: 'Cinzel, serif', textAlign: 'center', fontSize: '2rem', marginBottom: '10px' }}>
                    Junte-se à Sociedade
                </h2>
                <p style={{ fontFamily: 'Lora, serif', textAlign: 'center', fontStyle: 'italic', marginBottom: '30px', color: '#5e4331' }}>
                    Sua jornada pelos reinos da fantasia começa com um simples registro.
                </p>

                <form className="fantasy-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Nome nas Crônicas</label>
                        <input
                            type="text"
                            placeholder="Ex: Peregrin Tûk"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Correio Mágico (Email)</label>
                        <input
                            type="email"
                            placeholder="viajante@condado.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Palavra de Passe</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-action">
                        Registrar Lenda
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'Lora, serif' }}>
                    <p>
                        Já possui uma conta?
                        <span onClick={onSwitch} className="auth-link"> Fazer Login</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;