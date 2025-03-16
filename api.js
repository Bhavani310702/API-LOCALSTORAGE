document.addEventListener("DOMContentLoaded", () => {
  loadCards();

  document
    .getElementById("dataForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      addNewEntry();
    });
});

function loadCards() {
  const dataList = JSON.parse(localStorage.getItem("dataList")) || [];
  const container = document.getElementById("cardContainer");
  container.innerHTML = "";

  dataList.forEach((data) => {
    createCard(data);
  });
}

function addNewEntry() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !email) {
    alert("Please fill in all fields.");
    return;
  }

  let dataList = JSON.parse(localStorage.getItem("dataList")) || [];

  if (dataList.some((item) => item.email === email)) {
    alert("This email is already in use.");
    return;
  }

  const newData = { name, email };
  dataList.push(newData);
  localStorage.setItem("dataList", JSON.stringify(dataList));

  createCard(newData);
  document.getElementById("dataForm").reset();
}

function createCard(data) {
  const container = document.getElementById("cardContainer");
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<strong>${data.name}</strong><br>${data.email}`;
  container.appendChild(card);
}
