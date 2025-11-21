import ProductCard from "./ProductCard";

export default function ProductsContainer({
  productData,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  productQuantity,
  handleDelete,
  handleEdit,
}) {
  return (
    <div className="ProductsContainer">
      {productData.map((product) => (
        <ProductCard
          key={product.id}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          productQuantity={
            // Copilot Assisted Bug Fix (Use ternary to pass a value)
            productQuantity?.find(
              (p) => p.id === product._id || p.id === product.id
            )?.quantity ?? 0
          }
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          product={product}
        />
      ))}
    </div>
  );
}
