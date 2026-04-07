const form = document.querySelector("form");
const item = document.getElementById("item");

const shoppingList = document.querySelector("ul");

item.oninput = () => {
  let itemNameRegex = item.value.replace(/[^a-zA-Z0-9À-ÿ ]/g, "");

  item.value = itemNameRegex;
};

form.onsubmit = (event) => {
  event.preventDefault();

  const newItem = {
    id: new Date().getTime(),
    item: item.value,
    created_at: new Date(),
  };

  console.log(newItem);
  itemAdd(newItem);
};

function itemAdd(newItem) {
  try {
    const shoppingItem = document.createElement("li");

    const shoppingItemInfo = document.createElement("div");
    shoppingItemInfo.classList.add("item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const itemName = document.createElement("span");
    itemName.textContent = newItem.item;

    const buttonDelete = document.createElement("button");
    buttonDelete.classList.add("btn-delete");
    buttonDelete.setAttribute("type", "button");

    const iconDelete = document.createElement("img");
    iconDelete.setAttribute("src", "./assets/dump-icon.svg");
    iconDelete.setAttribute("alt", "Ícone de lixeira");

    buttonDelete.append(iconDelete);

    shoppingItemInfo.append(checkbox, itemName);

    shoppingItem.append(shoppingItemInfo, buttonDelete);
    shoppingList.append(shoppingItem);
    clearForm();
  } catch (error) {
    alert("Não foi possível adicionar item a lista de compras.");
  }
}

shoppingList.addEventListener("click", (event) => {
  const button = event.target.closest(".btn-delete");

  if (button) {
    const item = button.closest("li");
    item.remove();
    alertNotification();
  }
});

function alertNotification() {
  const alert = document.createElement("div");
  alert.classList.add("alert-notification");

  const alertInfo = document.createElement("div");
  alertInfo.classList.add("notifications-left");

  const iconAlert = document.createElement("img");
  iconAlert.src = "./assets/alert-icon.svg";

  const alertDescription = document.createElement("span");
  alertDescription.textContent = "O item foi removido da lista";

  const alertRemoveButton = document.createElement("button");
  alertRemoveButton.type = "button";

  const alertImgDelete = document.createElement("img");
  alertImgDelete.src = "./assets/remove-icon.svg";

  alertRemoveButton.append(alertImgDelete);

  alertInfo.append(iconAlert, alertDescription);
  alert.append(alertInfo, alertRemoveButton);

  form.append(alert);

  setTimeout(() => {
    alert.classList.add("show");
  }, 10);

  function removeAlert() {
    alert.classList.remove("show");
    alert.classList.add("hide");

    setTimeout(() => {
      alert.remove();
    }, 300);
  }

  alertRemoveButton.addEventListener("click", removeAlert);

  setTimeout(removeAlert, 3000);
}

function clearForm() {
  item.value = "";

  item.focus();
}
