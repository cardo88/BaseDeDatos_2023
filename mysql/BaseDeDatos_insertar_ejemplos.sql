-- Elegir la base de datos
USE obligatorio_2023;

-- Insertar datos en la tabla Logins
INSERT INTO Logins (LogId, Password) VALUES
('pepe', 'pass_pepe'),
('ana', 'pass_ana'),
('juan', 'pass_juan');

-- Insertar datos en la tabla Funcionarios
INSERT INTO Funcionarios (Ci, Nombre, Apellido, Fch_Nacimiento, Dirección, Teléfono, Email, LogId) VALUES
(12345678, 'Juan', 'Pérez', '1980-05-15', 'Calle 123, Ciudad', '555-1234', 'juan@example.com', 'juan'),
(76543210, 'Ana', 'Gómez', '1992-08-20', 'Avenida 456, Ciudad', '555-5678', 'ana@example.com', 'ana'),
(98765432, 'Pepe', 'López', '1985-03-10', 'Boulevard 789, Ciudad', '555-9876', 'pepe@example.com', 'pepe');

-- Insertar datos en la tabla Agenda
INSERT INTO Agenda (Nro, Ci, Fch_Agenda) VALUES
(1, 12345678, '2023-01-10'),
(2, 76543210, '2023-02-15'),
(3, 98765432, '2023-03-20');

-- Insertar datos en la tabla Carnet_Salud
INSERT INTO Carnet_Salud (Ci, Fch_Emision, Fch_Vencimiento, Comprobante) VALUES
(12345678, '2022-12-01', '2023-12-01', 'CS1234567'),
(76543210, '2023-01-15', '2024-01-15', 'CS7654321'),
(98765432, '2022-11-20', '2023-11-20', 'CS9876543');

-- Insertar datos en la tabla Periodos_Actualizacion
INSERT INTO Periodos_Actualizacion (Año, Semestre, Fch_Inicio, Fch_Fin) VALUES
(2023, 1, '2023-01-01', '2023-06-30'),
(2023, 2, '2023-07-01', '2023-12-31');
