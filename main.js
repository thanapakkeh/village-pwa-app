
window.searchByHouseNumber = async function (houseNumber) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  try {
    const res = await fetch("users_full_all_399_1_to_278.json");
    const data = await res.json();

    const match = data.find(d => d["บ้านเลขที่"] === houseNumber);

    if (!match) {
      resultDiv.innerHTML = `<p style="color:red;">❌ ไม่พบข้อมูลบ้านเลขที่ ${houseNumber}</p>`;
      return;
    }

    const period = match["ช่วงค้างชำระ"] || "ไม่มียอดค้างชำระ";
    const total = match["ยอดรวมค้างชำระ"] ?? 0;
    const billLink = match["ลิงก์ใบแจ้งหนี้"];
    const updated = match["อัปเดตล่าสุด"] || "28 ก.พ. 68";

    resultDiv.innerHTML = \`
      <div style="background:white;border-radius:8px;padding:15px;box-shadow:0 0 10px rgba(0,0,0,0.05);text-align:left;">
        <p>📅 <strong>ช่วงค้างชำระ:</strong> \${period}</p>
        <p>💰 <strong>ยอดรวมค้างชำระ:</strong> \${total} บาท</p>
        <p style="font-size:0.9rem;color:#666;margin-top:5px;">📅 อัปเดตล่าสุด: \${updated}</p>
        \${billLink ? \`
        <a href="\${billLink}" target="_blank"
           style="display:inline-block;margin-top:10px;padding:10px 15px;
           background:#10b981;color:white;border-radius:5px;text-decoration:none;">
           📥 ดาวน์โหลดใบแจ้งหนี้</a><br/>\` : ""}
        <a href="https://line.me/ti/g2/ZDauyxRug_VVvy_dd5uQyG8vZTed7Ix3qrhb6A"
           target="_blank"
           style="display:inline-block;margin-top:10px;padding:10px 15px;
           background:#3b82f6;color:white;border-radius:5px;text-decoration:none;">
           📤 แจ้งสลิปการโอน
        </a>
      </div>
    \`;
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
  document.getElementById("house-id").innerText = \`🏠 บ้านเลขที่: \${houseId}\`;
  searchByHouseNumber(houseId);
};

window.logout = function () {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
};
