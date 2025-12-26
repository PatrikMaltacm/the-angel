import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import ProtectedRoute from './components/ProtectedRoute';
import CreateStory from './pages/createStory';
import StoryList from './pages/StoryList';
import StoryDetail from './pages/storyDetails';

function App() {
  const navigate = useNavigate();
  const { signed, loading } = useAuth();

  if (loading) return <div className="loading-screen">Carregando as crônicas...</div>;

  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<Home />} />
      
      <Route 
        path="/login" 
        element={signed ? <Navigate to="/" /> : <Login onSwitch={() => navigate('/register')} onLoginSuccess={() => navigate('/')} />} 
      />
      
      <Route 
        path="/register" 
        element={signed ? <Navigate to="/" /> : <Register onSwitch={() => navigate('/login')} onRegisterSuccess={() => navigate('/login')} />} 
      />

      {/* Rotas Protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route path="/create-story" element={<CreateStory />} />
        <Route path="/list-story" element={<StoryList />} />
        <Route path="/list-story/:id" element={<StoryDetail />} />
        {/* Adicione outras rotas protegidas aqui, como /profile ou /my-stories */}
      </Route>

      {/* Redirecionamento Padrão */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;