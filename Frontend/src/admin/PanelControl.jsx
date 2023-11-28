import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../api/instance';
import dayjs from 'dayjs';

function PanelControl() {
  const navigate = useNavigate();
  const { control, handleSubmit, register } = useForm(); 

  const onSubmit = async (data) => {
    try {
      await api.post('/periodos/updatePeriodo', {
        fechaInicio: dayjs(data.fechaInicio).format('YYYY-MM-DD'),
        fechaFin: dayjs(data.fechaFin).format('YYYY-MM-DD'),
        año: data.año,
        semestre: data.semestre,
      });
      toast.success("Modificación de período realizada con éxito.");
      navigate('/Indice');
    } catch (error) {
      console.error('Error al realizar la modificación de período:', error);
      toast.error("Error al realizar la modificación de período. Por favor, inténtalo de nuevo.");
    }
  };

  const goBack = () => {
    navigate('/AdminIndex');
  };

  return (
        <div className="min-h-screen bg-blue-100 flex flex-col justify-center">
        <div className="max-w-sm w-full mx-auto">
            <div className="text-3xl font-bold text-gray-900 mt-2 text-center">Modificar Período</div>
            <div className="mt-4 w-full bg-white p-8 border border-gray-300">
            <input
                {...register('año')}
                className="w-full p-3 border border-gray-300 rounded-lg text-lg mb-4"
                placeholder="Año"
            />
            <input
                {...register('semestre')}
                className="w-full p-3 border border-gray-300 rounded-lg text-lg mb-4"
                placeholder="Semestre"
            />
            <Controller
                control={control}
                name="fechaInicio"
                render={({ field }) => (
                <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-lg mb-4"
                    placeholderText="Fecha de inicio"
                    wrapperClassName='w-full'
                />
                )}
            />
            <Controller
                control={control}
                name="fechaFin"
                render={({ field }) => (
                <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    minDate={new Date()}
                    className="w-full p-3 border border-gray-300 rounded-lg text-lg mb-4"
                    placeholderText="Fecha de fin"
                    wrapperClassName='w-full'
                />
                )}
            />
            <button
                onClick={handleSubmit(onSubmit)}
                className="mt-4 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-bold"
            >
                Modificar Fecha
            </button>
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
        </div>
  );
}

export default PanelControl;
