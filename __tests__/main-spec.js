const {
  createReceipt,
  countCart,
  calculateTotal,
  getCartItems,
  generateReceipt,
  generateReceiptLine,
  ITEMS
} = require("../main");

it("should countCart", () => {
  // given
  const cart = ["0001", "0003", "0005", "0003"];

  // when
  const actualResult = countCart(cart);

  // then
  expect(actualResult).toEqual([
    { id: "0001", count: 1 },
    { id: "0003", count: 2 },
    { id: "0005", count: 1 }
  ]);
});

it("should getCartItems", () => {
  // given
  const countedCart = [
    { id: "0001", count: 1 },
    { id: "0003", count: 2 },
    { id: "0005", count: 1 }
  ];

  // when
  const actualResult = getCartItems(countedCart, ITEMS);

  // then
  expect(actualResult).toEqual([
    { id: "0001", name: "Coca Cola", price: 3, count: 1 },
    { id: "0003", name: "Pepsi-Cola", price: 5, count: 2 },
    { id: "0005", name: "Dr Pepper", price: 7, count: 1 }
  ]);
});

it("should calculateTotal", () => {
  // given
  const cartItems = [
    { id: "0001", name: "Coca Cola", price: 3, count: 1 },
    { id: "0003", name: "Pepsi-Cola", price: 5, count: 2 },
    { id: "0005", name: "Dr Pepper", price: 7, count: 1 }
  ];

  // when
  const actualResult = calculateTotal(cartItems);

  // then
  expect(actualResult).toEqual(20);
});

it("should generateReceiptLine", () => {
  // given
  const cartItem = { id: "0001", name: "Coca Cola", price: 3, count: 1 };

  // when
  const actualResult = generateReceiptLine(cartItem);

  // then
  expect(actualResult).toEqual(`Coca Cola                       3          1`);
});

it("should generateReceipt", () => {
  // given
  const cartItems = [
    { id: "0001", name: "Coca Cola", price: 3, count: 1 },
    { id: "0003", name: "Pepsi-Cola", price: 5, count: 2 },
    { id: "0005", name: "Dr Pepper", price: 7, count: 1 }
  ];
  const total = 20;

  // when
  const actualResult = generateReceipt(cartItems, total);

  // then
  expect(actualResult).toEqual(
    `Receipts
------------------------------------------------------------
Coca Cola                       3          1
Pepsi-Cola                      5          2
Dr Pepper                       7          1
------------------------------------------------------------
Price: 20`
  );
});
