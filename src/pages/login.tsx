import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../axios';

interface LoginProps {
    onSwitch: () => void;
    onLoginSuccess: (userData: any) => void;
}

const Login = ({ onSwitch, onLoginSuccess }: LoginProps) => {
    const { signIn } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post('/api/auth/login', {
                email: formData.email,
                password: formData.password
            });

            // O signIn do seu contexto salvará no localStorage e atualizará o estado
            signIn(response.data);
            onLoginSuccess(response.data);

        } catch (error) {
            console.error("Erro na jornada:", error);
        }
    };

    return (
        <div className='auth-container'>
            <div className="parchment-card">
                <h2 style={{ fontFamily: 'Cinzel, serif', textAlign: 'center', fontSize: '2rem', marginBottom: '10px' }}>
                    Identifique-se, Viajante
                </h2>
                <p style={{ fontFamily: 'Lora, serif', textAlign: 'center', fontStyle: 'italic', marginBottom: '30px', color: '#5e4331' }}>
                    Suas crônicas aguardam seu retorno aos portões do Condado.
                </p>

                <form className="fantasy-form" onSubmit={handleSubmit}>
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
                        Entrar no Refúgio
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'Lora, serif' }}>
                    <p>
                        Ainda não faz parte da sociedade?
                        <span onClick={onSwitch} className="auth-link"> Registrar Lenda</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;