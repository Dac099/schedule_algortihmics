const functions = require('firebase-functions');
const admin = require('firebase-admin');
const twilio = require('twilio');
const phone = require('phone');

admin.initializeApp();

const accountSid = 'AC669229b2f4c305758454aefd57593014';
const authToken = '5856a9818d8694726dac0d5cf185e060';
const client = twilio(accountSid, authToken);

exports.sendWhatsAppOnDocumentCreate = functions.firestore
  .document('trial_lessons/{lessonId}')
  .onCreate(async (snapshot, context) => {
    const newDocumentData = snapshot.data();
    const phoneNumber = newDocumentData.parent_phone;
    const lesson_name = newDocumentData.lesson;
    const lesson_date = newDocumentData.date;
    const lesson_start = newDocumentData.hours[0];
    const phoneFormat164 = phone.phone(phoneNumber, {
      country: "MEX"
    }).phoneNumber;

    const message = {
      body: `Tu cita para la clase de ${lesson_name} a quedado agendada para el día ${lesson_date} a las ${lesson_start} horas.`,
      from: 'whatsapp:+15307974758',
      to: `whatsapp:${phoneFormat164}`
    };

    return client.messages.create(message)
      .then(() => {
        console.log('Mensaje de WhatsApp enviado con éxito.');
        return null;
      })
      .catch((error) => {
        console.error('Error al enviar el mensaje de WhatsApp:', error);
        console.error(phoneFormat164);
        return null;
      });
  });
