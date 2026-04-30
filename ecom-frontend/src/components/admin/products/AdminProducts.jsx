import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MdAddShoppingCart } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import Spinners from "../../shared/Spinners";
import Loader from "../../shared/Loader";
import OrdersTable from "../orders/OrdersTable";
import { adminProductTableColumns } from "../../helper/adminProductTableColumn";
import { DataGrid } from "@mui/x-data-grid";

const AdminProducts = () => {
  const products = [
    {
      productId: 102,
      productName: "Water Bottle",
      description: "A plastic water bottle for school going kids...",
      image: "http://localhost:8080/images/default.png",
      quantity: 4,
      price: 500.0,
      discount: 90.0,
      specialPrice: 49.99,
    },
    {
      productId: 152,
      productName: "Notebook",
      description: "200 pages ruled notebook for students",
      image: "http://localhost:8080/images/default.png",
      quantity: 18,
      price: 120.0,
      discount: 10.0,
      specialPrice: 108.0,
    },
    {
      productId: 154,
      productName: "Pencil Box",
      description: "Plastic pencil box with compartments",
      image: "http://localhost:8080/images/default.png",
      quantity: 10,
      price: 150.0,
      discount: 20.0,
      specialPrice: 120.0,
    },
    {
      productId: 161,
      productName: "Data Structures Book",
      description: "Complete guide to DSA with examples",
      image: "http://localhost:8080/images/default.png",
      quantity: 8,
      price: 720.0,
      discount: 80.0,
      specialPrice: 144.0,
    },
  ];
  const pagination = {
    pageNumber: 0,
    pageSize: 10,
    totalElements: 16,
    totalpages: 2,
    lastPage: false,
  };
  const emptyProduct = !products || products?.length === 0;
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const [currentPage , setCurrentPage] = useState(pagination?.pageNumber + 1 || 1)

  const tableRecords = products?.map((item) => {
    return {
      id: item.productId,
      productName: item.productName,
      description: item.description,
      discount: item.discount,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
      specialPrice: item.specialPrice,
    };
  });

  const handleEditClick = () => {};
  const handleDelete = () => {};
  const handleProductView = () => {};
  const handleImageUpload = () => {};
  const handlePagination = (paginationModel) => {};

  return (
    <div className="w-full min-w-0">
      <div className="pt-6 pb-10 flex justify-end ">
        <button className="bg-customBlue hover:bg-blue-800 text-white font-semibold py-2 px-4 flex items-center gap-2 rounded-md shadow-md transition-colors duration-300 hover:text-slate-300">
          <MdAddShoppingCart className="text-xl" />
          Add Product
        </button>
      </div>
      {!emptyProduct && (
        <h1 className="text-slate-800 text-3xl text-center font-bold pb-6 uppercase">
          All Products
        </h1>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {emptyProduct ? (
            <div className="flex flex-col items-center justify-center text-gray-600 py-10">
              <FaBoxOpen size={50} className="mb-3" />
              <h2 className="text-2xl font-semibold">No products created</h2>
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <DataGrid
                autoHeight
                rows={tableRecords}
                columns={adminProductTableColumns(
                  handleEditClick,
                  handleDelete,
                  handleImageUpload,
                  handleProductView,
                )}
                paginationMode="server"
                rowCount={pagination?.totalElements || 0}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: pagination?.pageSize || 10,
                      page: currentPage - 1,
                    },
                  },
                }}
                onPaginationModelChange={handlePagination}
                // pageSizeOptions={pagination?.pageSize || 10}
                disableRowSelectionOnClick
                disableColumnResize
                paginationOptions={{
                  showFirstButton: true,
                  showLastButton: false,
                  hideNextButton: currentPage === pagination?.totalPages,
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminProducts;
