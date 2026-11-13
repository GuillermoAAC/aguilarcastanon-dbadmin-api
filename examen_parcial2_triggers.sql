-- Cambiar delimitador para la creación de triggers
DELIMITER //


DROP TRIGGER IF EXISTS after_update_envio_costo;
CREATE TRIGGER after_update_envio_costo
AFTER UPDATE ON envios
FOR EACH ROW
BEGIN
    IF OLD.costo_total <> NEW.costo_total THEN
        INSERT INTO auditoria_envios (envio_id, costo_anterior, costo_nuevo, usuario, fecha_modificacion)
        VALUES (NEW.id, OLD.costo_total, NEW.costo_total, CURRENT_USER(), NOW());
    END IF;
END//



DROP TRIGGER IF EXISTS before_insert_paquete_almacen;
CREATE TRIGGER before_insert_paquete_almacen
BEFORE INSERT ON paquetes
FOR EACH ROW
BEGIN
    DECLARE v_capacidad_maxima INT;
    DECLARE v_paquetes_actuales INT;

    -- Obtener la capacidad máxima del almacén
    SELECT capacidad_maxima INTO v_capacidad_maxima
    FROM almacenes
    WHERE id = NEW.almacen_id;

    -- Contar cuántos paquetes ya tiene asignados ese almacén
    SELECT COUNT(*) INTO v_paquetes_actuales
    FROM paquetes
    WHERE almacen_id = NEW.almacen_id;

    -- Validar si supera la capacidad
    IF v_paquetes_actuales >= v_capacidad_maxima THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error: El almacén ha superado su capacidad máxima de paquetes.';
    END IF;
END//


DROP TRIGGER IF EXISTS after_insert_historial_rastreo;
CREATE TRIGGER after_insert_historial_rastreo
AFTER INSERT ON historial_rastreo
FOR EACH ROW
BEGIN
    IF NEW.estado_evento = 'ENTREGADO' THEN
        UPDATE envios
        SET estado_global = 'ENTREGADO'
        WHERE id = NEW.envio_id;
    END IF;
END//

-- Restaurar el delimitador por defecto
DELIMITER ;