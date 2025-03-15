<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ข้อมูลค่าส่วนกลางของบ้าน</title>
  <script type="module" src="./firebase-config.js"></script>
  <link rel="manifest" href="manifest.json">
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      margin: 0;
      padding: 0;
      background: #f9fafb;
      color: #111;
      text-align: center;
    }
    img {
      max-width: 200px;
      margin-bottom: 10px;
    }
    h2 {
      margin: 0;
    }
    #result {
      margin-top: 20px;
    }
    .btn {
      padding: 10px 20px;
      font-size: 1rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin: 5px;
    }
    .btn-green {
      background-color: #10b981;
      color: white;
    }
    .btn-yellow {
      background-color: #facc15;
      color: black;
    }
    .btn-red {
      background-color: #ef4444;
      color: white;
    }
    .footer-btns {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;
    }
    .bottom-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: white;
      border-top: 1px solid #ccc;
      display: flex;
      justify-content: space-around;
      padding: 10px 0;
      box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
    }
    .bottom-nav a {
      color: #111;
      text-decoration: none;
      font-size: 0.9rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .bottom-nav a span {
      font-size: 1.3rem;
      margin-bottom: 3px;
    }
  </style>
</head>
<body onload="showUserData()">
  <div style="margin: 0 auto; max-width: 480px; padding: 20px;">
    <img src="651354.png" alt="logo" />
    <h2>หมู่บ้านกิตตินคร กรีนทาวน์</h2>
    <p style="margin-top:5px; font-size:0.95rem; line-height:1.4;">
      399/279 ม.5 ต.บางเพรียง อ.บางบ่อ จ.สมุทรปราการ 10560<br />
      เลขประจำตัวผู้เสียภาษี 0994002746323
    </p>

    <h3 style="margin-top:30px;">🧾 ข้อมูลค่าส่วนกลางของบ้านคุณ</h3>
    <p>📅 อัปเดตล่าสุด: <strong>28 ก.พ. 68</strong></p>
    <p id="house-id"></p>

    <div id="result"></div>

    <div class="footer-btns">
      <button onclick="window.location.href='payment.html'" class="btn btn-green">💳 ชำระค่าส่วนกลาง</button>
      <button onclick="window.location.href='change-password.html'" class="btn btn-yellow">🔐 เปลี่ยนรหัสผ่าน</button>
      <button onclick="logout()" class="btn btn-red">🚪 ออกจากระบบ</button>
    </div>
  </div>

  <!-- 🔻 Bottom Navigation -->
  <div class="bottom-nav">
    <a href="index.html">
      <span>🏠</span>
      หน้าหลัก
    </a>
    <a href="payment.html">
      <span>💵</span>
      ค่าส่วนกลาง
    </a>
    <a href="contact.html">
      <span>📞</span>
      ติดต่อ
    </a>
  </div>

  <script>
    window.searchByHouseNumber = async function (houseNumber) {
      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = "";

      try {
        const res = await fetch("https://script.google.com/macros/s/AKfycbyJz3-CqgmJJzIfSbLdP0LTknYtyh8p_6X6QNzE-t12SEODlFO5wEGordEbVXgRc9RO7Q/exec");
        const data = await res.json();

        const match = data.find(d => d["บ้านเลขที่"] === houseNumber);

        if (match) {
          const amount = match["ยอดรวมค้างชำระ"] || 0;
          const noDue = parseInt(amount) === 0;

          resultDiv.innerHTML = `
            <div style="background:white;border-radius:12px;padding:20px;box-shadow:0 4px 12px rgba(0,0,0,0.06);text-align:left;">
              ${noDue ? `<p>✅ <strong>ไม่มีค้างชำระ</strong></p>` : `<p style="font-size: 1.2rem;"><strong>📅 ช่วงค้างชำระ:</strong> ${match["ช่วงค้างชำระ"]}</p>`}

              <div style="margin: 20px 0 10px;">
                <p style="font-size: 1.1rem; font-weight: bold; color:#111; margin-bottom: 5px;">💰 ยอดรวมค้างชำระ</p>
                <p style="font-size: 1.8rem; font-weight: bold; color:#dc2626; margin: 0;">${amount} บาท</p>
              </div>

              <p style="font-size:0.95rem;color:#666;margin-top:10px;">📅 อัปเดตล่าสุด: ${match["อัปเดตล่าสุด"] || "28 ก.พ. 68"}</p>

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
  </script>
</body>
</html>

