-- Elegir la base de datos
USE proyecto;

-- verificar si existe usuario con ese username
SELECT LogId FROM Logins WHERE LogId = 'user1';

-- verificar contraseña
SELECT Password FROM Logins WHERE LogId = 'user1';

-- registrar usuario
INSERT INTO Logins (LogId, Password) VALUES ('nuevo_usuario', 'contraseña_nuevo_usuario');

-- verificar si tienen carne salud al dia
INSERT INTO Funcionarios (Ci, Nombre, Apellido, Fch_Nacimiento, Dirección, Teléfono, Email, LogId)
VALUES (11223344, 'NombreNuevo', 'ApellidoNuevo', '1990-01-01', 'Calle Nueva 123', '555-1234', 'nuevo@email.com', 'nuevo_usuario');

-- registrar carne de salud
INSERT INTO Carnet_Salud (Ci, Fch_Emision, Fch_Vencimiento, Comprobante)
VALUES (32145698, '2022-12-01', '2023-12-01', LOAD_FILE('/home/temp/carnet1.jpg'));
VALUES (98765412, '2022-12-01', '2023-12-01', LOAD_FILE('C:\temp\Carnet-de-Sanidad-Lima.jpg'));
VALUES (65432178, '2022-12-01', '2023-12-01', LOAD_FILE('C:\temp\CARNET.png'));


DELIMITER //

CREATE PROCEDURE InsertarCarnetConImagen(
    IN p_Ci INT,
    IN p_Fch_Emision DATE,
    IN p_Fch_Vencimiento DATE,
    IN p_RutaImagen VARCHAR(255)
)
BEGIN
    DECLARE imagen_binario BLOB;
    SET imagen_binario = LOAD_FILE(p_RutaImagen);

    IF LENGTH(imagen_binario) > 0 THEN
        INSERT INTO Carnet_Salud (Ci, Fch_Emision, Fch_Vencimiento, Comprobante)
        VALUES (p_Ci, p_Fch_Emision, p_Fch_Vencimiento, imagen_binario);
    ELSE
        SELECT 'La imagen no se cargó correctamente.' AS mensaje;
    END IF;
END //

DELIMITER ;

CALL InsertarCarnetConImagen(11223344, '2022-12-01', '2023-12-01', '/home/docker-shared/carnet1.jpg');

select * from Carnet_Salud;


UPDATE Funcionarios SET Nombre = 'NuevoNombre', Apellido = 'NuevoApellido', Fch_Nacimiento = '1990-01-01', Teléfono = 'NuevaDirección', Email = 'nuevo@email.com' WHERE Ci = 1234567;

select * from Funcionarios;

select * from Periodos_Actualizacion;

select * from Logins;

select * from Carnet_Salud;

SELECT F.*
FROM Funcionarios F
LEFT JOIN Carnet_Salud CS ON F.Ci = CS.Ci
WHERE CS.Ci IS NULL OR CS.Fch_Vencimiento < CURRENT_DATE();
