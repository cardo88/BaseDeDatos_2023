-- Crear la base de datos
CREATE DATABASE if not exists obligatorio_2023;

-- Elegir la base de datos
USE obligatorio_2023;

-- Crear la tabla Logins
CREATE TABLE Logins (
    LogId VARCHAR(255) PRIMARY KEY,
    Password VARCHAR(255) NOT NULL
);

-- Crear la tabla Funcionarios
CREATE TABLE Funcionarios (
    Ci INT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Apellido VARCHAR(50) NOT NULL,
    Fch_Nacimiento DATE NOT NULL,
    Dirección VARCHAR(255),
    Teléfono VARCHAR(15),
    Email VARCHAR(255),
    LogId VARCHAR(255) NOT NULL, -- SE ASUME QUE PRIMERO SE REGISTRA
    FOREIGN KEY (LogId) REFERENCES Logins(LogId)
);

-- Crear la tabla Agenda
CREATE TABLE Agenda (
    Nro INT AUTO_INCREMENT PRIMARY KEY,
    Ci INT,
    Fch_Agenda DATE,
    FOREIGN KEY (Ci) REFERENCES Funcionarios(Ci)
);

-- Crear la tabla Carnet_Salud
CREATE TABLE Carnet_Salud (
    Ci INT PRIMARY KEY,
    Fch_Emision DATE NOT NULL,
    Fch_Vencimiento DATE NOT NULL,
    Comprobante BLOB NOT NULL
);


-- Crear la tabla Periodos_Actualizacion
CREATE TABLE Periodos_Actualizacion (
    Año INT,
    Semestre INT,
    Fch_Inicio DATE,
    Fch_Fin DATE,
    PRIMARY KEY (Año, Semestre)
);


