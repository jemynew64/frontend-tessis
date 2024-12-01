import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Importar React Router
import { Login } from './pages/Login';  // Importamos la página de Login
import Aprender from './pages/Aprender'; // Importamos la página Aprender
import Sidebar from './components/Sidebar'; // Importamos el Sidebar
import Tienda from './pages/Tienda';
import Matematicas from './pages/Matematicas';
import RetoLeccion from './pages/RetoLeccion'; // Importa la nueva página
import Comunicacion from './pages/Comunicacion'; // Importa la nueva página

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta de Login */}
        <Route path="/" element={<Login />} /> 
        <Route path="/reto-leccion" element={<RetoLeccion />} /> 

        {/* Ruta de Aprender */}
        <Route path="/aprender" element={
          <div className="flex min-h-screen">
            {/* Sidebar solo se muestra en Aprender */}
            <Sidebar />
            {/* Contenido principal de Aprender */}
            <div className="flex-1 p-8 lg:pl-[256px]"> {/* Agregar padding izquierdo en pantallas grandes */}
              <Aprender />
            </div>
          </div>
        } />
        <Route path="/matematicas" element={
          <div className="flex min-h-screen">
            {/* Sidebar solo se muestra en Aprender */}
            <Sidebar />
            {/* Contenido principal de Aprender */}
            <div className="flex-1 p-8 lg:pl-[256px]"> {/* Agregar padding izquierdo en pantallas grandes */}
              <Matematicas />
            </div>
          </div>
        } />
        <Route path="/comunicacion" element={
          <div className="flex min-h-screen">
            {/* Sidebar solo se muestra en Aprender */}
            <Sidebar />
            {/* Contenido principal de Aprender */}
            <div className="flex-1 p-8 lg:pl-[256px]"> {/* Agregar padding izquierdo en pantallas grandes */}
              <Comunicacion />
            </div>
          </div>
        } />
        <Route path="/tienda" element={
          <div className="flex min-h-screen">
            {/* Sidebar solo se muestra en Aprender */}
            <Sidebar />
            {/* Contenido principal de Aprender */}
            <div className="flex-1 p-8 lg:pl-[256px]"> {/* Agregar padding izquierdo en pantallas grandes */}
              <Tienda />
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
