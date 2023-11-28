import { useNavigate } from 'react-router-dom';

function Index() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/Login');
  }


  return (
    <div className="flex h-screen">
      <div className="m-auto space-y-4">
        <button 
          onClick={() => navigate('/Formulario')}
          className="flex items-center justify-center w-64 h-20 bg-blue-500 text-black text-lg rounded-md shadow-lg hover:bg-blue-700"
        >
          {/* <LockClosedIcon className="h-6 w-6 mr-2" /> */}
          Formulario
        </button>
        <button 
          onClick={() => navigate('/Agenda')}
          className="flex items-center justify-center w-64 h-20 bg-green-500 text-black text-lg rounded-md shadow-lg hover:bg-green-700"
        >
          {/* <UclassName="h-6 w-6 mr-2" /> */}
          Agenda
        </button>
        <button 
          onClick={handleLogout}
          className="flex items-center justify-center w-64 h-20 bg-red-500 text-white text-lg rounded-md shadow-lg hover:bg-red-700"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default Index;
