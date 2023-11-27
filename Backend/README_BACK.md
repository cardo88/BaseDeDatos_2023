#BACKEND

##Querys por http que recibe:

- /api/auth/register
    - request: post
    - param: logId, password
- /api/auth/login
    - request: post
    - param: ci, logId, password

- /api/funcionarios/getFuncionarioByCI
    - request: get
    - param: ci
- /api/funcionarios/updateFuncionarioByCI
    - request: post
    - param: ci, nombre, apellido, fechaNacimiento, direccion, telefono, email
- /api/funcionarios/getFuncionarioByLogId
    - request: get
    - param: logId

- /api/agenda/getAllRecords
    - request: get
    - param: n/a
- /api/agenda/insertCita
    - request: get
    - param: ci, fechaAgenda

- /api/periodos/getAllPeriodos
    - request: get
    - param: n/a
- /api/periodos/insertPeriodo
    - request: post
    - param: año, semestre, fechaInicio, fechaFin
- /api/periodos/updatePeriodo
    - request: post
    - param: año, semestre, fechaInicio, fechaFin




###/api/carnet/getFuncionarioByCI
    si tiene carnet de salud, entonces se recibe una respuesta similar a:

{
    "message": "Datos del funcionario y carnet obtenidos",
    "funcionario": {
        "cedula": 99999,
        "username": "pepe1",
        "nombre": "NuevoNombre",
        "apellido": "NuevoApellido",
        "fechaNacimiento": "1990-01-01T00:00:00.000Z",
        "direccion": "NuevaDirección",
        "telefono": "NuevoTeléfono",
        "email": "nuevo@email.com"
    },
    "carnet": {
        "cedula": 99999,
        "fechaEmision": "2023-06-01T00:00:00.000Z",
        "fechaVencimiento": "2023-12-20T00:00:00.000Z",
        "comprobante": "ZmlsZXNlcnZlci8xNzAxMDQ5NDA0NTg4LXBhcGFub2VsLmpwZw=="
    }
}

    No se si vale la pena esto, pero:
    En el lado del cliente, cuando recibes esta respuesta, hay que decodificar la cadena Base64 para obtener los datos binarios originales.

    Ejemplo, en node con react:


    const CarnetSaludComponent = ({ carnet }) => {
    const imageData = `data:image/jpeg;base64,${carnet.comprobante}`;

    return (
        <div>
        <p>Cédula: {carnet.cedula}</p>
        <p>Fecha de Emisión: {carnet.fechaEmision}</p>
        <p>Fecha de Vencimiento: {carnet.fechaVencimiento}</p>
        <img src={imageData} alt="Comprobante de Carnet de Salud" />
        </div>
    );
    };
    export default CarnetSaludComponent;

