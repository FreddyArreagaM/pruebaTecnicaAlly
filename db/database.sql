CREATE DATABASE db_pruebaally;

USE db_pruebaally;

-- SP para usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- SP para paises
CREATE TABLE countries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    addressIp VARCHAR(50) NOT NULL,
    flag_code VARCHAR(5) NOT NULL,
    UNIQUE(name)
);

-- Insertar algunos países de ejemplo
INSERT INTO countries (name, addressIp, flag_code) VALUES
('Ecuador', '102.177.160.0', 'ec'),
('Alemania', '103.192.160.0', 'de'),
('Argentina', '1.178.48.0', 'ar'),
('Mexico', '101.44.31.255', 'mx');

DELIMITER //

-- SP para registrar usuario
DROP PROCEDURE IF EXISTS sp_create_user;
CREATE PROCEDURE sp_create_user(
    IN p_name VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(255),
    OUT messageError VARCHAR(255)
)
BEGIN
    DECLARE emailExists INT DEFAULT 0;

    SELECT COUNT(*) INTO emailExists FROM users WHERE email = p_email;

    IF emailExists > 0 THEN
        SET messageError = 'Ya existe un usuario con ese email.';
    ELSE
        INSERT INTO users (name, email, password) VALUES (p_name, p_email, p_password);
        SET messageError = NULL;
    END IF;
END //

-- SP para buscar usuario por email
DROP PROCEDURE IF EXISTS sp_find_user_by_email;
CREATE PROCEDURE sp_find_user_by_email(
    IN p_email VARCHAR(100),
    OUT messageError VARCHAR(255)
)
BEGIN
    DECLARE userCount INT;

    SELECT COUNT(*) INTO userCount FROM users WHERE email = p_email;

    IF userCount = 0 THEN
        SET messageError = 'No se encontró ningún usuario con ese email.';
        SELECT NULL AS id, NULL AS name, NULL AS email, NULL AS password, NULL AS registered_at, NULL AS last_login;
    ELSE
        SET messageError = NULL;
        SELECT * FROM users WHERE email = p_email;
    END IF;
END //

-- SP para actualizar el último login
DROP PROCEDURE IF EXISTS sp_update_last_login;
CREATE PROCEDURE sp_update_last_login(
    IN p_user_id INT,
    OUT messageError VARCHAR(255)
)
BEGIN
    DECLARE userExists INT;

    SELECT COUNT(*) INTO userExists FROM users WHERE id = p_user_id;

    IF userExists = 0 THEN
        SET messageError = 'No se encontró ningún usuario con ese ID.';
    ELSE
        UPDATE users SET last_login = NOW() WHERE id = p_user_id;
        SET messageError = NULL;
    END IF;
END //

-- SP para obtener todos los usuarios (solo ciertos campos)
DROP PROCEDURE IF EXISTS sp_get_all_users;
CREATE PROCEDURE sp_get_all_users(
    OUT messageError VARCHAR(255)
)
BEGIN
    DECLARE totalUsers INT;

    SELECT COUNT(*) INTO totalUsers FROM users;

    IF totalUsers = 0 THEN
        SET messageError = 'No existen usuarios registrados.';
        SELECT NULL AS name, NULL AS email, NULL AS registered_at, NULL AS last_login;
    ELSE
        SET messageError = NULL;
        SELECT name, email, registered_at, last_login FROM users;
    END IF;
END //

DELIMITER ;


DELIMITER //

DROP PROCEDURE IF EXISTS sp_get_all_countries;
CREATE PROCEDURE sp_get_all_countries(
    OUT messageError VARCHAR(255)
)
BEGIN
    DECLARE totalCountries INT;

    SELECT COUNT(*) INTO totalCountries FROM countries;

    IF totalCountries = 0 THEN
        SET messageError = 'No existen países registrados.';
        SELECT NULL AS id, NULL AS name, NULL AS addressIp, NULL AS flag_code;
    ELSE
        SET messageError = NULL;
        SELECT id, name, addressIp, flag_code FROM countries;
    END IF;
END //

DELIMITER ;

-- SP para obtener país por ID
DROP PROCEDURE IF EXISTS sp_get_country_by_id;
DELIMITER //
CREATE PROCEDURE sp_get_country_by_id(
    IN p_id INT,
    OUT messageError VARCHAR(255)
)
BEGIN
    DECLARE countryCount INT;

    SELECT COUNT(*) INTO countryCount FROM countries WHERE id = p_id;

    IF countryCount = 0 THEN
        SET messageError = 'No se encontró ningún país con ese ID.';
        SELECT NULL AS id, NULL AS name, NULL AS addressIp, NULL AS flag_code;
    ELSE
        SET messageError = NULL;
        SELECT id, name, addressIp, flag_code FROM countries WHERE id = p_id;
    END IF;
END //
DELIMITER ;

-- SP para crear país
DROP PROCEDURE IF EXISTS sp_create_country;
DELIMITER //
CREATE PROCEDURE sp_create_country(
    IN p_name VARCHAR(100),
    IN p_addressIp VARCHAR(50),
    IN p_flag_code VARCHAR(5),
    OUT messageError VARCHAR(255)
)
BEGIN
    DECLARE nameExists INT DEFAULT 0;

    SELECT COUNT(*) INTO nameExists FROM countries WHERE name = p_name;

    IF nameExists > 0 THEN
        SET messageError = 'Ya existe un país con ese nombre.';
    ELSE
        INSERT INTO countries (name, addressIp, flag_code) VALUES (p_name, p_addressIp, p_flag_code);
        SET messageError = NULL;
    END IF;
