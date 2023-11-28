import { useState } from 'react';
import { api } from '../api/instance';
import dayjs from 'dayjs';

const ListadoFuncionarios = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(false);

  const obtenerFuncionarios = async () => {
    try {
      setLoading(true);
      const response = await api.get('/funcionarios/getFuncionariosSinCarnetSalud');
      console.log("Data from server",response.data);
      setFuncionarios(response.data.funcionarios);
      console.log(response.data.funcionarios);
    } catch (error) {
      console.error('Error al obtener funcionarios:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Listado de Funcionarios</h2>
      <button
        onClick={obtenerFuncionarios}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? 'Cargando...' : 'Obtener Funcionarios'}
      </button>
      {funcionarios.length > 0 && (
        <ul className="mt-4">
          {funcionarios.map((funcionario) => (
            <li key={funcionario.Ci} className="mb-4 border-b pb-2">
              <strong className="text-lg">{funcionario.Nombre} {funcionario.Apellido}</strong>
              <p>Cédula: {funcionario.Ci}</p>
              <p>Fecha de Nacimiento: {dayjs(funcionario.Fch_Nacimiento).format('YYYY-MM-DD')}</p>
              <p>Dirección: {funcionario.Dirección}</p>
              <p>Teléfono: {funcionario.Teléfono}</p>
              <p>Email: {funcionario.Email}</p>
              <p>LogId: {funcionario.LogId}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListadoFuncionarios;
