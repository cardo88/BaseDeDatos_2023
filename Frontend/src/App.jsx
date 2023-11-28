import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Logins/Login.jsx';
import Register from './Logins/Register.jsx';
import Home from './Home.jsx';
import Index from './Formulario/Index.jsx';
import Formulario from './Formulario/Formulario.jsx';
import Agenda from './Formulario/Agenda.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './UserProvider.jsx';
import PanelControl from './admin/PanelControl.jsx';
import AdminIndex from './admin/AdminIndex.jsx';
import ListadoFuncionarios from './admin/ListadoFuncionarios.jsx';


function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/PanelControl" element={<PanelControl />} />
          <Route path="/AdminIndex" element={<AdminIndex />} />
          <Route path="/ListadoFuncionarios" element={<ListadoFuncionarios />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Indice" element={<Index />} />
          <Route path="/Formulario" element={<Formulario />} />
          <Route path="/Agenda" element={<Agenda />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;