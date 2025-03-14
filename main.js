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
        <div style="background:white;border-radius:8px;padding:15px;box-shadow:0 0 10px rgba(0,0,0,0.05);text-align:left;">
          <p>📅 <strong>ช่วงค้างชำระ:</strong> ${matchWithData["ช่วงค้างชำระ"]}</p>
          <p>💰 <strong>ยอดรวมค้างชำระ:</strong> ${matchWithData["ยอดรวมค้างชำระ"]} บาท</p>
          <p style="font-size:0.9rem;color:#666;margin-top:5px;">📅 อัปเดตล่าสุด: ${matchWithData["อัปเดตล่าสุด"]}</p>
          ${
            matchWithData["ลิงก์ใบแจ้งหนี้"]
              ? `<a href="${matchWithData["ลิงก์ใบแจ้งหนี้"]}" target="_blank"
                    style="display:inline-block;margin-top:10px;padding:10px 15px;
                    background:#10b981;color:white;border-radius:5px;text-decoration:none;">
                    📥 ดาวน์โหลดใบแจ้งหนี้</a><br/>`
              : ""
          }
          <a href="https://line.me/ti/g2/ZDauyxRug_VVvy_dd5uQyG8vZTed7Ix3qrhb6A"
            target="_blank"
            style="display:inline-block;margin-top:10px;padding:10px 15px;
            background:#3b82f6;color:white;border-radius:5px;text-decoration:none;">
            📤 แจ้งสลิปการโอน
          </a>
        </div>
      `;
    } else if (matchWithoutData) {
      resultDiv.innerHTML = `
        <div style="background:white;border-radius:8px;padding:15px;box-shadow:0 0 10px rgba(0,0,0,0.05);text-align:left;">
          <p>✅ <strong>ไม่มีค้างชำระ</strong></p>
          <p>💰 <strong>ยอดรวมค้างชำระ:</strong> 0 บาท</p>
          <p style="font-size:0.9rem;color:#666;margin-top:5px;">📅 อัปเดตล่าสุด: 28 ก.พ. 68</p>
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
