
const house = sessionStorage.getItem("user");
const statusEl = document.getElementById("status");
const amountEl = document.getElementById("amount");
const updateEl = document.getElementById("update");

if (!house) {
  alert("กรุณาเข้าสู่ระบบก่อน");
  window.location.href = "index.html";
}

Promise.all([
  fetch("https://script.google.com/macros/s/AKfycbw4-jXR0IdO7vvf-phzTwIhCZZFJELd8hpFISf47Iyby0tJ6CkvzCLhAd0IiQUN7WpwAw/exec").then(res => res.json()),
  fetch("https://script.google.com/macros/s/AKfycbyHcHWbqxS6N1HRj-xnaLN7jpvIFqtETwcbmHFson7giDyyKNeT2V5rloXg2B46r11HXw/exec").then(res => res.json())
])
.then(([debtData, clearData]) => {
  const combined = [...clearData, ...debtData];
  const match = combined.find(entry => entry["บ้านเลขที่"] === house);
  if (!match) {
    statusEl.innerHTML = "<span class='error'>❌ ไม่พบข้อมูลบ้านเลขที่นี้</span>";
    return;
  }

  const statusText = match["สถานะ"] || "-";
  const isDebt = statusText.includes("มียอด") || statusText.includes("ค้าง");
  const baht = match["ยอดรวมค้างชำระ"] || "0";
  const updated = match["อัปเดตล่าสุด"] || "-";

  statusEl.innerHTML = "สถานะ: <span class='" + (isDebt ? "error" : "success") + "'>" + statusText + "</span>";
  amountEl.innerHTML = "ยอดค้างชำระ: <strong>" + baht + "</strong> บาท";
  updateEl.innerHTML = "อัปเดตล่าสุด: " + updated;
})
.catch(() => {
  statusEl.innerHTML = "<span class='error'>⚠️ ดึงข้อมูลไม่สำเร็จ</span>";
});

function logout() {
  sessionStorage.clear();
  window.location.href = "index.html";
}
