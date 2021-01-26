import { ProductComponent } from "./apps/product-component.js";
import { CartComponent } from "./apps/cart-component.js";
import { OrderComponent } from "./apps/order-component.js";
import { HomePageComponent } from "./apps/homepage-component.js";

// Objects instances
const homepageObj = new HomePageComponent();
const productObj = new ProductComponent();
const cartObj = new CartComponent();
const orderObj = new OrderComponent();

homepageObj.addListenerToMainOrderBtn();
productObj.viewProductHandler();
productObj.addListenerToAddButton();
cartObj.cartButtonHandler(); // main cart button
cartObj.showMenuHandler();
cartObj.orderBtnHandler();
orderObj.confirmOrderHandler();
orderObj.cancelOrderHandler();
orderObj.confirmOrderMsgHandler();
orderObj.closeEmptyCartMsgHandler();

window.addEventListener("scroll", () => {
  homepageObj.renderHomePageNavBackColor();
  productObj.renderProductVisibility();
});

/*-------- when dom loaded, read the sessionStorage and write into the cart ----------*/

window.addEventListener("load", () => {
  CartComponent.addItemToCart();
});
