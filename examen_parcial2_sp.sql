-- Cambiar delimitador para la creación de procedures
DELIMITER //

DROP PROCEDURE IF EXISTS sp_reporte_mensual_cliente//
CREATE PROCEDURE sp_reporte_mensual_cliente(
    IN p_cliente_id INT,
    IN p_mes INT,
    IN p_anio INT
)
BEGIN
    SELECT 
        c.id AS cliente_id,
        c.nombre AS cliente_nombre,
        COUNT(e.id) AS total_envios_entregados,
        COALESCE(SUM(e.costo_total), 0.00) AS facturacion_total,
        COALESCE(AVG(TIMESTAMPDIFF(HOUR, e.fecha, hr.fecha)), 0) AS tiempo_promedio_entrega_horas
    FROM clientes c
    LEFT JOIN envios e ON c.id = e.cliente_id 
        AND MONTH(e.fecha) = p_mes 
        AND YEAR(e.fecha) = p_anio 
        AND e.estado_global = 'ENTREGADO'
    LEFT JOIN historial_rastreo hr ON e.id = hr.envio_id AND hr.estado_evento = 'ENTREGADO'
    WHERE c.id = p_cliente_id
    GROUP BY c.id, c.nombre;
END//


DROP PROCEDURE IF EXISTS sp_obtener_hoja_ruta_envio//
CREATE PROCEDURE sp_obtener_hoja_ruta_envio(
    IN p_envio_id INT
)
BEGIN
    -- 1. Información general del envío, cliente y direcciones
    SELECT 
        e.id AS envio_id,
        e.fecha,
        e.estado_global,
        e.costo_total,
        cli.nombre AS cliente,
        dorigen.calle AS origen_calle, dorigen.ciudad AS origen_ciudad,
        ddestino.calle AS destino_calle, ddestino.ciudad AS destino_ciudad
    FROM envios e
    JOIN clientes cli ON e.cliente_id = cli.id
    JOIN direcciones dorigen ON e.direccion_origen_id = dorigen.id
    JOIN direcciones ddestino ON e.direccion_destino_id = ddestino.id
    WHERE e.id = p_envio_id;

    -- 2. Desglose de paquetes del envío
    SELECT 
        p.id AS paquete_id,
        p.peso,
        p.dimensiones,
        p.contenido,
        a.nombre AS almacen_asignado,
        a.ubicacion AS ubicacion_almacen
    FROM paquetes p
    JOIN almacenes a ON p.almacen_id = a.id
    WHERE p.envio_id = p_envio_id;

    -- 3. Historial cronológico de rastreo
    SELECT 
        hr.id AS rastreo_id,
        hr.fecha,
        hr.ubicacion_actual,
        hr.estado_evento,
        hr.observaciones
    FROM historial_rastreo hr
    WHERE hr.envio_id = p_envio_id
    ORDER BY hr.fecha ASC;
END//

-- Restaurar el delimitador por defecto
DELIMITER ;


-- Probar Procedure 1 (Cliente 1, Mes 6, Año 2026)
CALL sp_reporte_mensual_cliente(1, 6, 2026);

-- Probar Procedure 2 (Envío ID 1)
CALL sp_obtener_hoja_ruta_envio(1);