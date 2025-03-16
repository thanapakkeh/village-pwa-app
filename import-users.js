const admin = require("firebase-admin");
const fs = require("fs");
const csv = require("csv-parser");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// อ่านข้อมูลจาก CSV
const results = [];

fs.createReadStream("village_users_passwords_123456.csv")
  .pipe(csv())
  .on("data", (data) => {
    results.push(data);
  })
  .on("end", async () => {
    for (const user of results) {
      const id = user.id?.trim();
      const password = user.password?.trim();
      const email = `${id}@village.local`;

      try {
        await admin.auth().createUser({
          email,
          password,
        });
        console.log(`✅ เพิ่มผู้ใช้ ${email}`);
      } catch (err) {
        console.error(`❌ ${email} ไม่สำเร็จ: ${err.code || err.message}`);
      }
    }

    console.log("✅ เสร็จสิ้นการนำเข้าผู้ใช้ทั้งหมด");
  });
