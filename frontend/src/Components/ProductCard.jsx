import QuantityCounter from "./QuantityCounter";

export default function ProductCard({
  productQuantity,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  handleDelete,
  handleEdit,
  product,
}) {
  return (
    <div className="ProductCard">
      <h3>{product.productName}</h3>
      <img src={product.image} alt="" />
      <h4>{product.brand}</h4>
      <QuantityCounter
        handleAddQuantity={handleAddQuantity}
        productQuantity={productQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
        id={product.id}
        mode="product"
      />
      <h3>{product.price}</h3>
      <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
      <button
        onClick={() => handleEdit(product)}
        style={{ backgroundColor: "green" }}
      >
        Edit
      </button>
      <br />
      <button
        onClick={() => handleDelete(product._id)}
        style={{ backgroundColor: "red" }}
      >
        Delete
      </button>
    </div>
  );
}
