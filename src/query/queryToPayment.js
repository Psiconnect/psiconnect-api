import PAYMENT from "../models/PAYMENTS.js";
import PROFESSIONAL from "../models/PROFESSIONAL.js";
import USERS from "../models/USERS.js";

export async function createPayment(body) {
  const newPayment = await PAYMENT.create(body);
  return newPayment;
}

export async function getAllPayment() {
  const payments = await PAYMENT.findAll({
    include: [
        {
          model: USERS,
        },
        { model: PROFESSIONAL },
      ],
});
  return payments;
}

export async function getAllPaymentByProfessional(professionalId) {
  const payments = await PAYMENT.findAll({ where: { professionalId } });
  return payments;
}
export async function getResultAllPaymentByProfessional(professionalId) {
  const payments = await PAYMENT.findAll({ where: { professionalId } });
  const arr=payments.map(a=>a.price)
  const resultFinal= arr.map(Number).reduce((total,num)=> total+num)
  return resultFinal
}
export async function getAllPaymentByUser(userId) {
  const payments = await PAYMENT.findAll({ where: { userId } });
  return payments;
}
export async function getResultAllPaymentByUser(userId) {
  const payments = await PAYMENT.findAll({ where: { userId } });
  return payments;
}

export async function getPaymentById(id) {
  const pay = await PAYMENT.findOne({ where: {id:id} });
  return pay;
}
