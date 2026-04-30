import { FaEdit, FaImage, FaTrashAlt } from "react-icons/fa";
import Modal from "../shared/Modal";

export const adminProductTableColumns = (handleEditClick , handleDelete , handleImageUpload , handleProductView) => [
    {
      sortable: false,
      disableColumnMenu: true,
      field: "id",
      headerName: "ID",
      minWidth: 120,
      headerAlign: "center",
      align: "center",
      editable: false,
      headerClassName: "text-black font-semibold border",
      cellClassName: "text-slate-700 font-normal border text-center",
      renderHeader: (params) => <span className="text-center">Prodcut ID</span>,
    },
    {
      sortable: false,
      disableColumnMenu: true,
      field: "price",
      headerName: "price",
      minWidth: 120,
      headerAlign: "center",
      align: "center",
      editable: false,
      headerClassName: "text-black font-semibold border",
      cellClassName: "text-slate-700 font-normal border",
      renderHeader: (params) => <span>Price</span>,
    },
    {
      sortable: true,
      disableColumnMenu: true,
      field: "quantity",
      headerName: "quantity",
      minWidth: 140,
      headerAlign: "center",
      align: "center",
      editable: false,
      headerClassName: "text-black font-semibold border",
      cellClassName: "text-slate-700 font-normal border",
      renderHeader: (params) => (
        <span className="text-center">Quantity</span>
      ),
    },
    {
      sortable: false,
      disableColumnMenu: true,
      field: "specialPrice",
      headerName: "Price",
      minWidth: 160,
      headerAlign: "center",
      align: "center",
      editable: false,
      headerClassName: "text-black font-semibold border",
      cellClassName: "text-slate-700 font-normal border",
      renderHeader: (params) => <span className="text-center">Special Price</span>,
    },
    {
      sortable: false,
      disableColumnMenu: true,
      field: "description",
      headerName: "Image",
      minWidth: 260,
      headerAlign: "center",
      align: "center",
      editable: false,
      headerClassName: "text-black font-semibold border",
      cellClassName: "text-slate-700 font-normal border",
      renderHeader: (params) => <span className="text-center">Description</span>,
    },
    {
      sortable: false,
      disableColumnMenu: true,
      field: "image",
      headerName: "Image",
      minWidth: 261,
    // flex : 6,
      headerAlign: "center",
      align: "center",
      editable: false,
      headerClassName: "text-black font-semibold border",
      cellClassName: "text-slate-700 font-normal border",
      renderHeader: (params) => <span className="text-center">Image</span>,
    },
    {
      sortable: false,
      align: "center",
      disableColumnMenu: true,
      field: "action",
      headerName: "Action",
      minWidth: 490,
      headerAlign: "center",
      editable: false,
      headerClassName: "text-black font-semibold border",
      cellClassName: "text-slate-700 font-normal border",
      renderHeader: (params) => <span className="text-center">Action</span>,
      renderCell: (params) => {
        return (
          <div className="flex justify-center items-center space-x-2 h-full pt-2">
            <button className="flex items-center bg-green-500 text-white px-4 mb-2 h-9 rounded-md hover:bg-green-800"
            onClick={() => handleImageUpload(params.row)}>
            
              <FaImage className="mr-2" />
              Image
            </button>
            <button className="flex items-center bg-blue-500 text-white px-4 mb-2 h-9 rounded-md hover:bg-blue-800"
            onClick={() => handleEditClick(params.row)}>
            
              <FaEdit className="mr-2" />
              Edit
            </button>
            <button className="flex items-center bg-red-500 text-white px-4 mb-2 h-9 rounded-md hover:bg-red-900"
            onClick={() => handleDelete(params.row)}>
            
              <FaTrashAlt className="mr-2" />
              Delete
            </button>
            <button className="flex items-center bg-slate-800 text-white px-4 mb-2 h-9 rounded-md hover:bg-slate-500"
            onClick={() => handleProductView(params.row)}>
            
              <FaTrashAlt className="mr-2" />
              View
            </button>
          </div>
        );
      },
    },
  ];