function formatThaiDate(dateString) {
  try {
    const d = new Date(dateString);
    const monthNames = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
                        "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    const day = d.getDate();
    const month = monthNames[d.getMonth()];
    const year = d.getFullYear() + 543 - 2500;
    return `${day} ${month} ${year}`;
  } catch {
    return dateString || "-";
  }
}

window.searchByHouseNumber = async function (houseNumber) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  try {
    // ✅ โหลดข้อมูลจาก 2 Web App
    const [dueRes, clearRes] = await Promise.all([
      fetch("https://script.google.com/macros/s/AKfycbzymSwxn-V8f9v7iJuEAv9kPLi71Ln1lXSAXY-Psp9n6LVcmAmipLMieud93IrbpKVyrg/exec"),
      fetch("https://script.google.com/macros/s/AKfycbwj442jIMktDBpnzpeIKNbhRqtsQN1M3UIB2im1WUIIFqxN1iMGORWXNdy1djQ9zoGPEg/exec")
    ]);

    const dueData = await dueRes.json();
    const clearData = await clearRes.json();

    // ✅ รวมข้อมูลโดยให้ "ค้างชำระ" ทับ "ไม่ค้างชำระ"
    const houseMap = {};
    clearData.forEach(item => {
      houseMap[item["บ้านเลขที่"]] = item;
    });
    dueData.forEach(item => {
      houseMap[item["บ้านเลขที่"]] = item;
    });

    const match = houseMap[houseNumber];

    if (match) {
      const status = (match["สถานะ"] || "").trim();

      if (status.includes("มียอด")) {
        // ✅ มีค้างชำระ
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
              📅 อัปเดตล่าสุด: ${formatThaiDate(match["อัปเดตล่าสุด"])}
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
        // ✅ ไม่ค้างชำระ
        resultDiv.innerHTML = `
          <div style="background:white;border-radius:12px;padding:20px;box-shadow:0 4px 12px rgba(0,0,0,0.06);text-align:left;">
            <p>✅ <strong>ไม่มีค้างชำระ</strong></p>
            <p>💰 <strong>ยอดค้างชำระ:</strong> 0 บาท</p>
            <p style="font-size:0.9rem;color:#666;margin-top:8px;">
              📅 อัปเดตล่าสุด: ${formatThaiDate(match["อัปเดตล่าสุด"])}
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
      resultDiv.innerHTML = `<p style="color:red;">❌ ไม่พบข้อมูลบ้านเลขที่ ${houseNumber}</p>`;
    }

  } catch (error) {
    console.error("❌ เกิดข้อผิดพลาด:", error);
    resultDiv.innerHTML = `<p style="color:red;">❌ เกิดข้อผิดพลาดในการโหลดข้อมูล</p>`;
  }
};

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

window.logout = function () {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
};
