const formatCartItem = (entry) => {
  const product = entry.producttId;
  if (!product || typeof product !== "object") return null;

  return {
    _id: product._id,
    productId: product.productId,
    name: product.name,
    title: product.name,
    subcategory: product.subcategory,
    main_category: product.main_category,
    type: product.type,
    image: product.image,
    rating: product.rating,
    price: product.price,
    description: product.description,
    quentity: entry.quentity,
  };
};

const formatCart = (cart = []) =>
  cart.map(formatCartItem).filter(Boolean);

const sanitizeUser = (user) => {
  const obj = user.toObject ? user.toObject() : { ...user };
  delete obj.password;
  return obj;
};

module.exports = { formatCart, formatCartItem, sanitizeUser };
