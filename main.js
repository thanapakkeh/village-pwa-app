<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <title>ข้อมูลค่าส่วนกลางของบ้าน</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body onload="showUserData()" style="margin:0;font-family:sans-serif;background:#f9fafb;color:#111;">
  <div style="text-align:center;padding:30px 15px;">
    <img src="651354.jpg" alt="logo" style="max-width:200px;margin-bottom:10px;" />
    <h2 style="margin:0;">หมู่บ้านกิตตินคร กรีนทาวน์</h2>
    <p style="margin-top:5px;font-size:0.95rem;line-height:1.4;">
      399/279 ม.5 ต.บางเพรียง อ.บางบ่อ จ.สมุทรปราการ 10560<br />
      เลขประจำตัวผู้เสียภาษี 0994002746323
    </p>
  </div>

  <div style="max-width:400px;margin:auto;text-align:center;">
    <h2>📋 ข้อมูลค่าส่วนกลางของบ้านคุณ</h2>
    <p id="house-id" style="font-size:1rem;"></p>
    <div id="result" style="margin-top:20px;"></div>
    <div style="margin-top:20px;">
      <a href="change-password.html" style="color:#3b82f6;text-decoration:none;">🔐 เปลี่ยนรหัสผ่าน</a>
    </div>
    <button onclick="logout()" style="margin-top:20px;width:100%;padding:10px;background:#ef4444;color:white;border:none;border-radius:5px;cursor:pointer;">
      🚪 ออกจากระบบ
    </button>
  </div>

  <script type="module" src="main.js"></script>
</body>
</html>
