// Jeffrey Bolk
// Product Form Component
export default function ProductForm({
  isChanging,
  formData,
  handleOnChange,
  handleOnSubmit,
  handleSubmit,
  register,
  errors,
}) {
  // Validation caused errors
  return (
    <div className="updateForm">
      {isChanging && <h4>Editing {formData.productName}</h4>}
      {!isChanging && <h4>Adding New Product</h4>}
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div>
          <input
            type="text"
            name="productName"
            {...(isChanging
              ? {}
              : register("productName", {
                  required: "Product name is required",
                  pattern: {
                    //value: /^[a-zA-Z\s]+$/,
                    message: "Product name can only contain letters",
                  },
                }))}
            value={formData.productName}
            onChange={handleOnChange}
            placeholder="Product Name"
          />
          {errors.productName && (
            <span style={{ color: "red" }}>{errors.productName.message}</span>
          )}
        </div>
        <div>
          <input
            type="text"
            name="brand"
            {...(isChanging
              ? {}
              : register("brand", {
                  required: "Brand is required",
                  pattern: {
                    //value: /^[a-zA-Z\s]+$/,
                    message: "Brand can only contain letters",
                  },
                }))}
            value={formData.brand}
            onChange={handleOnChange}
            placeholder="Brand"
          />
          {errors.brand && (
            <span style={{ color: "red" }}>{errors.brand.message}</span>
          )}
        </div>
        <div>
          <input
            type="text"
            name="image"
            {...(isChanging
              ? {}
              : register("image", {
                  required: "Image is required",
                  pattern: {
                    // Taken from https://uibakery.io/regex-library/url
                    // Verifies URL
                    //value:
                    ///^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                    message: "Invalid URL",
                  },
                }))}
            value={formData.image}
            onChange={handleOnChange}
            placeholder="Image URL"
          />
          {errors.image && (
            <span style={{ color: "red" }}>{errors.image.message}</span>
          )}
        </div>
        <div>
          <input
            type="text"
            name="price"
            {...(isChanging
              ? {}
              : register("price", {
                  required: "Price is required",
                  pattern: {
                    //value: /$+^[0-9+_.-]+$/,
                    message: "Invalid Price",
                  },
                }))}
            value={formData.price}
            onChange={handleOnChange}
            placeholder="Price"
          />
          {errors.price && (
            <span style={{ color: "red" }}>{errors.price.message}</span>
          )}
        </div>
        <br />
        <button type="submit">
          {isChanging ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}
