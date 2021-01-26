import { CartComponent } from "../apps/cart-component.js";
import { ProductComponent } from "../apps/product-component.js";
import * as productDescriptionComponent from "../apps/product-descriptions.js";
import { SessionComponent } from "../apps/session-component.js";
import { OrderComponent } from "../apps/order-component.js";
export class TemplateButtonComponent {
  addListenerToNewButton() {
    // when veiwing the product details
    try {
      const addCartTemplate = document.querySelector(".add-template");
      const orderButton = document.querySelector(".order-template");

      addCartTemplate.addEventListener("click", (event) => {
        event.preventDefault();
        const eSrc = event.target;
        const closestDiv = eSrc.closest(".template-detail");
        CartComponent.addToSession(closestDiv);
      });

      orderButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        new OrderComponent().initiateOrder();
      });
    } catch (error) {}
  }

  addListenerToCartElementButtons() {
    try {
      const incrementBtn = document.querySelectorAll(".plus");
      const decrementBtn = document.querySelectorAll(".minus");
      const removeBtn = document.querySelectorAll(".remove-item");

      incrementBtn.forEach((item) => {
        item.addEventListener("click", (event) => {
          event.preventDefault();
          const eSrc = event.target;
          // get the nearest div with the class = cart-elements
          const closestDiv = eSrc.closest(".cart-elements");
          // call the function
          TemplateButtonComponent.incrementOrders(closestDiv);
        });
      });

      decrementBtn.forEach((item) => {
        item.addEventListener("click", (event) => {
          event.preventDefault();
          const eSrc = event.target;
          // get the nearest div with the class = cart-elements
          const closestDiv = eSrc.closest(".cart-elements");
          // call the function
          TemplateButtonComponent.decrementOrders(closestDiv);
        });
      });

      removeBtn.forEach((item) => {
        item.addEventListener("click", (event) => {
          event.preventDefault();
          const eSrc = event.target;
          const closetDiv = eSrc.closest(".cart-elements");
          TemplateButtonComponent.removeCartItem(closetDiv);
        });
      });
    } catch (error) {}
  }

  static incrementOrders(parentDiv) {
    // get the total item tag
    const totalItemItag = parentDiv.querySelector(".total-item");
    let totalItemValue = parseInt(totalItemItag.textContent.trim());
    totalItemValue += 1;
    totalItemItag.innerHTML = "";
    totalItemItag.append(totalItemValue);

    // calculating  the price
    const productName = parentDiv
      .querySelector(".cart-name")
      .textContent.trim(); // get the name
    const prodPrice = productDescriptionComponent.getPrice(productName).price; // get price per product

    const priceTag = parentDiv.querySelector(".cart-price"); // get the price tag
    const totalPrice = totalItemValue * prodPrice; // calculate total price
    priceTag.innerHTML = ""; // empty priceTag
    priceTag.append(`$ ${Math.round(totalPrice)}`); // update with new price tag

    // update the SessionStorage
    const sessionKeys = Object.keys(sessionStorage); // get the sessions keys
    for (const pName of sessionKeys) {
      if (!pName === productName) {
        continue;
      }
      const currentObj = JSON.parse(sessionStorage.getItem(pName)); // get the matched product
      currentObj.total = totalItemValue; // update the price
      sessionStorage.removeItem(pName); // remove the old product object
      sessionStorage.setItem(pName, JSON.stringify(currentObj)); // add the updated object
      break;
    }

    // update the Total price count
    CartComponent.totalPriceCount();
  }

  static decrementOrders(parentDiv) {
    // get the total item tag
    const totalItemItag = parentDiv.querySelector(".total-item");
    let totalItemValue = parseInt(totalItemItag.textContent.trim());
    if (totalItemValue === 1) {
      const priceTag = parentDiv.querySelector(".cart-price"); // get the price tag
      const productName = parentDiv
        .querySelector(".cart-name")
        .textContent.trim(); // get the name
      const prodPrice = productDescriptionComponent.getPrice(productName).price; // get price per product
      priceTag.innerHTML = ""; // empty priceTag
      priceTag.append(`$ ${Math.round(prodPrice)}`); // update with new price tag
      return;
    } else {
      // update on UI part
      totalItemValue -= 1;
      totalItemItag.innerHTML = "";
      totalItemItag.append(totalItemValue);

      // calculating  the price
      const productName = parentDiv
        .querySelector(".cart-name")
        .textContent.trim(); // get the name
      const prodPrice = productDescriptionComponent.getPrice(productName).price; // get price per product

      const priceTag = parentDiv.querySelector(".cart-price"); // get the price tag
      const totalPrice = totalItemValue * prodPrice; // calculate total price
      priceTag.innerHTML = ""; // empty priceTag
      priceTag.append(`$ ${Math.round(totalPrice)}`); // update with new price tag

      // update the SessionStorage
      const sessionKeys = Object.keys(sessionStorage); // get the sessions keys
      for (const pName of sessionKeys) {
        if (!pName === productName) {
          continue;
        }
        const currentObj = JSON.parse(sessionStorage.getItem(pName)); // get the matched product
        currentObj.total = totalItemValue; // update the price
        sessionStorage.removeItem(pName); // remove the old product object
        sessionStorage.setItem(pName, JSON.stringify(currentObj)); // add the updated object
        break;
      }

      // update the Total price count
      CartComponent.totalPriceCount();
    }
  }

  static removeCartItem(closestDiv) {
    // get the product name
    const prodName = closestDiv.querySelector(".cart-name").textContent.trim();
    // clear from the session storage
    new SessionComponent().removeFromSession(prodName);

    /*----- remove the closestDiv ------*/
    if (closestDiv.parentNode) {
      closestDiv.parentNode.removeChild(closestDiv);
    }
    // update cart notification
    CartComponent.cartNotification();

    // updating the cart-item-container
    const cartItemContainer = document.querySelector(".cart-item-container");
    const sesssionKeys = Object.keys(sessionStorage);
    if (sesssionKeys.length <= 0) {
      const pEl = document.createElement("p");
      pEl.setAttribute("class", "empty-cart-para");
      pEl.textContent = "Your cart is empty";
      cartItemContainer.append(pEl);
      const totalPriceCount = document.querySelector(".total-price-count");
      totalPriceCount.classList.remove("js_display-block");
    } else {
      CartComponent.totalPriceCount();
    }
  }
}
