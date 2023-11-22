class Login {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    // Método estático para hashear la contraseña
    static async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }

    // Método para comparar la contraseña con el hash almacenado
    async compararPassword(password) {
        return await bcrypt.compare(password, this.passwordHash);
    }
}

export default Login;