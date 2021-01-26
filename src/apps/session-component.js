export class SessionComponent {
  removeFromSession(prodName) {
    const keyNames = Object.keys(sessionStorage);
    for (const pName of keyNames) {
      if (prodName === pName) {
        sessionStorage.removeItem(prodName);
        break;
      }
    }
  }
}
