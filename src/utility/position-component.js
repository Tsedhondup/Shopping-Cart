export class WindowPostion {
  static counterElPostion(nPixel) {
    let windowHeight = document.documentElement.clientHeight;
    let counterHeight = windowHeight - nPixel;
    return counterHeight;
  }
}

export class ElementPosition {
  static getPostionTop(el) {
    let rect = el.getBoundingClientRect();
    let x = rect.left;
    let y = rect.top;
    let w = rect.width;
    let h = rect.height;
    return y;
  }
}
