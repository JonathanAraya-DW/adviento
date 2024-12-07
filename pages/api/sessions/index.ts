import crypto from 'crypto';

import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma';

// Handler principal
/**
 * API handler for managing sessions.
 *
 * Supports two operations:
 * - GET: Retrieves all sessions for an authenticated user
 * - POST: Creates a new session
 *
 * @param req - The Next.js API request object
 * @param req.query.userId - User ID for GET requests
 * @param req.body - Request body for POST requests
 * @param req.body.name - Name of the session
 * @param req.body.password - Password for the session
 * @param req.body.minGiftValue - Minimum gift value allowed
 * @param req.body.maxGiftValue - Maximum gift value allowed
 * @param req.body.userId - User ID of the session owner
 * @param res - The Next.js API response object
 *
 * @returns For GET: Array of sessions with their participants
 * @returns For POST: Newly created session object
 *
 * @throws 400 - When userId is missing
 * @throws 405 - When using unsupported HTTP methods
 * @throws 500 - When database operations fail
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    // Obtener sesiones para un usuario autenticado
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'Falta el userId en la solicitud' });
    }

    const user = await prisma.user.findUnique({
      where: { id: String(userId) },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no existe' });
    }

    try {
      const sessions = await prisma.session.findMany({
        where: { ownerId: String(userId) },
        include: { participants: true },
      });

      res.status(200).json(sessions);
    } catch (_error) {
      res.status(500).json({ error: 'Error al obtener las sesiones' });
    }
  } else if (req.method === 'POST') {
    const { name, password, minGiftValue, maxGiftValue, userId } = req.body;

    if (!name) {
      return res.status(400).json({
        error: 'Falta el nombre en el cuerpo de la solicitud',
      });
    }

    if (!userId) {
      return res
        .status(400)
        .json({ error: 'Falta el userId en el cuerpo de la solicitud' });
    }

    try {
      const session = await prisma.session.create({
        data: {
          name,
          password,
          minGiftValue,
          maxGiftValue,
          ownerId: userId,
          link: `https://adviento.cl/sorteo/${crypto.randomUUID()}`,
        },
      });

      res.status(201).json(session);
    } catch (_error) {
      res.status(500).json({ error: 'Error al crear la sesión' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
