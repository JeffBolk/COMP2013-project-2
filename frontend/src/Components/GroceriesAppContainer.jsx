import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CartContainer from "./CartContainer";
import ProductsContainer from "./ProductsContainer";
import ProductForm from "./ProductForm";
import NavBar from "./NavBar";

// Jeffrey Bolk
//Groceries App Container component with handlers

export default function GroceriesAppContainer() {
  // States
  // Store all products data
  const [productData, setProductData] = useState([]);
  // Store Form Data
  const [formData, setFormData] = useState({
    id: "",
    productName: "",
    brand: "",
    image: "",
    price: "",
  });
  // Store product quantities
  const [productQuantity, setProductQuantity] = useState([]);
  // Store response
  const [postResponse, setPostResponse] = useState("");
  // Store editing status
  const [isChanging, setIsChanging] = useState(false);
  // Store cart products
  const [cartList, setCartList] = useState([]);

  // Effects
  // Fetch data on load and after each change
  useEffect(() => {
    handleProductsDB();
  }, [postResponse]);

  // Set quantities when product data changes
  useEffect(() => {
    setProductQuantity(() => {
      handleQuantity();
    });
  }, [productData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Set quantity
  const handleQuantity = () => {
    const quantity = productData.map((product) => ({
      id: product.id,
      quantity: 1,
    }));
    setProductQuantity(quantity);
  };

  // Fetch data
  const handleProductsDB = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      setProductData(response.data);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  // Set form data on change
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault;
    try {
      // If editing
      if (isChanging) {
        try {
          await handleUpdate(
            formData.id !== undefined ? formData.id : formData._id
          );
          await setIsChanging(false);
          // Reset
          await setFormData({
            id: "",
            productName: "",
            brand: "",
            image: "",
            price: "",
          });
        } catch (error) {
          console.log(error.message);
        }
      }
      // If adding
      else {
        await axios
          .post("http://localhost:3000/add-product", formData)
          .then((response) => {
            setPostResponse(response.data.message);
          });
        // Reset
        setFormData({
          id: "",
          productName: "",
          brand: "",
          image: "",
          price: "",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Edit product
  const handleEdit = async (product) => {
    setIsChanging(true);
    setFormData({
      id: product._id,
      productName: product.productName,
      brand: product.brand,
      image: product.image,
      price: product.price,
    });
  };

  // Update product
  const handleUpdate = async (id) => {
    try {
      await axios
        .patch(`http://localhost:3000/products/${id}`, formData)
        .then((response) => {
          setPostResponse(response.data.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`http://localhost:3000/products/${id}`)
        .then((response) => {
          setPostResponse(response.data.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Add to quantity
  const handleAddQuantity = (productId, mode) => {
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product._id === productId || product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setCartList(newCartList);
      return;
    } else if (mode === "product") {
      const newProductQuantity = productQuantity.map((product) => {
        if (product._id === productId || product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
      return;
    }
  };

  // Remove from quantity
  const handleRemoveQuantity = (productId, mode) => {
    // Changing cart
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product.id === productId && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setCartList(newCartList);
      return;
    }
    // Changing product
    else if (mode === "product") {
      const newProductQuantity = productQuantity.map((product) => {
        if (product.id === productId && product.quantity > 0) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
      return;
    }
  };

  // Add to cart
  const handleAddToCart = (productId) => {
    const product = productData.find((product) => product.id === productId);
    const pQuantity = productQuantity.find(
      (product) => product.id === productId
    );
    const newCartList = [...cartList];
    const productInCart = newCartList.find(
      (product) => product.id === productId
    );
    if (productInCart) {
      productInCart.quantity += pQuantity.quantity;
    } else if (pQuantity.quantity === 0) {
      alert(`Please select quantity for ${product.productName}`);
    } else {
      newCartList.push({ ...product, quantity: pQuantity.quantity });
    }
    setCartList(newCartList);
  };

  // Remove from cart
  const handleRemoveFromCart = (productId) => {
    const newCartList = cartList.filter((product) => product.id !== productId);
    setCartList(newCartList);
  };

  // Clear cart
  const handleClearCart = () => {
    setCartList([]);
  };

  return (
    <div>
      <NavBar quantity={cartList.length} />
      {/*Form Component*/}
      <ProductForm
        isChanging={isChanging}
        formData={formData}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
      />

      {/*Response Element*/}
      <p>{postResponse}</p>

      <div className="GroceriesApp-Container">
        {/*Products Component*/}
        <ProductsContainer
          productData={productData}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          productQuantity={productQuantity}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />

        {/*Cart Component*/}
        <CartContainer
          cartList={cartList}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleClearCart={handleClearCart}
        />
      </div>
    </div>
  );
}
