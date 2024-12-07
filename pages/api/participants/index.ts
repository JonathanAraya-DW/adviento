import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma';

/**
 * API handler for managing participants.
 *
 * Supports:
 * - POST: Adds a new participant to a session.
 *
 * @param req - The Next.js API request object
 * @param req.body - Request body for POST requests
 * @param req.body.name - Name of the participant
 * @param req.body.email - Email of the participant
 * @param req.body.preferences - Preferences of the participant
 * @param req.body.sessionId - ID of the session the participant is joining
 * @param res - The Next.js API response object
 *
 * @returns For POST: The newly created participant object
 *
 * @throws 400 - When required fields are missing
 * @throws 404 - When the session does not exist
 * @throws 405 - When using unsupported HTTP methods
 * @throws 500 - When database operations fail
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { name, email, preferences, sessionId } = req.body;

    // Validación de datos
    if (!name || !email || !sessionId) {
      return res.status(400).json({
        error: 'Faltan campos obligatorios: name, email o sessionId',
      });
    }

    try {
      // Verificar si la sesión existe
      const session = await prisma.session.findUnique({
        where: { id: sessionId },
      });

      if (!session) {
        return res.status(404).json({ error: 'Sesión no encontrada' });
      }

      // Crear participante
      const participant = await prisma.participant.create({
        data: {
          name,
          email,
          preferences,
          sessionId,
        },
      });

      res.status(201).json(participant);
    } catch (error) {
      console.error('Error al agregar participante:', error);
      res.status(500).json({ error: 'Error al agregar participante' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
