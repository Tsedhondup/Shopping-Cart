import * as positionComponent from "../utility/position-component.js";
export class HomePageComponent {
  addListenerToMainOrderBtn() {
    document
      .querySelector(".home-page-info a")
      .addEventListener("click", () => {
        HomePageComponent.renderMenuHeaderPadding();
      });
  }
  static renderMenuHeaderPadding() {
    document.querySelector("#product-container").style.paddingTop = "75px";
  }

  renderHomePageNavBackColor() {
    const nav = document.querySelector("nav");
    const productContainer = document.querySelector("#product-container");

    if (
      positionComponent.ElementPosition.getPostionTop(productContainer) <
      positionComponent.WindowPostion.counterElPostion(1)
    ) {
      nav.classList.add("js_back-color");
    } else {
      nav.classList.remove("js_back-color");
    }
  }
}
