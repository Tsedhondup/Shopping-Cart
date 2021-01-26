import { TemplateButtonComponent } from "../utility/templateButtons-component.js";
import { OrderComponent } from "../apps/order-component.js";

export class CartComponent {
  cartButtonHandler() {
    document.querySelector(".cart").addEventListener("click", (event) => {
      event.stopPropagation();
      document.querySelector(".cart-details").classList.add("js_display-block");
    });
  }
  static addToSession(pDiv) {
    // validating the sources of cart item
    if (pDiv.className === "template-detail") {
      const pImg = pDiv.querySelector(".product-pic").getAttribute("style");
      const pName = pDiv.querySelector(".name").textContent.trim();
      const pPrice = pDiv.querySelector(".price").textContent.trim();

      // create an object and store them in session
      const cartObj = {
        prodImg: pImg,
        prodName: pName,
        prodPrice: pPrice,
        total: 1,
      };
      // validate product before adding into session storage
      const keyNames = Object.keys(sessionStorage);
      let decision;
      for (const names of keyNames) {
        if (pName === names) {
          decision = true;
          break;
        } else {
          decision = false;
        }
      }

      if (keyNames.length > 0 && decision) {
        const matchedObj = JSON.parse(sessionStorage.getItem(pName)); // get the matched item
        let totalItem = matchedObj.total + 1; // get current total & increase by one
        matchedObj.total = totalItem; // update total count
        sessionStorage.removeItem(pName); // remove current product object
        sessionStorage.setItem(pName, JSON.stringify(matchedObj)); // Add updated object
        CartComponent.addItemToCart(); // call to addToCart function
      } else {
        sessionStorage.setItem(pName, JSON.stringify(cartObj));
        CartComponent.addItemToCart(); // call to addToCart function
      }
    } else {
      const pImg = pDiv.querySelector("p").getAttribute("style");
      const pName = pDiv.querySelector(".name").textContent.trim();
      const pPrice = pDiv.querySelector(".price").textContent.trim();

      // create an object and store them in session
      const cartObj = {
        prodImg: pImg,
        prodName: pName,
        prodPrice: pPrice,
        total: 1,
      };
      // validate product before adding into session storage
      const keyNames = Object.keys(sessionStorage);
      let decision;
      for (const names of keyNames) {
        if (pName === names) {
          decision = true;
          break;
        } else {
          decision = false;
        }
      }

      if (keyNames.length > 0 && decision) {
        const matchedObj = JSON.parse(sessionStorage.getItem(pName)); // get the matched item
        let totalItem = matchedObj.total + 1; // get current total & increase by one
        matchedObj.total = totalItem; // update total count
        sessionStorage.removeItem(pName); // remove current product object
        sessionStorage.setItem(pName, JSON.stringify(matchedObj)); // Add updated object
        CartComponent.addItemToCart(); // call to addToCart function
      } else {
        sessionStorage.setItem(pName, JSON.stringify(cartObj));
        CartComponent.addItemToCart(); // call to addToCart function
      }
    }
  }

