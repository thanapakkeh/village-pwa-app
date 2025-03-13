import { app } from "./firebase-config.js";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore(app);

async function searchByHouseNumber(houseNumber) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  try {
    const res = await fetch("data.json");
    const data = await res.json();
    
    const match = data.find(d => d["บ้านเลขที่"] === houseNumber);
    if (!match) {
      resultDiv.innerHTML = `<p style="color:red;">ไม่พบข้อมูลบ้านเลขที่นี้</p>`;
      return;
    }

    resultDiv.innerHTML = `
      <div style="background:white;border-radius:8px;padding:15px;box-shadow:0 0 10px rgba(0,0,0,0.05);text-align:left;">
        <p>📅 <strong>ช่วงค้างชำระ:</strong> ${match["ช่วงค้างชำระ"]}</p>
        <p>💰 <strong>ยอดรวมค้างชำระ:</strong> ${match["ยอดรวมค้างชำระ"]} บาท</p>
        ${match["ลิงก์ใบแจ้งหนี้"] ? `<a href="${match["ลิงก์ใบแจ้งหนี้"]}" target="_blank" style="display:inline-block;margin-top:10px;padding:10px 15px;background:#10b981;color:white;border-radius:5px;text-decoration:none;">📥 ดาวน์โหลดใบแจ้งหนี้</a>` : ""}
      </div>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p style="color:red;">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>`;
    console.error("เกิดข้อผิดพลาด:", error);
  }
}

      resultDiv.innerHTML = `
        <div style="background:white;border-radius:8px;padding:15px;box-shadow:0 0 10px rgba(0,0,0,0.05);text-align:left;">
          <p>🏠 <strong>บ้านเลขที่:</strong> ${houseNumber}</p>
          <p>🗃️ <strong>ยอดค้างชำระ:</strong> ${firestoreData.outstanding}</p>
          <p>📆 <strong>ช่วงค้างชำระ:</strong> ${firestoreData.period}</p>
        </div>
      `;
    } else {
      resultDiv.innerHTML = `<p style="color:red;">ไม่พบข้อมูลบ้านเลขที่นี้</p>`;
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    resultDiv.innerHTML = `<p style="color:red;">เกิดข้อผิดพลาดในการดึงข้อมูล</p>`;
  }
}

window.searchByHouseNumber = searchByHouseNumber;
