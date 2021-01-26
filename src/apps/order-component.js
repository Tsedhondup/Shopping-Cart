import { CartComponent } from "./cart-component.js";
import { BillComponent } from "./bill-component.js";
export class OrderComponent {
  initiateOrder() {
    let notCartEmpty;
    // Targeted DOM might not be available at the time of accessing it
    try {
      notCartEmpty = document.querySelector(
        ".cart-item-container .cart-elements"
      );
    } catch (error) {}

    if (notCartEmpty) {
      // get and display the order UIs
      const orderUI = document.querySelector(".order-confirm-backdrop");
      orderUI.classList.add("js_display-block");
      // generate bill
      BillComponent.generateBill();
    } else {
      // show the empty cart msg
      const emptyCartMsg = document.querySelector(".empty-cart-msg");
      emptyCartMsg.classList.add("js_display-block");
    }
  }
  confirmOrderHandler() {
    const orderUI = document.querySelector(".order-confirm-backdrop");
    const confirmBtn = document.querySelector(".confirm-order");
    confirmBtn.addEventListener("click", (event) => {
      event.preventDefault();
      sessionStorage.clear();
      const cartItemContainer = document.querySelector(".cart-item-container");
      cartItemContainer.innerHTML = "";
      // create msg for empty cart
      let msgP = document.createElement("p");
      let msg = document.createTextNode("Your is cart is empty");
      msgP.append(msg);
      msgP.setAttribute("class", "empty-cart-para");
      cartItemContainer.append(msgP);
      CartComponent.cartNotification(); // update the cart notification

      // remove order UI
      orderUI.classList.remove("js_display-block");
      // show the confirm msg
      const confirmMsgDiv = document.querySelector(".order-confirm-msg-div");
      confirmMsgDiv.classList.add("js_display-block");
      // remove total price count
      const totalPriceCount = document.querySelector(".total-price-count");
      totalPriceCount.classList.remove("js_display-block");
    });
  }

  cancelOrderHandler() {
    const orderUI = document.querySelector(".order-confirm-backdrop");
    const cancelOrderBtn = document.querySelector(".cancel-order");
    cancelOrderBtn.addEventListener("click", () => {
      orderUI.classList.remove("js_display-block");
    });
  }

  confirmOrderMsgHandler() {
    const confirmMsgBtn = document.querySelector(".close-confirm-msg");
    confirmMsgBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const confirmMsgDiv = document.querySelector(".order-confirm-msg-div");
      confirmMsgDiv.classList.remove("js_display-block");
    });
  }

  closeEmptyCartMsgHandler() {
    const emptyCartBtn = document.querySelector(".close-empty-cart-msg");
    emptyCartBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const emptyCartMsg = document.querySelector(".empty-cart-msg");
      emptyCartMsg.classList.remove("js_display-block");
    });
  }
}
