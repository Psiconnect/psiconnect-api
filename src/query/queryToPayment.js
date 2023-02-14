import PAYMENT from "../models/PAYMENTS.js";

export async function createPayment(body) {
  const newPayment = await PAYMENT.create(body);
  return newPayment;
}

export async function getAllPayment() {
  const payments = await PAYMENT.findAll();
  return payments;
}

export async function getAllPaymentByProfessional(professionalId) {
  const payments = await PAYMENT.findAll({ where: { professionalId } });
  return payments;
}
export async function getAllPaymentByUser(userId) {
  const payments = await PAYMENT.findAll({ where: { userId } });
  return payments;
}

export async function getPaymentById(id) {
  const pay = await PAYMENT.findOne({ where: {id:id} });
  return pay;
}
