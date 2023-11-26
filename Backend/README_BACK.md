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