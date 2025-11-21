import QuantityCounter from "./QuantityCounter";

export default function CartCard({
  _id,
  id,
  image,
  productName,
  price,
  quantity,
  handleRemoveFromCart,
  handleAddQuantity,
  handleRemoveQuantity,
}) {
  return (
    <div className="CartCard">
      <div className="CartCardInfo">
        <img src={image} alt="" />
        <p>{productName}</p>
        <p>{price}</p>
        <QuantityCounter
          // Choose proper id
          id={id !== undefined ? id : _id}
          productQuantity={quantity}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          mode="cart"
        />
      </div>

      <div>
        <h3>
          Total: ${(parseFloat(price.replace("$", "")) * quantity).toFixed(2)}
        </h3>
        <button
          onClick={() => handleRemoveFromCart(id)}
          className="RemoveButton"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
