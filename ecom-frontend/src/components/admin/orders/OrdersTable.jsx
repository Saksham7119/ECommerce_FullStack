import React, { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { FaEdit } from "react-icons/fa";
import { adminOrderTableColumns } from "../../helper/TableColumn";
import Modal from "../../shared/Modal";
import UpdateOrderForm from "./UpdateOrderForm";

const OrdersTable = ({ adminOrder, pagination }) => {
  const [openModal, setOpenModal] = useState(false);
  const [updateOpenModal, setUpdateOpenModal] = useState(false);
  const [selectedItem , setSelectedItem] = useState("");
  const [loader , setLoader] = useState(false
    
  );
  const [selectedRow, setSelectedRow] = useState(null);

  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1,
  );

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathName = useLocation().pathname;
  const navigate = useNavigate();

  const tableRecords = adminOrder?.map((item) => {
    return {
      id: item.orderId,
      email: item.email,
      totalAmount: item.totalAmount,
      status: item.orderStatus,
      date: item.orderDate,
    };
  });

  const handleEditClick = (row) => {
    setSelectedRow(row); // store clicked row data
    setOpenModal(true); // open modal
    setSelectedItem(row);
  };

  const handlePagination = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathName}?${params}`);
  };

  return (
    <div>
      <h1 className="text-slate-800 text-3xl text-center font-bold pb-6 uppercase">
        All Orders
      </h1>
      <div>
        <DataGrid
          className="w-full"
          rows={tableRecords}
          columns={adminOrderTableColumns(handleEditClick)}
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
      <Modal 
        open={openModal}
        setOpen={setOpenModal}
        title="Update Order Status"
      >
        {console.log(selectedItem.id)}
        <UpdateOrderForm
        setOpen={setOpenModal}
        open={updateOpenModal}
        loader={loader}
        setLoader={setLoader}
        selectedId={selectedItem.id}
        selectedItem={selectedItem}
        />
      </Modal>
    </div>
  );
};

export default OrdersTable;
