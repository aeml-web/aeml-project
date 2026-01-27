#!/usr/bin/env node
/**
 * ================================================
 * FIRESTORE IMPORT SCRIPT
 * ================================================
 * 
 * CARA PAKAI:
 * 
 * 1. Install dependency:
 *    npm install firebase-admin
 * 
 * 2. Download Service Account Key:
 *    - Buka Firebase Console → Project Settings → Service Accounts
 *    - Klik "Generate new private key"
 *    - Simpan sebagai "serviceAccountKey.json" di folder yang sama
 * 
 * 3. Jalankan script:
 *    node import_to_firestore.js
 * 
 * ================================================
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Cek apakah service account key ada
const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');

if (!fs.existsSync(serviceAccountPath)) {
  console.error('\n❌ ERROR: serviceAccountKey.json tidak ditemukan!');
  console.error('\nCara mendapatkan service account key:');
  console.error('1. Buka https://console.firebase.google.com');
  console.error('2. Pilih project kamu');
  console.error('3. Klik ⚙️ Settings → Project settings');
  console.error('4. Pilih tab "Service accounts"');
  console.error('5. Klik "Generate new private key"');
  console.error('6. Simpan file sebagai "serviceAccountKey.json" di folder ini\n');
  process.exit(1);
}

// Initialize Firebase Admin
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log('\n🔥 Firebase Admin initialized successfully!');
console.log(`   Project: ${serviceAccount.project_id}\n`);

const db = admin.firestore();

async function importCollection(collectionName, filePath) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const entries = Object.entries(data);
  let count = 0;
  
  // Use batched writes for efficiency
  let batch = db.batch();
  let batchCount = 0;
  
  for (const [docId, docData] of entries) {
    // Convert timestamp objects back to Firestore Timestamps
    const processedData = processTimestamps(docData);
    const ref = db.collection(collectionName).doc(docId);
    batch.set(ref, processedData);
    count++;
    batchCount++;
    
    // Firestore batch limit is 500
    if (batchCount >= 500) {
      await batch.commit();
      batch = db.batch();
      batchCount = 0;
    }
  }
  
  // Commit remaining
  if (batchCount > 0) {
    await batch.commit();
  }
  
  console.log(`✓ ${collectionName}: ${count} documents imported`);
  return count;
}

function processTimestamps(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  
  if (obj._seconds !== undefined && obj._nanoseconds !== undefined) {
    return new admin.firestore.Timestamp(obj._seconds, obj._nanoseconds);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(processTimestamps);
  }
  
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = processTimestamps(value);
  }
  return result;
}

async function main() {
  console.log('📦 Starting import process...\n');
  
  const collections = [
    'AemlAdminQuestions',
    'AemlAnswers', 
    'AemlPrograms',
    'AemlUsers',
    'PolaPrograms',
    'Programs',
    'Users'
  ];
  
  let totalDocs = 0;
  let successCollections = 0;
  
  for (const collection of collections) {
    const filePath = path.join(__dirname, `${collection}.json`);
    if (fs.existsSync(filePath)) {
      const count = await importCollection(collection, filePath);
      totalDocs += count;
      successCollections++;
    } else {
      console.log(`⚠️  ${collection}.json tidak ditemukan, skip...`);
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('✅ IMPORT SELESAI!');
  console.log(`   Collections: ${successCollections}`);
  console.log(`   Total documents: ${totalDocs}`);
  console.log('='.repeat(50));
  console.log('\n🔗 Buka Firebase Console untuk melihat data:');
  console.log(`   https://console.firebase.google.com/project/${serviceAccount.project_id}/firestore\n`);
  
  process.exit(0);
}

main().catch((error) => {
  console.error('\n❌ ERROR:', error.message);
  process.exit(1);
});
