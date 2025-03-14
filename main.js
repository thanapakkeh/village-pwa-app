// โหลดข้อมูลจาก data.json และแสดงผลตามบ้านเลขที่
window.searchByHouseNumber = async function (houseNumber) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  try {
    const res = await fetch("data.json");
    const data = await res.json();

    const match = data.find(d => d["บ้านเลขที่"] === houseNumber);

    if (!match) {
      resultDiv.innerHTML = `<p style="color:red;">❌ ไม่พบข้อมูลบ้านเลขที่ ${houseNumber}</p>`;
      return;
    }

    const ยอดรวม = match["ยอดรวมค้างชำระ"];
    const ไม่มีค้าง = ยอดรวม === 0 || match["ช่วงค้างชำระ"] === "ไม่มีค้างชำระ";

    resultDiv.innerHTML = `
      <div style="background:white;border-radius:8px;padding:15px;box-shadow:0 0 10px rgba(0,0,0,0.05);text-align:left;">
        <p>📅 <strong>ช่วงค้างชำระ:</strong> ${match["ช่วงค้างชำระ"] || "-"}</p>
        <p>💰 <strong>ยอดรวมค้างชำระ:</strong> ${ยอดรวม} บาท</p>
        <p style="font-size:0.9rem;color:#666;margin-top:5px;">📅 อัปเดตล่าสุด: ${match["อัปเดตล่าสุด"] || "-"}</p>
        ${
          !ไม่มีค้าง && match["ลิงก์ใบแจ้งหนี้"]
            ? `<a href="${match["ลิงก์ใบแจ้งหนี้"]}" target="_blank"
                  style="display:inline-block;margin-top:10px;padding:10px 15px;
                  background:#10b981;color:white;border-radius:5px;text-decoration:none;">
                  📥 ดาวน์โหลดใบแจ้งหนี้</a><br/>`
            : ""
        }
        ${
          !ไม่มีค้าง
            ? `<a href="https://line.me/ti/g2/ZDauyxRug_VVvy_dd5uQyG8vZTed7Ix3qrhb6A"
               target="_blank"
               style="display:inline-block;margin-top:10px;padding:10px 15px;
               background:#3b82f6;color:white;border-radius:5px;text-decoration:none;">
               📤 แจ้งสลิปการโอน
             </a>`
            : `<p style="color:green;margin-top:10px;">✅ ไม่มีค้างชำระ</p>`
        }
      </div>
    `;
  } catch (error) {
    console.error("❌ เกิดข้อผิดพลาด:", error);
    resultDiv.innerHTML = `<p style="color:red;">❌ เกิดข้อผิดพลาดในการโหลดข้อมูล</p>`;
  }
};

// ดึงข้อมูลผู้ใช้จาก localStorage แล้วเรียกดูข้อมูลบ้านของเขา
window.showUserData = function () {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user || !user.house) {
    window.location.href = "login.html";
    return;
  }

  const houseId = user.house;
  document.getElementById("house-id").innerText = `🏠 บ้านเลขที่: ${houseId}`;
  searchByHouseNumber(houseId);
};

// ออกจากระบบ
window.logout = function () {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
};
