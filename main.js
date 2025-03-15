window.searchByHouseNumber = async function (houseNumber) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  try {
    const [withDataRes, withoutDataRes] = await Promise.all([
      fetch("houses_with_data.json"),
      fetch("houses_without_data.json")
    ]);

    const [withData, withoutData] = await Promise.all([
      withDataRes.json(),
      withoutDataRes.json()
    ]);

    const matchWithData = withData.find(d => d["บ้านเลขที่"] === houseNumber);
    const matchWithoutData = withoutData.find(d => d["บ้านเลขที่"] === houseNumber);

    if (matchWithData) {
      resultDiv.innerHTML = `
        <div style="background:white;border-radius:12px;padding:20px;box-shadow:0 4px 12px rgba(0,0,0,0.06);text-align:left;">
          <p style="font-size: 1.2rem;"><strong>📅 ช่วงค้างชำระ:</strong> ${matchWithData["ช่วงค้างชำระ"]}</p>
          <p style="font-size: 1.3rem; font-weight: bold; color:#dc2626;">💰 ยอดรวมค้างชำระ: ${matchWithData["ยอดรวมค้างชำระ"]} บาท</p>
          <p style="font-size:0.95rem;color:#666;margin-top:8px;">📅 อัปเดตล่าสุด: ${matchWithData["อัปเดตล่าสุด"]}</p>

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
    } else if (matchWithoutData) {
      resultDiv.innerHTML = `
        <div style="background:white;border-radius:12px;padding:20px;box-shadow:0 4px 12px rgba(0,0,0,0.06);text-align:left;font-size:1rem;line-height:1.6;">
          <p>✅ <strong>ไม่มีค้างชำระ</strong></p>
          <p>💰 <strong>ยอดรวมค้างชำระ:</strong> 0 บาท</p>
          <p style="font-size:0.9rem;color:#666;margin-top:8px;">📅 อัปเดตล่าสุด: 28 ก.พ. 68</p>

          <div style="margin-top:25px;">
            <a href="contact.html"
              style="background:#3b82f6;color:white;padding:12px;border-radius:8px;
                    text-align:center;text-decoration:none;font-weight:bold;display:block;">
              📞 ติดต่อเจ้าหน้าที่
            </a>
          </div>
        </div>
      `;
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

