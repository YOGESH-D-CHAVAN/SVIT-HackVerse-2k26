require('dotenv').config();
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const Participant = require('../models/Participant');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function migrate() {
  console.log('--- Starting Cloudinary Migration ---');
  
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Find all participants with local upload paths
    const legacyParticipants = await Participant.find({
      paymentProof: { $regex: /uploads/i }
    });

    console.log(`🔍 Found ${legacyParticipants.length} legacy registrations to migrate.`);

    let successCount = 0;
    let failCount = 0;
    let skipCount = 0;

    for (const participant of legacyParticipants) {
      const filename = participant.paymentProof.replace('/uploads/', '');
      const localPath = path.join(__dirname, '..', 'uploads', filename);

      console.log(`\nProcessing: ${participant.teamName}`);
      
      if (!fs.existsSync(localPath)) {
        console.warn(`⚠️  File not found locally: ${localPath}. Skipping...`);
        skipCount++;
        continue;
      }

      try {
        console.log(`⬆️  Uploading ${filename} to Cloudinary...`);
        const result = await cloudinary.uploader.upload(localPath, {
          folder: 'hackverse_payments',
          public_id: filename.split('.')[0]
        });

        console.log(`✅ Uploaded! URL: ${result.secure_url}`);

        // Update database
        participant.paymentProof = result.secure_url;
        await participant.save();
        console.log(`💾 Database record updated.`);
        successCount++;

      } catch (error) {
        console.error(`❌ Failed to migrate ${participant.teamName}:`, error.message);
        failCount++;
      }
    }

    console.log('\n--- Migration Summary ---');
    console.log(`Total Found: ${legacyParticipants.length}`);
    console.log(`Successfully Migrated: ${successCount}`);
    console.log(`Skipped (File not found): ${skipCount}`);
    console.log(`Failed (Upload error): ${failCount}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration Critical Error:', error);
    process.exit(1);
  }
}

migrate();