END //
DELIMITER ;

-- SP para actualizar país
DROP PROCEDURE IF EXISTS sp_update_country;
DELIMITER //
CREATE PROCEDURE sp_update_country(
    IN p_id INT,
    IN p_name VARCHAR(100),
    IN p_addressIp VARCHAR(50),
    IN p_flag_code VARCHAR(5),
    OUT messageError VARCHAR(255)
)
BEGIN
    DECLARE countryExists INT DEFAULT 0;
    DECLARE nameExists INT DEFAULT 0;

    SELECT COUNT(*) INTO countryExists FROM countries WHERE id = p_id;
    SELECT COUNT(*) INTO nameExists FROM countries WHERE name = p_name AND id <> p_id;

    IF countryExists = 0 THEN
        SET messageError = 'No se encontró ningún país con ese ID.';
    ELSEIF nameExists > 0 THEN
        SET messageError = 'Ya existe otro país con ese nombre.';
    ELSE
        UPDATE countries SET name = p_name, addressIp = p_addressIp, flag_code = p_flag_code WHERE id = p_id;
        SET messageError = NULL;
    END IF;
END //
DELIMITER ;

-- SP para eliminar país
DROP PROCEDURE IF EXISTS sp_delete_country;
DELIMITER //
CREATE PROCEDURE sp_delete_country(
    IN p_id INT,
    OUT messageError VARCHAR(255)
)
BEGIN
    DECLARE countryExists INT DEFAULT 0;

    SELECT COUNT(*) INTO countryExists FROM countries WHERE id = p_id;

    IF countryExists = 0 THEN
        SET messageError = 'No se encontró ningún país con ese ID.';
    ELSE
        DELETE FROM countries WHERE id = p_id;
        SET messageError = NULL;
    END IF;
END //
DELIMITER ;

-- Crear tabla de tareas
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    status CHAR(1) NOT NULL CHECK (status IN ('C', 'P'))
);

-- Insertar algunas tareas de ejemplo
INSERT INTO tasks (description, status) VALUES
('Aprender un nuevo framework de frontend (Angular, React, Vue)', 'C'),
('Terminar la funcionalidad de autenticación de usuarios', 'P'),
('Documentar la API REST con Swagger', 'C'),
('Refactorizar el módulo de pagos', 'P'),
('Implementar pruebas unitarias para el servicio de notificaciones', 'C'),
('Actualizar dependencias del proyecto', 'P'),
('Optimizar consultas a la base de datos', 'C'),
('Corregir bug en el formulario de registro', 'P'),
('Desplegar la aplicación en el entorno de producción', 'P'),
('Investigar sobre arquitectura de microservicios', 'C');

DELIMITER $$

CREATE PROCEDURE sp_create_task(
    IN p_description VARCHAR(255),
    IN p_status CHAR(1),
    OUT p_messageError VARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SET p_messageError = 'Error al crear tarea';
        ROLLBACK;
    END;
    
    START TRANSACTION;
    
    IF p_status NOT IN ('C', 'P') THEN
        SET p_messageError = 'Estado inválido. Debe ser C o P';
        ROLLBACK;
    ELSE
        INSERT INTO tasks(description, status) VALUES (p_description, p_status);
        SET p_messageError = 'Tarea creada correctamente';
        COMMIT;
    END IF;
END $$

CREATE PROCEDURE sp_get_task_by_id(
    IN p_id INT,
    OUT p_messageError VARCHAR(255)
)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM tasks WHERE id = p_id) THEN
        SET p_messageError = 'Tarea no encontrada';
    ELSE
        SET p_messageError = 'OK';
    END IF;
    
    SELECT * FROM tasks WHERE id = p_id;
END $$

CREATE PROCEDURE sp_update_task(
    IN p_id INT,
    IN p_description VARCHAR(255),
    IN p_status CHAR(1),
    OUT p_messageError VARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SET p_messageError = 'Error al actualizar tarea';
        ROLLBACK;
    END;
    
    START TRANSACTION;
    
    IF NOT EXISTS (SELECT 1 FROM tasks WHERE id = p_id) THEN
        SET p_messageError = 'Tarea no encontrada';
        ROLLBACK;
    ELSEIF p_status NOT IN ('C', 'P') THEN
        SET p_messageError = 'Estado inválido. Debe ser C o P';
        ROLLBACK;
    ELSE
        UPDATE tasks SET description = p_description, status = p_status WHERE id = p_id;
        SET p_messageError = 'Tarea actualizada correctamente';
        COMMIT;
    END IF;
END $$

CREATE PROCEDURE sp_delete_task(
    IN p_id INT,
    OUT p_messageError VARCHAR(255)
)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM tasks WHERE id = p_id) THEN
        SET p_messageError = 'Tarea no encontrada';
    ELSE
        DELETE FROM tasks WHERE id = p_id;
        SET p_messageError = 'Tarea eliminada correctamente';
    END IF;
END $$

CREATE PROCEDURE sp_get_all_tasks(
    OUT p_messageError VARCHAR(255)
)
BEGIN
    SET p_messageError = 'OK';
    SELECT * FROM tasks ORDER BY id;
END $$

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_get_pending_tasks(OUT messageError VARCHAR(255))
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SET messageError = 'Error al obtener tareas pendientes';
    END;

    SELECT * FROM tasks WHERE status = 'P';
    SET messageError = NULL;
END //

DELIMITER ;
