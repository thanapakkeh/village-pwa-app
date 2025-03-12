const data = [
  { house: "399/1", period: "มี.ค. 68", total: 350 },
  { house: "399/3", period: "พ.ค.67 - มี.ค.68", total: 3850 },
  { house: "399/4", period: "ก.พ.68 - มี.ค.68", total: 700 },
];

document.body.style = "margin:0;font-family:sans-serif;background:#f9fafb;color:#111;";

const root = document.getElementById("root");
root.style = "min-height:100vh;display:flex;justify-content:center;align-items:center;flex-direction:column;padding:20px;";

root.innerHTML = `
  <h1 style="font-size:1.5rem;margin-bottom:1rem;">🔍 ค้นหาค่าส่วนกลางหมู่บ้าน</h1>
  <input id="search" placeholder="กรอกบ้านเลขที่ เช่น 399/1" style="padding:8px;width:250px;border:1px solid #ccc;border-radius:5px;" />
  <button onclick="search()" style="margin-top:10px;padding:8px 16px;background:#3b82f6;color:white;border:none;border-radius:5px;cursor:pointer;">ค้นหา</button>
  <div id="result" style="margin-top:20px;width:100%;max-width:350px;"></div>
`;

window.search = function () {
  const query = document.getElementById("search").value.trim();
  const found = data.find((item) => item.house === query);
  const resultDiv = document.getElementById("result");
  if (found) {
    resultDiv.innerHTML = `
      <div style="background:white;border-radius:10px;padding:16px;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
        <p>🏠 <strong>บ้านเลขที่:</strong> ${found.house}</p>
        <p>🗓️ <strong>ช่วงค้างชำระ:</strong> ${found.period}</p>
        <p>💰 <strong>ยอดรวมค้างชำระ:</strong> ${found.total.toLocaleString()} บาท</p>
        <button onclick="download('${found.house}', '${found.period}', ${found.total})" style="margin-top:10px;padding:8px 16px;background:#10b981;color:white;border:none;border-radius:5px;cursor:pointer;">📥 ดาวน์โหลดใบแจ้งหนี้</button>
      </div>
    `;
  } else {
    resultDiv.innerHTML = "<p style='color:red;'>ไม่พบข้อมูลบ้านเลขที่นี้</p>";
  }
};

window.download = function (house, period, total) {
  const text = `ใบแจ้งหนี้\nบ้านเลขที่: ${house}\nช่วงค้างชำระ: ${period}\nยอดรวม: ${total} บาท`;
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `ใบแจ้งหนี้_${house}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
