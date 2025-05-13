let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
let currentIndex = null;
let currentMode = null;

function showMessage(text, color = "black") {
  const message = document.getElementById("message");
  message.textContent = text;
  message.style.color = color;
}

function saveAndRender() {
  localStorage.setItem('inventory', JSON.stringify(inventory));
  renderTable();
}

function addItem() {
  const name = document.getElementById("itemName").value.trim();
  const length = parseFloat(document.getElementById("itemLength").value);
  const qty = parseInt(document.getElementById("itemQty").value);

  if (!name || isNaN(length) || isNaN(qty) || qty <= 0) {
    showMessage("Preencha todos os campos corretamente.", "red");
    return;
  }

  const existing = inventory.find(item => item.name === name && item.length === length);

  if (existing) {
    existing.qty += qty;
    showMessage("Quantidade atualizada com sucesso.", "green");
  } else {
    inventory.push({ name, length, qty });
    showMessage("Item adicionado com sucesso.", "green");
  }

  document.getElementById("itemName").value = "";
  document.getElementById("itemLength").value = "";
  document.getElementById("itemQty").value = "";

  saveAndRender();
}

function renderTable(list = inventory) {
  const tableBody = document.querySelector("#inventoryTable tbody");
  tableBody.innerHTML = "";

  list.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.length}</td>
      <td>${item.qty}</td>
      <td>
        <button onclick="showEditForm(${index})">Editar</button>
        <button class="btn-danger" onclick="showRemoveForm(${index})">Remover</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function filterItems() {
  const filterName = document.getElementById("filterName").value.trim().toLowerCase();
  const filterLength = parseFloat(document.getElementById("filterLength").value);

  const filtered = inventory.filter(item => {
    return (filterName === "" || item.name.toLowerCase().includes(filterName)) &&
           (isNaN(filterLength) || item.length === filterLength);
  });

  renderTable(filtered);
}

function cancelForm() {
  currentIndex = null;
  document.getElementById("removeForm").style.display = "none";
  document.getElementById("editForm").style.display = "none";
}

// --- Remoção ---
function showRemoveForm(index) {
  currentIndex = index;
  const item = inventory[index];
  document.getElementById("removeItemInfo").textContent = `Item: ${item.name} | Estoque: ${item.length}m, ${item.qty} unid.`;
  document.getElementById("removeLength").value = "";
  document.getElementById("removeQty").value = "";
  document.getElementById("removeForm").style.display = "block";
  document.getElementById("editForm").style.display = "none";
}

function confirmRemove() {
  const item = inventory[currentIndex];
  const lengthToRemove = parseFloat(document.getElementById("removeLength").value);
  const qtyToRemove = parseInt(document.getElementById("removeQty").value);

  if (isNaN(lengthToRemove) || lengthToRemove < 0 || lengthToRemove > item.length) {
    showMessage("Metragem inválida ou maior que o estoque.", "red");
    return;
  }

  if (isNaN(qtyToRemove) || qtyToRemove < 0 || qtyToRemove > item.qty) {
    showMessage("Quantidade inválida ou maior que o estoque.", "red");
    return;
  }

  item.length -= lengthToRemove;
  item.qty -= qtyToRemove;

  if (item.length <= 0 || item.qty <= 0) {
    inventory.splice(currentIndex, 1);
    showMessage("Item removido completamente do estoque.", "orange");
  } else {
    showMessage("Metragem e quantidade removidas com sucesso.", "green");
  }

  cancelForm();
  saveAndRender();
}

// --- Edição ---
function showEditForm(index) {
  currentIndex = index;
  const item = inventory[index];
  document.getElementById("editItemInfo").textContent = `Item: ${item.name} | Estoque atual: ${item.length}m, ${item.qty} unid.`;
  document.getElementById("editLength").value = "";
  document.getElementById("editQty").value = "";
  document.getElementById("editForm").style.display = "block";
  document.getElementById("removeForm").style.display = "none";
}

function confirmEdit() {
  const item = inventory[currentIndex];
  const lengthToAdd = parseFloat(document.getElementById("editLength").value);
  const qtyToAdd = parseInt(document.getElementById("editQty").value);

  if (isNaN(lengthToAdd) || lengthToAdd < 0) {
    showMessage("Metragem inválida.", "red");
    return;
  }

  if (isNaN(qtyToAdd) || qtyToAdd < 0) {
    showMessage("Quantidade inválida.", "red");
    return;
  }

  item.length += lengthToAdd;
  item.qty += qtyToAdd;

  showMessage("Item atualizado com sucesso!", "green");
  cancelForm();
  saveAndRender();
}

renderTable();


