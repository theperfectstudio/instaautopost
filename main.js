const { postToInstagram } = require('./post-to-instagram');
const { generateCaption } = require('./captionGenerator');
const { getFirestore } = require('firebase-admin/firestore');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();

async function main() {
  const snapshot = await db.collection('properties')
    .where('postedToInstagram', '!=', true)
    .limit(1)
    .get();

  if (snapshot.empty) {
    console.log('✅ No new properties to post.');
    return;
  }

  for (const doc of snapshot.docs) {
    const data = doc.data();
    const images = data.imageUrls || [data.imageUrl];
    const caption = generateCaption(data);

    await postToInstagram(images, caption);  // Puppeteer-based real posting

    await doc.ref.update({ postedToInstagram: true });
    console.log(`✅ Marked posted: ${doc.id}`);
  }
}

main().catch(console.error);
