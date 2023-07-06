/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.createAlertOnTrialLessonCreate = functions.firestore
  .document('trial_lessons/{trialLessonId}')
  .onCreate((snapshot, context) => {
    const newTrialLesson = snapshot.data();

    // Lógica para crear la alerta en Firebase
    const alertData = {
      message: `Nuevo documento creado en la colección trial_lessons: ${context.params.trialLessonId}`,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    return admin.firestore().collection('alerts').add(alertData);
  });
