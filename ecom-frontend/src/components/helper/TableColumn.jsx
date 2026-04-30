import { FaEdit } from "react-icons/fa";
import Modal from "../shared/Modal";

export const adminOrderTableColumns = (handleEditClick) => [
    {
      sortable: false,
      disableColumnMenu: true,
      field: "id",
      headerName: "orderId",
      minWidth: 180,
      headerAlign: "center",
      align: "center",
      editable: false,
      headerClassName: "text-black font-semibold border",
      cellClassName: "text-slate-700 font-normal border text-center",
      renderHeader: (params) => <span className="text-center">Order ID</span>,
    },
    {
      sortable: false,
      disableColumnMenu: true,
      field: "email",
      headerName: "Email",
      minWidth: 200,
      headerAlign: "center",
      align: "center",
      editable: false,
      headerClassName: "text-black font-semibold border",
      cellClassName: "text-slate-700 font-normal border",
      renderHeader: (params) => <span>Email</span>,
    },
    {
      sortable: true,
      disableColumnMenu: true,
      field: "totalAmount",
      headerName: "Total Amount",
      minWidth: 200,
      headerAlign: "center",
      align: "center",
      editable: false,
      headerClassName: "text-black font-semibold border",
      cellClassName: "text-slate-700 font-normal border",
      renderHeader: (params) => (
        <span className="text-center">Total Amount</span>
      ),
    },
    {
      sortable: false,
      disableColumnMenu: true,
      field: "status",
      headerName: "Status",
      minWidth: 200,
      headerAlign: "center",
      align: "center",
      editable: false,
      headerClassName: "text-black font-semibold border",
      cellClassName: "text-slate-700 font-normal border",
      renderHeader: (params) => <span className="text-center">Status</span>,
    },
    {
      sortable: false,
      disableColumnMenu: true,
      field: "date",
      headerName: "Order Date",
      minWidth: 200,
      headerAlign: "center",
      align: "center",
      editable: false,
      headerClassName: "text-black font-semibold border",
      cellClassName: "text-slate-700 font-normal border",
      renderHeader: (params) => <span className="text-center">Order Date</span>,
    },
    {
      sortable: false,
      align: "center",
      disableColumnMenu: true,
      field: "action",
      headerName: "Action",
      minWidth: "450",
      headerAlign: "center",
      editable: false,
      headerClassName: "text-black font-semibold border",
      cellClassName: "text-slate-700 font-normal border",
      renderHeader: (params) => <span className="text-center">Action</span>,
      renderCell: (params) => {
        return (
          <div className="flex justify-center items-center space-x-2 h-full pt-2">
            <button className="flex items-center bg-blue-500 text-white px-4 mb-2 h-9 rounded-md  hover:bg-blue-800"
            onClick={() => handleEditClick(params.row)}>
            
              <FaEdit className="mr-2" />
              Edit
            </button>
          </div>
        );
      },
    },
  ];