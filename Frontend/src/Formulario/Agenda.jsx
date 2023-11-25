import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Agenda() {
  const [fechaReserva, setFechaReserva] = useState(new Date());
  const navigate = useNavigate();

  const handleSubmit = () => {
    toast.success("Reserva de agenda realizada con éxito.");
    console.log(fechaReserva);
    navigate('/Indice');
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col justify-center">
      <div className="max-w-sm w-full mx-auto">
        <div className="text-3xl font-bold text-gray-900 mt-2 text-center">Reservar Agenda</div>
        <div className="mt-4 w-full bg-white p-8 border border-gray-300">
          <DatePicker
            selected={fechaReserva}
            onChange={(date) => setFechaReserva(date)}
            minDate={new Date()} 
            className="w-full p-3 border border-gray-300 rounded-lg text-lg"
            placeholderText="Seleccione una fecha de reserva"
            wrapperClassName='w-full'
          />
          <button 
            onClick={handleSubmit} 
            className="mt-4 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-bold"
          >
            Confirmar Reserva
          </button>
        </div>
      </div>
    </div>
  );
}

export default Agenda;