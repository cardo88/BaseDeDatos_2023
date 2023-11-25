-- Insertar datos en la tabla Logins
INSERT INTO Logins (LogId, Password) VALUES
('user1', 'password1'),
('user2', 'password2'),
('user3', 'password3');

-- Insertar datos en la tabla Funcionarios
INSERT INTO Funcionarios (Ci, Nombre, Apellido, Fch_Nacimiento, Dirección, Teléfono, Email, LogId) VALUES
(1234567, 'Juan', 'Pérez', '1990-01-15', 'Calle 123, Ciudad', '555-1234', 'juan.perez@email.com', 'user1'),
(2345678, 'María', 'Gómez', '1985-05-20', 'Avenida 456, Ciudad', '555-5678', 'maria.gomez@email.com', 'user2'),
(3456789, 'Carlos', 'López', '1988-08-10', 'Calle 789, Ciudad', '555-9012', 'carlos.lopez@email.com', 'user3');

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
