export class BillComponent {
  static generateBill() {
    const orderId = document.querySelector(".order-id");
    const totalOrders = document.querySelector(".total-order");
    const sumPrices = document.querySelector(".total-order-price");
    let cartElements;
    try {
      cartElements = document.querySelectorAll(".cart-elements");
    } catch (error) {}

    if (cartElements.length > 0) {
      orderId.innerHTML = "";
      totalOrders.innerHTML = "";
      sumPrices.innerHTML = "";
      orderId.append(`Order Id : TK${Math.random()}`);
      totalOrders.append(`Total items : ${cartElements.length}`);
      // get the total price count
      const priceTag = document.querySelector(".total-price-count p");
      sumPrices.append(`${priceTag.textContent.trim()}`);
    }
  }
}
