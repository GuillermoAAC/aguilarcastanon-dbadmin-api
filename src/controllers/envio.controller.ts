import { Request, Response } from 'express';
import { envioRepository } from '../repository/EnvioRepository.js';
import { paqueteRepository } from '../repository/PaqueteRepository.js';
import { historialRastreoRepository } from '../repository/HistorialRastreoRepository.js';

// 1. POST /api/envios -> Registra un nuevo envío con sus paquetes iniciales
export const registrarEnvio = async (req: Request, res: Response) => {
  try {
    const envio = await envioRepository.create(req.body);
    return res.status(201).json({ message: 'Envío registrado exitosamente', data: envio });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// 2. PUT /api/envios/:id/costo -> Modifica el costo (Detona Trigger after_update_envio_costo)
export const actualizarCostoEnvio = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { costo_total } = req.body;
    
    const envioActualizado = await envioRepository.update(id, { costo_total });
    if (!envioActualizado) {
      return res.status(404).json({ error: 'Envío no encontrado' });
    }

    return res.status(200).json({ message: 'Costo actualizado y auditado correctamente', data: envioActualizado });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// 3. POST /api/almacenes/:id/paquetes -> Asigna paquete (Detona Trigger before_insert_paquete_almacen -> Captura error 45000)
export const asignarPaqueteAlmacen = async (req: Request, res: Response) => {
  try {
    const almacenId = Number(req.params.id);
    
    const paquete = await paqueteRepository.create({
      almacen_id: almacenId,
      envio_id: req.body.envio_id,
      peso: req.body.peso,
      dimensiones: req.body.dimensiones,
      contenido: req.body.contenido
    });

    return res.status(201).json({ message: 'Paquete asignado al almacén con éxito', data: paquete });
  } catch (error: any) {
    // Capturamos el error lanzado por el SIGNAL SQLSTATE '45000' de MySQL
    if (error.message && error.message.includes('45000')) {
      return res.status(400).json({ 
        error: 'Bad Request', 
        message: 'El almacén ha superado su capacidad máxima de paquetes.' 
      });
    }
    return res.status(400).json({ error: error.message });
  }
};

// 4. POST /api/envios/:id/rastreo -> Agrega rastreo (Detona Trigger after_insert_historial_rastreo)
export const registrarRastreoEnvio = async (req: Request, res: Response) => {
  try {
    const envioId = Number(req.params.id);
    
    const rastreo = await historialRastreoRepository.create({
      envio_id: envioId,
      fecha: req.body.fecha,
      ubicacion_actual: req.body.ubicacion_actual,
      estado_evento: req.body.estado_evento,
      observaciones: req.body.observaciones
    });

    return res.status(201).json({ message: 'Rastreo agregado y estado actualizado de forma automática', data: rastreo });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// 5. GET /api/envios -> Envíos activos con QueryBuilder
export const listarEnviosActivos = async (_req: Request, res: Response) => {
  try {
    const envios = await envioRepository.findActiveEnvios();
    return res.status(200).json(envios);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// 6. GET /api/clientes/:id/envios -> Historial por cliente
export const listarEnviosPorCliente = async (req: Request, res: Response) => {
  try {
    const clienteId = Number(req.params.id);
    const envios = await envioRepository.findByClienteId(clienteId);
    return res.status(200).json(envios);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// 7. GET /api/envios/:id -> Obtener un envío por ID
export const obtenerEnvioPorId = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const envio = await envioRepository.findById(id);
    if (!envio) {
      return res.status(404).json({ error: 'Envío no encontrado' });
    }
    return res.status(200).json(envio);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};