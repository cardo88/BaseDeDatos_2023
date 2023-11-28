-- Crear la base de datos
CREATE DATABASE if not exists proyecto;

-- Elegir la base de datos
USE proyecto;

-- Crear la tabla Logins
CREATE TABLE Logins (
    LogId VARCHAR(255) PRIMARY KEY,
    Password VARCHAR(255) NOT NULL
);

-- Crear la tabla Funcionarios
CREATE TABLE Funcionarios (
    Ci INT PRIMARY KEY,
    Nombre VARCHAR(50),
    Apellido VARCHAR(50),
    Fch_Nacimiento DATE,
    Direccion VARCHAR(255),
    Telefono VARCHAR(15),
    Email VARCHAR(255),
    LogId VARCHAR(255) NOT NULL,
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




-- Insertar datos en la tabla Logins
INSERT INTO Logins (LogId, Password) VALUES
('user1', 'password1'),
('user2', 'password2'),
('user3', 'password3');

-- Insertar datos en la tabla Funcionarios
INSERT INTO Funcionarios (Ci, Nombre, Apellido, Fch_Nacimiento, Dirección, Teléfono, Email, LogId) VALUES
(1234567, 'Juan', 'Pérez', '1990-01-15', 'Calle 123, Ciudad', 5551234, 'juan.perez@email.com', 'user1'),
(2345678, 'María', 'Gómez', '1985-05-20', 'Avenida 456, Ciudad', 5555678, 'maria.gomez@email.com', 'user2'),
(3456789, 'Carlos', 'López', '1988-08-10', 'Calle 789, Ciudad', 5559012, 'carlos.lopez@email.com', 'user3');


-- Insertar datos en la tabla Agenda
INSERT INTO Agenda (Nro, Ci, Fch_Agenda) VALUES
(1, 1234567, '2023-01-05'),
(2, 2345678, '2023-01-10'),
(3, 3456789, '2023-02-15');

-- Insertar datos en la tabla Carnet_Salud
INSERT INTO Carnet_Salud (Ci, Fch_Emision, Fch_Vencimiento, Comprobante) VALUES
(1234567, '2023-01-01', '2023-12-31', 'Comprobante1'),
(2345678, '2023-02-01', '2023-11-30', 'Comprobante2'),
(3456789, '2023-03-01', '2023-10-31', 'Comprobante3');

-- Insertar datos en la tabla Periodos_Actualizacion
INSERT INTO Periodos_Actualizacion (Año, Semestre, Fch_Inicio, Fch_Fin) VALUES
(2023, 1, '2023-01-01', '2023-06-30'),
(2023, 2, '2023-07-01', '2023-12-31');


