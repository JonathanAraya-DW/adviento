import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { id } = req.query;

    try {
      // 1. Verificar si la sesión existe
      const session = await prisma.session.findUnique({
        where: { id: String(id) },
        include: { participants: true },
      });

      if (!session) {
        return res.status(404).json({ error: 'Sesión no encontrada' });
      }

      if (session.participants.length < 2) {
        return res.status(400).json({
          error:
            'Se necesitan al menos 2 participantes para realizar el sorteo',
        });
      }

      if (session.status !== 'open') {
        return res
          .status(400)
          .json({ error: 'La sesión ya fue sorteada o está cerrada' });
      }

      // 2. Hacer el sorteo
      const participants = [...session.participants];
      const shuffled = participants.sort(() => Math.random() - 0.5);

      for (let i = 0; i < shuffled.length; i++) {
        const current = shuffled[i];
        const next = shuffled[(i + 1) % shuffled.length]; // Circular: el último asigna al primero

        await prisma.participant.update({
          where: { id: current.id },
          data: { assignedTo: next.id },
        });
      }

      // 3. Actualizar el estado de la sesión
      await prisma.session.update({
        where: { id: String(id) },
        data: { status: 'sorted' },
      });

      res.status(200).json({ message: 'Sorteo realizado exitosamente' });
    } catch (error) {
      console.error('Error al realizar el sorteo:', error);
      res.status(500).json({ error: 'Error al realizar el sorteo' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
