// --------------------------NOTES----------------------------------
// Need to fix the sortBy logic such that it should work on the basis of specialPrice...
// Need to fix the minus pricing logic of the products...
// Total pages inside pagination is undefined

import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../shared/ProductCard";
import Filter from "./Filter";
import Loader from "../shared/Loader";
import useProductFilter from "../../hooks/useProductFilter";
import { useEffect } from "react";
import { fetchCategories } from "../../store/actions";
import Paginations from "../shared/Paginations";

const Products = () => {
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { products, categories, pagination } = useSelector(
    (state) => state.products,
  );
  const dispatch = useDispatch();
  useProductFilter();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // const products = [
  //   {
  //     productId: 652,
  //     productName: "Iphone Xs max",
  //     image: "https://placehold.co/600x400",
  //     description:
  //       "Experience the latest in mobile technology with advanced cameras, powerful processing, and an all-day battery.",
  //     quantity: 10,
  //     price: 1450.0,
  //     discount: 10.0,
  //     specialPrice: 1305.0,
  //   },
  //   {
  //     productId: 654,
  //     productName: "MacBook Air M2s",
  //     image: "https://placehold.co/600x400",
  //     description:
  //       "Ultra-thin laptop with Apple's M2 chip, providing fast performance in a lightweight, portable design.",
  //     quantity: 0,
  //     price: 2550.0,
  //     discount: 20.0,
  //     specialPrice: 2040.0,
  //   },
  // ];

  return (
    <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-screen[90%] 2xl:mx-auto">
      <Filter categories={categories ? categories : []} />
      {isLoading ? (
        <Loader text={"Please Wait..."} />
      ) : errorMessage ? (
        errorMessage
      ) : (
        <div className="min-h-175">
          <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2">
            {products &&
              products.map((item, i) => <ProductCard key={i} {...item} />)}
          </div>
        </div>
      )}

      <div className="flex justify-center items-center mt-3">
        <Paginations
         totalPages = {pagination?.totalPages} />
         {console.log("PAGINATIONS: " , pagination , 'Total Page : ' , pagination?.totalpages)}
         
      </div>
    </div>
  );
};

export default Products;
