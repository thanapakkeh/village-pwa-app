const data = {
  dueData: [],
  clearData: [],
};

// ฟังก์ชันโหลดข้อมูล JSON
async function loadData() {
  try {
    const [dueResponse, clearResponse] = await Promise.all([
      fetch("houses_with_data.json"),
      fetch("houses_without_data.json")
    ]);

    if (!dueResponse.ok || !clearResponse.ok) {
      throw new Error("โหลดข้อมูล JSON ผิดพลาด");
    }

    data.dueData = await dueResponse.json();
    data.clearData = await clearResponse.json();
  } catch (error) {
    console.error("โหลดข้อมูลผิดพลาด:", error);
  }
}

// เรียกฟังก์ชันโหลดข้อมูลทันที
loadData();
