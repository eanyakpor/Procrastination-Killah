const admin = require('firebase-admin');
const serviceAccount = require('./procrastination-killah-firebase-adminsdk-d0uav-56e96c5979.json'); // Adjust the path as needed

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: serviceAccount.storageBucket,
});

const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();

module.exports = { db, auth, storage };
