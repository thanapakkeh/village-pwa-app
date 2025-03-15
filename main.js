window.searchByHouseNumber = async function (houseNumber) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbyEH7caAh9b3Iz5onXrIBtZiCUbv9KZ-2-vyagUr-88jmceLV3c-hFkVQHHAVQjIYkInA/exec");
    const data = await response.json();

    const match = data.find(d => d["บ้านเลขที่"] === houseNumber);

    if (match) {
      resultDiv.innerHTML = `
        <div style="background:white;border-radius:12px;padding:20px;box-shadow:0 4px 12px rgba(0,0,0,0.06);text-align:left;">
          <p style="font-size: 1.2rem;"><strong>📅 ช่วงค้างชำระ:</strong> ${match["ช่วงค้างชำระ"]}</p>

          <div style="margin: 20px 0 10px;">
            <p style="font-size: 1.1rem; font-weight: bold; color:#111; margin-bottom: 5px;">💰 ยอดรวมค้างชำระ</p>
            <p style="font-size: 1.8rem; font-weight: bold; color:#dc2626; margin: 0;">${match["ยอดรวมค้างชำระ"]} บาท</p>
          </div>

          <p style="font-size:0.95rem;color:#666;margin-top:10px;">📅 อัปเดตล่าสุด: ${match["อัปเดตล่าสุด"]}</p>

          <div style="margin-top:25px; display:flex; flex-direction:column; gap:12px;">
            <a href="payment.html" style="background:#10b981;color:white;padding:12px;border-radius:8px;text-align:center;text-decoration:none;font-weight:bold;">
              💳 ชำระค่าส่วนกลาง
            </a>
            <a href="contact.html" style="background:#3b82f6;color:white;padding:12px;border-radius:8px;text-align:center;text-decoration:none;font-weight:bold;">
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

