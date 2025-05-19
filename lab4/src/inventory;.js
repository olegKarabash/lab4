export const inventory = [];

export function addItem(item) {
  inventory.push(item);
}

export function removeItem(id) {
  const index = inventory.findIndex(item => item.id === id);
  if (index > -1) {
    inventory.splice(index, 1);
  }
}

export function calculateTotalItems() {
  return inventory.length;
}
