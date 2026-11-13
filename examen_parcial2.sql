
USE ventas_db;

-- 1. Tabla Clientes
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    estado ENUM('ACTIVO', 'INACTIVO') NOT NULL,
    limite_credito DECIMAL(10,2) NOT NULL
) ENGINE=InnoDB;

-- 2. Tabla Direcciones
CREATE TABLE direcciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    calle VARCHAR(150) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    estado_provincia VARCHAR(100) NOT NULL,
    codigo_postal VARCHAR(20) NOT NULL,
    CONSTRAINT fk_direccion_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 3. Tabla Almacenes
CREATE TABLE almacenes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    ubicacion VARCHAR(150) NOT NULL,
    capacidad_maxima INT NOT NULL
) ENGINE=InnoDB;

-- 4. Tabla Envíos
CREATE TABLE envios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    direccion_origen_id INT NOT NULL,
    direccion_destino_id INT NOT NULL,
    costo_total DECIMAL(10,2) NOT NULL,
    fecha DATETIME NOT NULL,
    estado_global ENUM('REGISTRADO', 'EN_TRANSITO', 'ENTREGADO', 'CANCELADO') NOT NULL,
    CONSTRAINT fk_envio_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
    CONSTRAINT fk_envio_origen FOREIGN KEY (direccion_origen_id) REFERENCES direcciones(id),
    CONSTRAINT fk_envio_destino FOREIGN KEY (direccion_destino_id) REFERENCES direcciones(id)
) ENGINE=InnoDB;

-- 5. Tabla Paquetes
CREATE TABLE paquetes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    envio_id INT NOT NULL,
    almacen_id INT NOT NULL,
    peso DECIMAL(8,2) NOT NULL,
    dimensiones VARCHAR(50) NOT NULL,
    contenido TEXT NOT NULL,
    CONSTRAINT fk_paquete_envio FOREIGN KEY (envio_id) REFERENCES envios(id) ON DELETE CASCADE,
    CONSTRAINT fk_paquete_almacen FOREIGN KEY (almacen_id) REFERENCES almacenes(id)
) ENGINE=InnoDB;

-- 6. Tabla Historial de Rastreo
CREATE TABLE historial_rastreo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    envio_id INT NOT NULL,
    fecha DATETIME NOT NULL,
    ubicacion_actual VARCHAR(150) NOT NULL,
    estado_evento VARCHAR(50) NOT NULL,
    observaciones TEXT,
    CONSTRAINT fk_rastreo_envio FOREIGN KEY (envio_id) REFERENCES envios(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 7. Tabla Auditoría de Envíos (Control de cambios de costos)
CREATE TABLE auditoria_envios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    envio_id INT NOT NULL,
    costo_anterior DECIMAL(10,2) NOT NULL,
    costo_nuevo DECIMAL(10,2) NOT NULL,
    usuario VARCHAR(100) NOT NULL,
    fecha_modificacion DATETIME NOT NULL,
    CONSTRAINT fk_auditoria_envio FOREIGN KEY (envio_id) REFERENCES envios(id) ON DELETE CASCADE
) ENGINE=InnoDB;


-- ==========================================
-- DATOS DE PRUEBA (INSERTS) - LAS 7 TABLAS
-- ==========================================

-- 1. Clientes
INSERT INTO clientes (nombre, estado, limite_credito) VALUES 
('Empresa Comercializadora S.A.', 'ACTIVO', 50000.00),
('Distribuciones del Norte', 'ACTIVO', 30000.00),
('Juan Pérez (Particular)', 'INACTIVO', 5000.00);

-- 2. Direcciones
INSERT INTO direcciones (cliente_id, calle, ciudad, estado_provincia, codigo_postal) VALUES 
(1, 'Av. Industrial 123', 'Monterrey', 'Nuevo León', '64000'),
(1, 'Calle Central 456', 'Guadalajara', 'Jalisco', '44100'),
(2, 'Blvd. Costero 789', 'Veracruz', 'Veracruz', '91700'),
(3, 'Calle Reforma 101', 'CDMX', 'Ciudad de México', '06000');

-- 3. Almacenes
INSERT INTO almacenes (nombre, ubicacion, capacidad_maxima) VALUES 
('Almacén Central Norte', 'Monterrey - Parque Industrial', 5),
('Almacén Golfo', 'Veracruz - Zona Portuaria', 3);

-- 4. Envíos
INSERT INTO envios (cliente_id, direccion_origen_id, direccion_destino_id, costo_total, fecha, estado_global) VALUES 
(1, 1, 2, 1250.00, '2026-06-01 10:00:00', 'REGISTRADO'),
(2, 3, 4, 850.50, '2026-06-02 11:30:00', 'EN_TRANSITO');

-- 5. Paquetes
INSERT INTO paquetes (envio_id, almacen_id, peso, dimensiones, contenido) VALUES 
(1, 1, 15.50, '40x30x30 cm', 'Componentes electrónicos'),
(1, 1, 8.20, '20x20x10 cm', 'Documentación y contratos'),
(2, 2, 25.00, '60x50x40 cm', 'Refacciones mecánicas');

-- 6. Historial de Rastreo
INSERT INTO historial_rastreo (envio_id, fecha, ubicacion_actual, estado_evento, observaciones) VALUES 
(1, '2026-06-01 12:00:00', 'Almacén Central Norte', 'REGISTRADO', 'Paquete recibiendo etiquetas'),
(2, '2026-06-02 14:00:00', 'En ruta - Carretera 57', 'EN_TRANSITO', 'Unidad en tránsito hacia destino');

-- 7. Auditoría de Envíos (Registro histórico de cambios de costos previos)
INSERT INTO auditoria_envios (envio_id, costo_anterior, costo_nuevo, usuario, fecha_modificacion) VALUES 
(1, 1100.00, 1250.00, 'supervisor_logistica', '2026-06-01 10:30:00');