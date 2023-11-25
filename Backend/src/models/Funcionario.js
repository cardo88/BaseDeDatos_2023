class Funcionario {
    constructor(cedula, nombre, apellido, fechaNacimiento, direccion, telefono, email, username) {
        this.cedula = cedula;
        this.username = username;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
        this.direccion = direccion;
        this.telefono = telefono;
        this.email = email;
    }
}

export default Funcionario;