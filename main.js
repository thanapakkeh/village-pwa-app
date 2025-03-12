const data = [
  { house: "399/1", period: "มี.ค. 68", total: 350 },
  { house: "399/3", period: "พ.ค.67 - มี.ค.68", total: 3850 },
  { house: "399/4", period: "ก.พ.68 - มี.ค.68", total: 700 },
];

const root = document.getElementById("root");
root.innerHTML = `
  <h1>ค้นหาค่าส่วนกลางหมู่บ้าน</h1>
  <input id="search" placeholder="กรอกบ้านเลขที่ เช่น 399/1">
  <button onclick="search()">ค้นหา</button>
  <div id="result"></div>
`;

window.search = function() {
  const query = document.getElementById("search").value.trim();
  const found = data.find((item) => item.house === query);
  const resultDiv = document.getElementById("result");
  if (found) {
    resultDiv.innerHTML = `
      <p>🏠 บ้านเลขที่: ${found.house}</p>
      <p>🗓️ ช่วงค้างชำระ: ${found.period}</p>
      <p>💰 ยอดรวมค้างชำระ: ${found.total} บาท</p>
      <button onclick="download('${found.house}', '${found.period}', ${found.total})">📥 ดาวน์โหลดใบแจ้งหนี้</button>
    `;
  } else {
    resultDiv.innerHTML = "<p style='color:red'>ไม่พบข้อมูลบ้านเลขที่นี้</p>";
  }
}

window.download = function(house, period, total) {
  const text = `ใบแจ้งหนี้\nบ้านเลขที่: ${house}\nช่วงค้างชำระ: ${period}\nยอดรวม: ${total} บาท`;
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `ใบแจ้งหนี้_${house}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
