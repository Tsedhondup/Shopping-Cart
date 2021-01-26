export const productDescription = {
  ramen: {
    description:
      "Ramen is the japanese noodle soup dish and it is one of the most popular dishes in Japan.",
    price: 25.99,
  },
  hamburger: {
    description: `A hamburger is a sandwich consisting of one or more cooked patties of ground meat,usually beef, 
    placed inside a sliced bread roll or bun.`,
    price: 5,
  },
  kebab: {
    description: `Kebabs consist of cut up or ground meat, sometimes with vegetables,
     and various other accompaniments according to the specific recipe.`,
    price: 10,
  },
  poutine: {
    description: `Canadian dish consist of french fries and cheese curds topped with a brown gravy.`,
    price: 3,
  },
  fishAndChip: {
    description: `English hot dish consisting of fried fish in batter, served with chips. `,
    price: 3.5,
  },

  somTam: {
    description: `Thai green papaya salad that combines all four tastes - sour, chilli, sweet and salty`,
    price: 7,
  },

  masalaDosa: {
    description: `Indian dish made from rice, lentils, potato, fenugreek, and curry leaves, and served with chutneys and sambar`,
    price: 1.5,
  },
  pizaNapoletana: {
    description: `Also known as Naples-style pizza, is a style of pizza made with tomatoes and mozzarella cheese.`,
    price: 10,
  },

  bibimbap: {
    description: `Korean rice bowl topped with assorted vegetables, spicy gochujang, and an egg and/or meat`,
    price: 8.7,
  },
};

export const getDescription = (pId) => {
  if (pId === "p1") {
    return productDescription.ramen;
  }
  if (pId === "p2") {
    return productDescription.hamburger;
  }
  if (pId === "p3") {
    return productDescription.kebab;
  }

  if (pId === "p4") {
    return productDescription.poutine;
  }
  if (pId === "p5") {
    return productDescription.fishAndChip;
  }
  if (pId === "p6") {
    return productDescription.somTam;
  }
  if (pId === "p7") {
    return productDescription.masalaDosa;
  }
  if (pId === "p8") {
    return productDescription.pizaNapoletana;
  }
  if (pId === "p9") {
    return productDescription.bibimbap;
  }
};

export const getPrice = (pName) => {
  if (pName === "Ramen") {
    return productDescription.ramen;
  }
  if (pName === "Hamburger") {
    return productDescription.hamburger;
  }
  if (pName === "Kebab") {
    return productDescription.kebab;
  }

  if (pName === "Poutine") {
    return productDescription.poutine;
  }
  if (pName === "Fish and Chips") {
    return productDescription.fishAndChip;
  }
  if (pName === "Som Tam") {
    return productDescription.somTam;
  }
  if (pName === "Masala Dosa") {
    return productDescription.masalaDosa;
  }
  if (pName === "Pizza Napoletana") {
    return productDescription.pizaNapoletana;
  }
  if (pName === "Bibimbap") {
    return productDescription.bibimbap;
  }
};
