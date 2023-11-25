import { useForm } from 'react-hook-form';
import axios from 'axios';

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = handleSubmit((data) => {
    const { email, password } = data;
    axios.post('http://localhost:8000/api/login/', { email, password })
         .then(response => {
             console.log('Login successful:', response.data);
         })
         .catch(error => {
             console.error('Login error:', error);
         });
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center"> 
      <div className="max-w-sm w-full mx-auto">
        <div className="text-3xl font-bold text-gray-900 mt-2 text-center"> Login </div>
      </div>
        <div className="max-w-sm w-full mx-auto mt-4 bg-white p-8 border border-gray-400">
          <form action="" className="space-y-6" onSubmit={onSubmit}> 
            <div> 
              <label htmlFor="" className="text-sm font-bold text-gray-900 block"> Email </label>
              <input 
              {...register('email', {required: true, minLength: 4, maxLength: 14})}
              type="email" className="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Email" />
              {errors.email && <span className="text-red-600"> Email is invalid </span>}
            </div>
            <div> 
              <label htmlFor="" className="text-sm font-bold text-gray-900 block"> Password </label>
              <input 
              {...register('password', {required: true, minLength: 6, maxLength: 14 })}
              type="password" className="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Password" />
              {errors.password && <span className="text-red-600"> Password is invalid </span>}
            </div>
            <div className="flex flex-row mt-6 space-x-2">
              <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-bold"> Submit </button>
              <button className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 rounded-md text-white font-bold"> Register </button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default App;
