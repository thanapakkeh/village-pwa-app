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

    <p>📅 <strong>ช่วงค้างชำระ:</strong> ${match["ช่วงค้างชำระ"]}</p>
    <p>💰 <strong>ยอดรวมค้างชำระ:</strong> ${match["ยอดรวมค้างชำระ"]} บาท</p>
    <p style="font-size:0.9rem;color:#666;margin-top:5px;">📅 อัปเดตล่าสุด: ${match["อัปเดตล่าสุด"]}</p>

   <div style="display: flex; justify-content: center; margin-top: 15px;">
  <a href="payment.html"
     style="
        background: #6366f1;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: bold;
        font-size: 1rem;
        display: inline-block;
        text-align: center;
        min-width: 200px;">
     💳 ชำระค่าส่วนกลาง
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
