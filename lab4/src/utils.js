export function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

export function getRowColor(rarity) {
  if (rarity === 'legendary') {
    return 'gold';
  } else if (rarity === 'common') {
    return 'lightgrey';
  } else {
    return 'white';
  }
}
