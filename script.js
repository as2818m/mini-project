function saveShiftData() {
  const shift = document.getElementById("shiftSelect").value;
  const sales = document.getElementById("salesInput").value;
  const inventory = document.getElementById("inventoryInput").value;
  const tasks = document.getElementById("tasksInput").value;
  const goods = document.getElementById("goodsInput").value;
  const cash = document.getElementById("cashInput").value;

  const data = {
    sales: Number(sales),
    inventory: Number(inventory),
    tasks: tasks.split(",").map(task => task.trim()),
    goods: goods.split(",").map(item => item.trim()),
    cash: Number(cash)
  };

  localStorage.setItem(`shift_${shift}`, JSON.stringify(data));
  displaySummary();
}

function displaySummary() {
  const morning = JSON.parse(localStorage.getItem("shift_morning")) || {};
  const evening = JSON.parse(localStorage.getItem("shift_evening")) || {};

  const summary = `
    <h3>Утренняя смена</h3>
    <p>Продажи: ₽${morning.sales || 0}</p>
    <p>Остаток: ${morning.inventory || 0}</p>
    <p>Задачи: ${morning.tasks ? morning.tasks.join(", ") : "Нет"}</p>
    <p>Новые поступления: ${morning.goods ? morning.goods.join(", ") : "Нет"}</p>
    <p>Остаток в кассе: ₽${morning.cash || 0}</p>

    <h3>Вечерняя смена</h3>
    <p>Продажи: ₽${evening.sales || 0}</p>
    <p>Остаток: ${evening.inventory || 0}</p>
    <p>Задачи: ${evening.tasks ? evening.tasks.join(", ") : "Нет"}</p>
    <p>Новые поступления: ${evening.goods ? evening.goods.join(", ") : "Нет"}</p>
    <p>Остаток в кассе: ₽${evening.cash || 0}</p>
  `;

  document.getElementById("summary").innerHTML = summary;
}

window.onload = displaySummary;