const { db } = require('../firebase'); // Adjust path if needed

async function uploadTestText() {
  try {
    const docRef = db.collection('testCollection').doc('testDoc'); // Change collection/doc names as needed
    await docRef.set({ text: 'Hello, Firebase!' });
    console.log('Text uploaded successfully.');
  } catch (error) {
    console.error('Error uploading text:', error);
  }
}

// Run the test function
uploadTestText();