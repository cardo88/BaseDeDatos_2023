import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserProvider'; 
import { toast } from 'react-toastify';
import { api } from '../api/instance';

function Login() {
  const { setUserData } = useUser(); 
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    const { logId, password } = data;
    const ci = logId;
    api.post('/auth/login', { logId, password }).then(_ => {
      return api.get(`/funcionarios/getFuncionarioByLogId`,{
        params: {
          logId: ci
        } 
      });
    }
    ).then(response => {
      const userData = response.data.funcionario;
      setUserData({ ...userData });
      toast.success('Login successful');
      navigate("/Indice");
    }).catch(error => {
      toast.error('Login failed');
      console.error('Error:', error);
    });
  });


  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col justify-center"> 
      <div className="max-w-sm w-full mx-auto">
        <div className="text-3xl font-bold text-gray-900 mt-2 text-center"> Login </div>
      </div>
        <div className="max-w-sm w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label htmlFor="logId" className="text-sm font-bold text-gray-900 block"> Log ID </label>
              <input 
                {...register('logId', { required: true, minLength: 4, maxLength: 14 })}
                id="logId"
                type="text"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Log ID"
              />
              {errors.logId && <span className="text-red-600"> Log ID is invalid </span>}
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-bold text-gray-900 block"> Password </label>
              <input 
                {...register('password', { required: true, minLength: 6, maxLength: 14 })}
                id="password"
                type="password"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Password"
              />
              {errors.password && <span className="text-red-600"> Password is invalid </span>}
            </div>
            <div className="flex justify-center mt-6">
              <button type="submit" className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-bold"> Submit </button>
            </div>
          </form>
          <div className="flex justify-center mt-4">
          <button
            type="button" 
            onClick={goBack}
            className="py-2 px-2 bg-gray-500 hover:bg-gray-600 rounded-md text-white font-bold text-xs"
          >
            Volver
          </button>
        </div>
        </div>
    </div>
  )
}

export default Login;
