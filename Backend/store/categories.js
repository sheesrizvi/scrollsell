const categories = [
  {
    id: 1,
    name: "Furniture",
    icon: "floor-lamp",
    backgroundColor: "#fc5c65",
    color: "white"
  },
  {
    id: 2,
    name: "Cars",
    icon: "car",
    backgroundColor: "#fd9644",
    color: "white"
  },
  {
    id: 3,
    name: "Mobiles",
    icon: "mobile",
    backgroundColor: "#fed330",
    color: "white"
  },
  {
    id: 4,
    name: "Games",
    icon: "cards",
    backgroundColor: "#26de81",
    color: "white"
  },
  {
    id: 5,
    name: "Clothing",
    icon: "shoe-heel",
    backgroundColor: "#2bcbba",
    color: "white"
  },
  {
    id: 6,
    name: "Sports",
    icon: "basketball",
    backgroundColor: "#45aaf2",
    color: "white"
  },
  {
    id: 7,
    name: "Electronics and Appliances",
    icon: "televisiion",
    backgroundColor: "#4b7bec",
    color: "white"
  },
  {
    id: 8,
    name: "Books",
    icon: "book-open-variant",
    backgroundColor: "#a55eea",
    color: "white"
  },
  {
    id: 9,
    name: "Bike",
    icon: "motorbike",
    backgroundColor: "#778ca3",
    color: "white"
  },
  {
    id: 10,
    name: "car",
    icon: "car",
    backgroundColor: "#778ca3",
    color: "white"
  },
  {
    id: 10,
    name: "Others",
    icon: "application",
    backgroundColor: "#778ca3",
    color: "white"
  }
];

const getCategories = () => categories;

const getCategory = id => categories.find(c => c.id === id);

module.exports = {
  getCategories,
  getCategory
};
