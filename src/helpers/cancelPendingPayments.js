import PAYMENT from "../models/PAYMENTS.js";

export default async function cancelPendingPayments() {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  
    // Busca los pagos pendientes creados hace más de 24 horas
    const pendingPayments = await PAYMENT.findAll({
      where: {
        status: 'pendiente',
        created_at: {
          [Sequelize.Op.lte]: twentyFourHoursAgo,
        },
      },
    });
  
    // Actualiza el estado de los pagos a "cancelado"
    await Promise.all(
      pendingPayments.map(async (payment) => {
        payment.status = 'cancelado';
        await payment.save();
      })
    );
  }