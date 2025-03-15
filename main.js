// ฟังก์ชันโหลดข้อมูลจาก Google Sheets (ผ่าน opensheet.elk.sh)
window.searchByHouseNumber = async function (houseNumber) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  try {
    // ดึงข้อมูลจาก 2 ชีต
    const [dueRes, clearRes] = await Promise.all([
      fetch("https://opensheet.elk.sh/18GPxoGr7cZh1-MofAlSlHUPvZdq0RLDEMUiY7EP4LCo/ค้างชำระ"),
      fetch("https://opensheet.elk.sh/18GPxoGr7cZh1-MofAlSlHUPvZdq0RLDEMUiY7EP4LCo/ไม่ค้างชำระ")
    ]);

    const dueData = await dueRes.json();
    const clearData = await clearRes.json();

    // รวมข้อมูลโดยให้ "ค้างชำระ" ทับ "ไม่ค้างชำระ" ถ้าบ้านเลขที่ซ้ำ
    const houseMap = {};

    clearData.forEach(item => {
      houseMap[item["บ้านเลขที่"]] = item;
    });

    dueData.forEach(item => {
      houseMap[item["บ้านเลขที่"]] = item; // ทับด้วยข้อมูลค้างชำระ
    });

    // ค้นหาข้อมูลบ้านที่ต้องการ
    const match = houseMap[houseNumber];

    if (match) {
      const status = match["สถานะ"]?.trim();

      if (status === "มียอดชำระ") {
        // กรณีค้างชำระ
        resultDiv.innerHTML = `
          <div style="background:white;border-radius:12px;padding:20px;box-shadow:0 4px 12px rgba(0,0,0,0.06);text-align:left;">
            <p style="font-size: 1.2rem;"><strong>📅 ช่วงค้างชำระ:</strong> ${match["ช่วงค้างชำระ"] || "-"}</p>
            
            <div style="margin: 20px 0 10px;">
              <p style="font-size: 1.1rem; font-weight: bold; color:#111; margin-bottom: 5px;">💰 ยอดค้างชำระ</p>
              <p style="font-size: 1.8rem; font-weight: bold; color:#dc2626; margin: 0;">
                ${match["ยอดค้างชำระ"] || 0} บาท
              </p>
            </div>

            <p style="font-size:0.95rem;color:#666;margin-top:10px;">
              📅 อัปเดตล่าสุด: ${match["อัปเดตล่าสุด"] || "-"}
            </p>

            <div style="margin-top:25px; display:flex; flex-direction:column; gap:12px;">
              <a href="payment.html"
                style="background:#10b981;color:white;padding:12px;border-radius:8px;
                      text-align:center;text-decoration:none;font-weight:bold;">
                💳 ชำระค่าส่วนกลาง
              </a>
              <a href="contact.html"
                style="background:#3b82f6;color:white;padding:12px;border-radius:8px;
                      text-align:center;text-decoration:none;font-weight:bold;">
                📞 ติดต่อเจ้าหน้าที่
              </a>
            </div>
          </div>
        `;
      } else {
        // กรณีไม่ค้างชำระ
        resultDiv.innerHTML = `
          <div style="background:white;border-radius:12px;padding:20px;box-shadow:0 4px 12px rgba(0,0,0,0.06);text-align:left;">
            <p>✅ <strong>ไม่มีค้างชำระ</strong></p>
            <p>💰 <strong>ยอดค้างชำระ:</strong> 0 บาท</p>
            <p style="font-size:0.9rem;color:#666;margin-top:8px;">
              📅 อัปเดตล่าสุด: ${match["อัปเดตล่าสุด"] || "-"}
            </p>

            <div style="margin-top:25px;">
              <a href="contact.html"
                style="background:#3b82f6;color:white;padding:12px;border-radius:8px;
                      text-align:center;text-decoration:none;font-weight:bold;display:block;">
                📞 ติดต่อเจ้าหน้าที่
              </a>
            </div>
          </div>
        `;
      }
    } else {
      // ไม่พบบ้านเลขที่
      resultDiv.innerHTML = `<p style="color:red;">❌ ไม่พบข้อมูลบ้านเลขที่ ${houseNumber}</p>`;
    }

  } catch (error) {
    console.error("❌ เกิดข้อผิดพลาด:", error);
    resultDiv.innerHTML = `<p style="color:red;">❌ เกิดข้อผิดพลาดในการโหลดข้อมูล</p>`;
  }
};

// ฟังก์ชันแสดงข้อมูลของผู้ใช้เมื่อเข้าสู่ระบบ
window.showUserData = function () {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const houseId = user.house;
  document.getElementById("house-id").innerText = `🏠 บ้านเลขที่: ${houseId}`;
  searchByHouseNumber(houseId);
};

// ฟังก์ชันออกจากระบบ
window.logout = function () {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
};