  static addItemToCart() {
    // getting the cart item insertion tag
    const cartItemContainer = document.querySelector(".cart-item-container");
    cartItemContainer.innerHTML = "";
    // get the item from the session storage
    const sessionKeys = Object.keys(sessionStorage);

    // FOR DEVELOPMENT *********** remember to switch

    for (const keyName of sessionKeys) {
      // get the current object
      const prodobject = JSON.parse(sessionStorage.getItem(keyName));
      // get the cart-item template
      const cartTemplate = document.querySelector(".cart-template");
      const cartItemTemplate = cartTemplate.content.cloneNode(true);
      const cartImg = cartItemTemplate.querySelector(".cart-img");
      const cartName = cartItemTemplate.querySelector(".cart-name");
      const cartAmount = cartItemTemplate.querySelector(".total-item");
      const cartPrice = cartItemTemplate.querySelector(".cart-price");

      // adding values to template tag

      cartImg.setAttribute("style", prodobject.prodImg);
      cartName.append(prodobject.prodName);
      cartAmount.append(prodobject.total);

      // price calculation - part of adding value to tag
      const price = prodobject.prodPrice;
      if (!price) {
        continue;
      }
      const priceArray = price.split(" ");
      const totalItem = prodobject.total;
      const totalPrices = parseInt(priceArray[1]) * parseInt(totalItem);
      cartPrice.append(`$ ${totalPrices}`);

      // Appending the cart item to cart item container
      cartItemContainer.append(cartItemTemplate);
    }

    // After generating the cart elements, call function that add listener to buttons
    new TemplateButtonComponent().addListenerToCartElementButtons();

    // display the total price tag
    const totalPriceCount = document.querySelector(".total-price-count");
    totalPriceCount.classList.add("js_display-block");

    // update the Total price count
    CartComponent.totalPriceCount();

    // FOR PRODUCTION *********** remember to switch
    // sessionKeys.forEach((keyName) => {
    //   // for development

    //   // get the current object
    //   const prodobject = JSON.parse(sessionStorage.getItem(keyName));
    //   // get the cart-item template
    //   const cartTemplate = document.querySelector(".cart-template");
    //   const cartItemTemplate = cartTemplate.content.cloneNode(true);
    //   const cartImg = cartItemTemplate.querySelector(".cart-img");
    //   const cartName = cartItemTemplate.querySelector(".cart-name");
    //   const cartAmount = cartItemTemplate.querySelector(".total-item");
    //   const cartPrice = cartItemTemplate.querySelector(".cart-price");

    //   // adding values to template tag

    //   cartImg.setAttribute("style", prodobject.prodImg);
    //   cartName.append(prodobject.prodName);
    //   cartAmount.append(prodobject.total);

    //   // price calculation
    //   const price = prodobject.prodPrice;
    //   const priceArray = price.split(" ");
    //   const totalItem = prodobject.total;
    //   const totalPrices = parseInt(priceArray[1]) * parseInt(totalItem);
    //   cartPrice.append(`US$ ${totalPrices}`);

    //   // Appending the cart item to cart item container
    //   cartItemContainer.append(cartItemTemplate);
    // });

    /*-------- render the cart button --------*/
    CartComponent.cartNotification();
  }

  showMenuHandler() {
    const menuBtn = document.querySelector(".go-to-menu");
    menuBtn.addEventListener("click", (event) => {
      event.preventDefault();
      document
        .querySelector(".cart-details")
        .classList.remove("js_display-block");
    });
  }

  orderBtnHandler() {
    // initiate the order sequences
    const orderBtn = document.querySelector(".cart-order-now");
    orderBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      new OrderComponent().initiateOrder();
    });
  }

  static cartNotification() {
    const cartBtnNotification = document.querySelector(".notification");
    const sessionKeys = Object.keys(sessionStorage);

    if (sessionKeys.length > 0) {
      const sessionLength = sessionKeys.length;
      cartBtnNotification.innerHTML = "";
      cartBtnNotification.append(sessionLength);
      cartBtnNotification.classList.add("js_display-flex");
    } else {
      cartBtnNotification.classList.remove("js_display-flex");
    }
  }

  static totalPriceCount() {
    const totalPriceCount = document.querySelector(".total-price-count p");
    let totalPriceArray = [];
    let totalPriceValue = 0;
    let cartElPrice;
    // Node might be absent at initial DOM load
    try {
      cartElPrice = document.querySelectorAll(".cart-elements .cart-price");
    } catch (error) {}

    // validate the total price
    if (cartElPrice.length > 0) {
      cartElPrice.forEach((item) => {
        const priceVal = item.textContent.trim(); // get the price
        const priceArray = priceVal.split(" "); // convert to array
        const secondItem = priceArray[1]; // get the second item which is price value
        totalPriceArray.push(parseInt(secondItem)); // push to array in form of integers
      });

      // Sum of all the prices
      totalPriceArray.forEach((item) => {
        totalPriceValue += item;
      });
      // Append to the total price count tag
      totalPriceCount.innerHTML = " ";
      totalPriceCount.append(`Total cost : $ ${totalPriceValue}`);
    } else {
      // Append to the total price count tag
      totalPriceCount.innerHTML = " ";
      totalPriceCount.append(`Total cost: $ ${totalPriceValue}`);
    }
  }
}
