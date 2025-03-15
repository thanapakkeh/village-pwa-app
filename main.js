window.searchByHouseNumber = async function (houseNumber) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  try {
    // โหลดข้อมูลจาก 2 Web App
    const [dueRes, clearRes] = await Promise.all([
      fetch("https://script.google.com/macros/s/AKfycbzymSwxn-V8f9v7iJuEAv9kPLi71Ln1lXSAXY-Psp9n6LVcmAmipLMieud93IrbpKVyrg/exec"),
      fetch("https://script.google.com/macros/s/AKfycbwj442jIMktDBpnzpeIKNbhRqtsQN1M3UIB2im1WUIIFqxN1iMGORWXNdy1djQ9zoGPEg/exec")
    ]);
    const dueData = await dueRes.json();
    const clearData = await clearRes.json();

    // รวมข้อมูล: ให้ค้างชำระทับ
    const houseMap = {};
    clearData.forEach(i => houseMap[i["บ้านเลขที่"]] = i);
    dueData.forEach(i => houseMap[i["บ้านเลขที่"]] = i); // ทับข้อมูลเก่า

    const match = houseMap[houseNumber];
    const status = (match?.["สถานะ"] || "").trim();

    if (!match) {
      resultDiv.innerHTML = `<p style="color:red;">❌ ไม่พบข้อมูลบ้านเลขที่ ${houseNumber}</p>`;
    } else if (status.includes("มียอด")) {
      resultDiv.innerHTML = `
        <div style="background:white;border-radius:12px;padding:20px;">
          <p><strong>📅 ช่วงค้างชำระ:</strong> ${match["ช่วงค้างชำระ"]}</p>
          <p><strong>💰 ยอดค้างชำระ:</strong> ${match["ยอดรวมค้างชำระ"]} บาท</p>
          <p><strong>📅 อัปเดตล่าสุด:</strong> ${formatThaiDate(match["อัปเดตล่าสุด"])}</p>
        </div>`;
    } else {
      resultDiv.innerHTML = `
        <div style="background:white;border-radius:12px;padding:20px;">
          <p>✅ <strong>ไม่มีค้างชำระ</strong></p>
          <p>💰 ยอดค้างชำระ: 0 บาท</p>
          <p><strong>📅 อัปเดตล่าสุด:</strong> ${formatThaiDate(match["อัปเดตล่าสุด"])}</p>
        </div>`;
    }
  } catch (err) {
    console.error(err);
    resultDiv.innerHTML = `<p style="color:red;">❌ โหลดข้อมูลผิดพลาด</p>`;
  }
};

function formatThaiDate(dateString) {
  try {
    const d = new Date(dateString);
    const months = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
                    "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543 - 2500}`;
  } catch {
    return dateString || "-";
  }
}

window.showUserData = function () {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) return window.location.href = "login.html";

  const houseId = user.house;
  document.getElementById("house-id").innerText = `🏠 บ้านเลขที่: ${houseId}`;
  searchByHouseNumber(houseId);
};

window.logout = function () {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
};

