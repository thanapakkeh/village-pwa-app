import { app } from "./firebase-config.js";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore(app);

async function searchByHouseNumber(houseNumber) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  try {
    // ดึงข้อมูลจาก Firestore
    const docRef = doc(db, "houses", houseNumber);
    const docSnap = await getDoc(docRef);

    // ดึงข้อมูลจาก JSON
    const response = await fetch("data.json");
    const jsonData = await response.json();
    const jsonMatch = jsonData.find(d => d["บ้านเลขที่"] === houseNumber);

    // รวมข้อมูลจาก Firestore และ JSON
    if (docSnap.exists() && jsonMatch) {
      const firestoreData = docSnap.data();

      resultDiv.innerHTML = `
        <div style="background:white;border-radius:8px;padding:15px;box-shadow:0 0 10px rgba(0,0,0,0.05);text-align:left;">
          <p>🏠 <strong>บ้านเลขที่:</strong> ${houseNumber}</p>
          <p>📅 <strong>ช่วงค้างชำระ (JSON):</strong> ${jsonMatch["ช่วงค้างชำระ"]}</p>
          <p>💰 <strong>ยอดรวมค้างชำระ (JSON):</strong> ${jsonMatch["ยอดรวมค้างชำระ"]} บาท</p>
          <p>🗃️ <strong>ยอดค้างชำระ (Firestore):</strong> ${firestoreData.outstanding}</p>
          <p>📆 <strong>ช่วงค้างชำระ (Firestore):</strong> ${firestoreData.period}</p>
          ${jsonMatch["ลิงก์ใบแจ้งหนี้"] ? `<a href="${jsonMatch["ลิงก์ใบแจ้งหนี้"]}" target="_blank" style="display:inline-block;margin-top:10px;padding:10px 15px;background:#10b981;color:white;border-radius:5px;text-decoration:none;">📥 ดาวน์โหลดใบแจ้งหนี้</a>` : ""}
        </div>
      `;
    } else if (jsonMatch) {
      // เจอเฉพาะใน JSON
      resultDiv.innerHTML = `
        <div style="background:white;border-radius:8px;padding:15px;box-shadow:0 0 10px rgba(0,0,0,0.05);text-align:left;">
          <p>🏠 <strong>บ้านเลขที่:</strong> ${houseNumber}</p>
          <p>📅 <strong>ช่วงค้างชำระ:</strong> ${jsonMatch["ช่วงค้างชำระ"]}</p>
          <p>💰 <strong>ยอดรวมค้างชำระ:</strong> ${jsonMatch["ยอดรวมค้างชำระ"]} บาท</p>
          ${jsonMatch["ลิงก์ใบแจ้งหนี้"] ? `<a href="${jsonMatch["ลิงก์ใบแจ้งหนี้"]}" target="_blank" style="display:inline-block;margin-top:10px;padding:10px 15px;background:#10b981;color:white;border-radius:5px;text-decoration:none;">📥 ดาวน์โหลดใบแจ้งหนี้</a>` : ""}
        </div>
      `;
    } else if (docSnap.exists()) {
      // เจอเฉพาะใน Firestore
      const firestoreData = docSnap.data();

      resultDiv.innerHTML = `
        <div style="background:white;border-radius:8px;padding:15px;box-shadow:0 0 10px rgba(0,0,0,0.05);text-align:left;">
          <p>🏠 <strong>บ้านเลขที่:</strong> ${houseNumber}</p>
          <p>🗃️ <strong>ยอดค้างชำระ:</strong> ${firestoreData.outstanding}</p>
          <p>📆 <strong>ช่วงค้างชำระ:</strong> ${firestoreData.period}</p>
        </div>
      `;
    } else {
      // ไม่เจอข้อมูลเลย
      resultDiv.innerHTML = `<p style="color:red;">ไม่พบข้อมูลบ้านเลขที่นี้</p>`;
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    resultDiv.innerHTML = `<p style="color:red;">เกิดข้อผิดพลาดในการดึงข้อมูล</p>`;
  }
}

window.searchByHouseNumber = searchByHouseNumber;
