import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const password = watch('password');

  const onSubmit = handleSubmit((data) => {
    const { logId, password, confirmPassword } = data;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

    axios.post('http://localhost:3001/api/auth/register/', { logId, password })
         .then(response => {
             console.log('Registration successful:', response.data);
             navigate('/');
         })
         .catch(error => {
             console.error('Register error:', error);
         });
  });

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col justify-center"> 
      <div className="max-w-sm w-full mx-auto">
        <div className="text-3xl font-bold text-gray-900 mt-2 text-center"> Register </div>
      </div>
        <div className="max-w-sm w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label htmlFor="logId" className="text-sm font-bold text-gray-900 block"> New Log ID </label>
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
            <div>
              <label htmlFor="confirmPassword" className="text-sm font-bold text-gray-900 block"> Same Password Again </label>
              <input 
                {...register('confirmPassword', { required: "You must specify a password", minLength: 6, maxLength: 14, validate: value => value === password || "The passwords do not match"})}
                id="confirmPassword"
                type="password"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && <span className="text-red-600">Passwords do not match</span>}
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

export default Register;
