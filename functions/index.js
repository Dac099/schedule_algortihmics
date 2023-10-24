const functions = require('firebase-functions');
const admin = require('firebase-admin');
const twilio = require('twilio');
const phone = require('phone');

admin.initializeApp();

const accountSid = 'AC212ddc140e6e6ab2c859c5cc676ca384';
const authToken = 'a424a3d8b09037c4c59efcdeda9cdace';
const client = twilio(accountSid, authToken);

exports.sendWhatsAppOnDocumentCreate = functions.firestore
  .document('trial_lessons/{lessonId}')
  .onCreate(async (snapshot, context) => {
    const newDocumentData = snapshot.data();
    const phoneNumber = newDocumentData.parent_phone;
    const lesson_name = newDocumentData.lesson.toLowerCase();
    const lesson_date = newDocumentData.date.toLowerCase();
    const lesson_start = newDocumentData.hours[0];
    const phoneFormat164 = phone.phone(phoneNumber, {
      country: "MEX"
    }).phoneNumber;

    const msg_body = `Tu cita para la clase de ${lesson_name} a quedado agendada para el día ${lesson_date} a las ${lesson_start} horas. `;

    const message = {
      body: msg_body,
      from: 'whatsapp:+15307974758',
      to: `whatsapp:${phoneFormat164}`
    };

    return client.messages.create(message)
      .then(() => {
        console.log('Mensaje enviado: ', msg_body);
        return null;
      })
      .catch((error) => {
        console.error('Error enviando mensaje');
        console.log(error.message);
        return null;
      });
  });
