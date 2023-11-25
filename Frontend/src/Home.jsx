import { useNavigate } from 'react-router-dom';
// import { LockClosedIcon, UserAddIcon } from '@heroicons/react/24/outline'; 

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      <div className="m-auto space-y-4">
        <button 
          onClick={() => navigate('/Login')}
          className="flex items-center justify-center w-64 h-20 bg-blue-500 text-black text-lg rounded-md shadow-lg hover:bg-blue-700"
        >
          {/* <LockClosedIcon className="h-6 w-6 mr-2" /> */}
          Login 
        </button>
        <button 
          onClick={() => navigate('/Register')}
          className="flex items-center justify-center w-64 h-20 bg-green-500 text-black text-lg rounded-md shadow-lg hover:bg-green-700"
        >
          {/* <UclassName="h-6 w-6 mr-2" /> */}
          Register
        </button>
      </div>
    </div>
  );
}

export default Home;
