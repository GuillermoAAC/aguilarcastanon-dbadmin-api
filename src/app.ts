import express, { Request, Response } from 'express';
import userRoutes from './routes/user.routes.js';
import productoRoutes from './routes/producto.routes.js';
import ventaRoutes from './routes/venta.routes.js';
import envioRoutes from './routes/envio.routes.js';

const app = express();

// Middleware para parsear JSON y urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas bajo prefijo /api
app.use('/api', userRoutes);
app.use('/api', productoRoutes);
app.use('/api', ventaRoutes);
app.use('/api', envioRoutes);

// Rutas directas (compatibilidad en caso de no incluir /api)
app.use(userRoutes);
app.use(productoRoutes);
app.use(ventaRoutes);
app.use(envioRoutes);

// Ruta de prueba/salud
app.get('/api/status', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'API funcionando correctamente' });
});

app.get('/status', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'API funcionando correctamente' });
});

export default app;
