import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import defaultProductImg from "../../assets/images/defaultProduct.png"
import TruncateText from "../../utils/TruncateText";
import ProductViewModal from "../shared/ProductViewModal"

const ProductCard = ({
  productId,
  productName,
  image,
  description,
  quantity,
  price,
  discount,
  specialPrice,
}) => {
  const [openProductViewModal, setOpenProductViewModal] = useState(false);
  const [selectedViewProduct, setSelectedViewProduct] = useState("");
  const btnLoader = false;
  const isAvailable = quantity && Number(quantity) > 0;

  const handleViewProduct = (product) => {
    setSelectedViewProduct(product);
    setOpenProductViewModal(true);
  };

  return (
    <div className="border m-4 rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
      <div
        onClick={() => {
          handleViewProduct({
             id:productId,
            productName,
            image,
            description,
            quantity,
            price,
            discount,
            specialPrice
          });
        }}
        className="w-full overflow-hidden aspect-[3/2]"
      >
        <img
          src={defaultProductImg}
          alt={productName}
          className="w-full h-full cursor-pointer transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="">
          <h2
            onClick={() => {
              handleViewProduct({
                id:productId,
                productName,
                image,
                description,
                quantity,
                price,
                discount,
                specialPrice
              });
            }}
            className="text-lg font-semibold mb-2 cursor-pointer"
          >
            {TruncateText(productName , 50)}
          </h2>
        </div>
        <div className="min-h-20 max-h-20">
          <p className="text-gray-600 text-sm">{TruncateText(description , 80)}</p>
        </div>
        <div className="flex justify-between">
          {specialPrice ? (
            <div className="flex flex-col">
              <span className="text-slate-700 line-through">
                Rs {Number(price).toFixed(2)}
              </span>

              <span className="text-slate-700 font-bold text-xl">
                Rs {Number(specialPrice).toFixed(2)}
              </span>
            </div>
          ) : (
            <div>
              <span className="text-slate-700 font-bold text-xl">
                {" "}
                Rs {Number(price).toFixed(2)}
              </span>
            </div>
          )}
          <button
          disabled={!isAvailable || btnLoader}
          onClick={() => {}}
            className={`bg-blue-500 ${isAvailable ? "opacity-100 hover:bg-blue-600" : "opacity-70"}
            text-white py-2 px-3 rounded-lg items-center transition-colors duration-300 w-36 flex justify-center font-semibold`}
          >
            <FaShoppingCart className="mr-2" />
            {isAvailable ? "Add To Cart" : "Stock Out"}
          </button>
        </div>
      </div>
      <ProductViewModal
        open={openProductViewModal}
        setOpen = {setOpenProductViewModal}
        product = {selectedViewProduct}
        isAvailable = {isAvailable}
      />
    </div>
  );
};

export default ProductCard;
