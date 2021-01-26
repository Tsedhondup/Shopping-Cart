import * as productDescriptionComponent from "./product-descriptions.js";
import { CartComponent } from "./cart-component.js";
import { TemplateButtonComponent } from "../utility/templateButtons-component.js";
import { ElementPosition } from "../utility/position-component.js";
export class ProductComponent {
  viewProductHandler() {
    const productsList = document.querySelectorAll(".products div p span");
    productsList.forEach((item) => {
      item.addEventListener("click", (event) => {
        // getting data from target elements
        const eSrc = event.target;
        const closestDiv = eSrc.closest("div");
        const closestDivId = closestDiv.id;

        const productImg = closestDiv.querySelector("p").getAttribute("style");
        const productName = closestDiv.querySelector(".name").textContent;
        const productPrice = closestDiv.querySelector(".price").textContent;

        // getting template tag from product detail
        const template = document.querySelector(".info-template");
        const templateContent = template.content.cloneNode(true);
        const templateImg = templateContent.querySelector(".product-pic");
        const templateName = templateContent.querySelector(".name");
        const templatePrice = templateContent.querySelector(".price");
        const templateDescription = templateContent.querySelector(".story");

        // add content to template tag
        templateImg.setAttribute("style", productImg);
        templateName.append(productName);
        templatePrice.append(productPrice);
        templateDescription.append(
          productDescriptionComponent.getDescription(closestDivId).description // appeding name
        );

        // getting template insertion area
        const templateInsertionArea = document.querySelector("#prod-detail");
        templateInsertionArea.innerHTML = "";
        templateInsertionArea.append(templateContent);

        // reduc padding for product container
        document.querySelector("#product-container").style.paddingTop = "10px";
        // adding listener to template buttons || when viewing the product details
        new TemplateButtonComponent().addListenerToNewButton();
      });
    });
  }

  addListenerToAddButton() {
    const addButtons = document.querySelectorAll(".add");
    addButtons.forEach((item) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        const eSrc = event.target;
        const closestDiv = eSrc.closest("div");
        CartComponent.addToSession(closestDiv);
      });
    });
  }

  renderProductVisibility() {
    const products = document.querySelectorAll(".products div");
    const windowHeight = window.innerHeight;
    const counterHeight = windowHeight - 40;
    products.forEach((item) => {
      if (ElementPosition.getPostionTop(item) < counterHeight) {
        item.classList.add("js_visible");
      }
    });
  }
}
