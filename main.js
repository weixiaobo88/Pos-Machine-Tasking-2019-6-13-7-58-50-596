const ITEMS = [
  { id: "0001", name: "Coca Cola", price: 3 },
  { id: "0002", name: "Diet Coke", price: 4 },
  { id: "0003", name: "Pepsi-Cola", price: 5 },
  { id: "0004", name: "Mountain Dew", price: 6 },
  { id: "0005", name: "Dr Pepper", price: 7 },
  { id: "0006", name: "Sprite", price: 8 },
  { id: "0007", name: "Diet Pepsi", price: 9 },
  { id: "0008", name: "Diet Mountain Dew", price: 10 },
  { id: "0009", name: "Diet Dr Pepper", price: 11 },
  { id: "0010", name: "Fanta", price: 12 }
];

function createReceipt(cart) {
  const countedCart = countCart(cart);
  const cartItems = getCartItems(countedCart, ITEMS);
  const total = calculateTotal(cartItems);
  return generateReceipt(cartItems, total);
}

function countCart(cart) {
  let result = [];
  for (let index = 0; index < cart.length; index++) {
    const element = cart[index];
    const indexInResult = getIndex(result, element);
    if (indexInResult > -1) {
      result[indexInResult] = {
        id: element,
        count: result[indexInResult].count + 1
      };
    } else {
      result.push({ id: element, count: 1 });
    }
  }
  return result;
}

function getIndex(collection, elementId) {
  return collection.findIndex(item => item.id === elementId);
}

function calculateTotal(cartItems) {
  return cartItems.reduce((total, item) => total + item.count * item.price, 0);
}

function getCartItems(countedCart, products) {
  return countedCart.map(item => ({
    ...item,
    ...products.find(product => product.id === item.id)
  }));
}

function generateReceipt(cartItems, total) {
  let itemLines = "";
  cartItems.forEach(item => {
    itemLines += generateReceiptLine(item) + "\n";
  });

  return (
    `Receipts\n` +
    `------------------------------------------------------------\n` +
    itemLines +
    `------------------------------------------------------------\n` +
    `Price: ${total}`
  );
}

function generateReceiptLine(cartItem) {
  return (
    `${cartItem.name}` +
    generateSpace(cartItem.name) +
    cartItem.price +
    `          ${cartItem.count}`
  );
}

function generateSpace(itemName) {
  const spaceNum = 32;
  return " ".repeat(32 - itemName.length);
}

module.exports = {
  createReceipt,
  countCart,
  calculateTotal,
  getCartItems,
  generateReceipt,
  generateReceiptLine,
  ITEMS
};
