async function fetchAndMergeData(houseNumber) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = ""; // ล้างผลลัพธ์เก่า

  try {
    // ดึงข้อมูลจาก API ทั้งสอง
    const [dueRes, clearRes] = await Promise.all([
      fetch("https://script.google.com/macros/s/AKfycbwRRSTSNrdWem_3SXH9wM6otmVIfXNHLdvoIf3piMsHc7UhktlbOA5K0nxBEueDojYGew/exec"),
      fetch("https://script.google.com/macros/s/AKfycby3TgbRDMOmUu4Fox9VD_swTWjnG9mIbDV-h-n2dL9Fan3mYNrXt_F0McvzYzA5-nH1TA/exec")
    ]);

    // ตรวจสอบว่าโหลดข้อมูลสำเร็จหรือไม่
    if (!dueRes.ok || !clearRes.ok) {
      throw new Error("ไม่สามารถโหลดข้อมูลจาก API");
    }

    // แปลงข้อมูลเป็น JSON
    const dueData = await dueRes.json();
    const clearData = await clearRes.json();

    // รวมข้อมูลโดยให้ "ค้างชำระ" ทับ "ไม่ค้างชำระ"
    const houseMap = {};
    clearData.forEach(item => houseMap[item["บ้านเลขที่"]] = item);
    dueData.forEach(item => houseMap[item["บ้านเลขที่"]] = item);

    // ค้นหาบ้านเลขที่ในข้อมูลรวม
    const match = houseMap[houseNumber];
    const status = (match?.["สถานะ"] || "").trim();

    // แสดงผลลัพธ์
    if (!match) {
      resultDiv.innerHTML = `<p style="color:red;">❌ ไม่พบข้อมูลบ้านเลขที่ ${houseNumber}</p>`;
    } else if (status.includes("มียอด")) {
      resultDiv.innerHTML = `
        <div style="background:white;border-radius:12px;padding:20px;">
          <p><strong>📅 ช่วงค้างชำระ:</strong> ${match["ช่วงค้างชำระ"] || "-"}</p>
          <p><strong>💰 ยอดค้างชำระ:</strong> ${match["ยอดรวมค้างชำระ"] || "0"} บาท</p>
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
  } catch (error) {
    console.error("Error:", error);
    resultDiv.innerHTML = `<p style="color:red;">❌ โหลดข้อมูลผิดพลาด: ${error.message}</p>`;
  }
}

// ฟังก์ชันจัดรูปแบบวันที่เป็นภาษาไทย
function formatThaiDate(dateString) {
  if (!dateString) return "-"; // จัดการกรณีวันที่ว่างเปล่า
  try {
    const d = new Date(dateString);
    const months = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
                    "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
  } catch {
    return "-";
  }
}

// ฟังก์ชันสำหรับตรวจสอบบ้านเลขที่เมื่อผู้ใช้กดปุ่ม
function checkStatus() {
  const houseNumbe// ฟังก์ชันหลักสำหรับตรวจสอบสถานะบ้านเลขที่
async function fetchAndMergeData(houseNumber) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = ""; // ล้างผลลัพธ์เก่า

  try {
    // ดึงข้อมูลจาก API ทั้งสอง
    const [dueRes, clearRes] = await Promise.all([
      fetch("https://script.google.com/macros/s/AKfycbwRRSTSNrdWem_3SXH9wM6otmVIfXNHLdvoIf3piMsHc7UhktlbOA5K0nxBEueDojYGew/exec"),
      fetch("https://script.google.com/macros/s/AKfycby3TgbRDMOmUu4Fox9VD_swTWjnG9mIbDV-h-n2dL9Fan3mYNrXt_F0McvzYzA5-nH1TA/exec")
    ]);

    // ตรวจสอบว่าโหลดข้อมูลสำเร็จหรือไม่
    if (!dueRes.ok || !clearRes.ok) {
      throw new Error("ไม่สามารถโหลดข้อมูลจาก API");
    }

    // แปลงข้อมูลเป็น JSON
    const dueData = await dueRes.json();
    const clearData = await clearRes.json();

    // รวมข้อมูลโดยให้ "ค้างชำระ" ทับ "ไม่ค้างชำระ"
    const houseMap = {};
    clearData.forEach(item => houseMap[item["บ้านเลขที่"]] = item);
    dueData.forEach(item => houseMap[item["บ้านเลขที่"]] = item);

    // ค้นหาบ้านเลขที่ในข้อมูลรวม
    const match = houseMap[houseNumber];
    const status = (match?.["สถานะ"] || "").trim();

    // แสดงผลลัพธ์
    if (!match) {
      resultDiv.innerHTML = `<p style="color:red;">❌ ไม่พบข้อมูลบ้านเลขที่ ${houseNumber}</p>`;
    } else if (status.includes("มียอด")) {
      resultDiv.innerHTML = `
        <div style="background:white;border-radius:12px;padding:20px;">
          <p><strong>📅 ช่วงค้างชำระ:</strong> ${match["ช่วงค้างชำระ"] || "-"}</p>
          <p><strong>💰 ยอดค้างชำระ:</strong> ${match["ยอดรวมค้างชำระ"] || "0"} บาท</p>
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
  } catch (error) {
    console.error("Error:", error);
    resultDiv.innerHTML = `<p style="color:red;">❌ โหลดข้อมูลผิดพลาด: ${error.message}</p>`;
  }
}

// ฟังก์ชันจัดรูปแบบวันที่เป็นภาษาไทย
function formatThaiDate(dateString) {
  if (!dateString) return "-"; // จัดการกรณีวันที่ว่างเปล่า
  try {
    const d = new Date(dateString);
    const months = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
                    "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
  } catch {
    return "-";
  }
}

// ฟังก์ชันสำหรับตรวจสอบบ้านเลขที่เมื่อผู้ใช้กดปุ่ม
function checkStatus() {
  const houseNumber = document.getElementById("houseNumber").value.trim();
  if (!houseNumber) {
    alert("กรุณากรอกบ้านเลขที่");
    return;
  }
  fetchAndMergeData(houseNumber);
}
r = document.getElementById("houseNumber").value.trim();
  if (!houseNumber) {
    alert("กรุณากรอกบ้านเลขที่");
    return;
  }
  fetchAndMergeData(houseNumber);
}
