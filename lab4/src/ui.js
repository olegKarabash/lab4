import { addItem, removeItem, calculateTotalItems } from './inventory.js';
import { generateId, getRowColor } from './utils.js';
import { Item, Weapon } from './classes.js';

export function addItemToInventory(event) {
  event.preventDefault();
  const name = document.getElementById('itemName').value.trim();
  const category = document.getElementById('itemCategory').value;
  const rarity = document.getElementById('itemRarity').value;
  const description = document.getElementById('itemDescriptionInput').value.trim();
  let damage = null;
  if (category === 'weapon') {
    damage = document.getElementById('itemDamage').value;
    damage = parseInt(damage);
    if (isNaN(damage)) {
      damage = 0;
    }
  }
  if (!name) {
    alert("Введите название предмета");
    return;
  }
  const id = generateId();
  let newItem;
  if (category === 'weapon') {
    newItem = new Weapon(id, name, rarity, description, damage);
  } else {
    newItem = new Item(id, name, category, rarity, description);
  }
  addItem(newItem);
  addRowToTable(newItem);
  updateTotalCount();
  event.target.reset();
}

export function addRowToTable(item) {
  const tableBody = document.getElementById('inventoryTableBody');
  const row = document.createElement('tr');
  row.setAttribute('data-id', item.id);
  row.style.backgroundColor = getRowColor(item.rarity);
  const nameCell = document.createElement('td');
  nameCell.textContent = item.name;
  row.appendChild(nameCell);
  const categoryCell = document.createElement('td');
  categoryCell.textContent = item.category;
  row.appendChild(categoryCell);
  const rarityCell = document.createElement('td');
  rarityCell.textContent = item.rarity;
  row.appendChild(rarityCell);
  const damageCell = document.createElement('td');
  if (item.category === 'weapon' && typeof item.attack === 'function') {
    const attackResult = item.attack();
    damageCell.textContent = attackResult;
  } else {
    damageCell.textContent = '—';
  }
  row.appendChild(damageCell);
  const actionCell = document.createElement('td');
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Удалить';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.setAttribute('data-id', item.id);
  actionCell.appendChild(deleteBtn);
  row.appendChild(actionCell);
  row.setAttribute('data-description', item.description);
  tableBody.appendChild(row);
}

export function updateTotalCount() {
  const countElement = document.getElementById('totalItems');
  countElement.textContent = `Всего предметов: ${calculateTotalItems()}`;
}

export function initUI() {
  const form = document.getElementById('itemForm');
  form.addEventListener('submit', addItemToInventory);
  const table = document.getElementById('inventoryTable');
  table.addEventListener('click', function(event) {
    if (event.target && event.target.matches('button.delete-btn')) {
      const row = event.target.closest('tr');
      const itemId = row.getAttribute('data-id');
      row.classList.add('fade-out');
      row.addEventListener('transitionend', () => {
        row.remove();
      });
      removeItem(itemId);
      updateTotalCount();
    }
  });
  table.addEventListener('mouseover', function(event) {
    const row = event.target.closest('tr');
    if (row && row.dataset.description) {
      const descriptionDisplay = document.getElementById('itemDescriptionDisplay');
      descriptionDisplay.textContent = row.dataset.description;
    }
  });
  table.addEventListener('mouseout', function() {
    const descriptionDisplay = document.getElementById('itemDescriptionDisplay');
    descriptionDisplay.textContent = '';
  });
}
