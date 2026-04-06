import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaAddressBook } from "react-icons/fa";
import { AddressInfoModal } from "./AddressInfoModal";
import { AddAddressForm } from "./AddAddressForm";
import { useDispatch, useSelector } from "react-redux";
import { AddressList } from "./AddressList";
import { DeleteModal } from "./DeleteModal";
import toast from "react-hot-toast";
import { deleteUserAddress } from "../../store/actions";

export const AddressInfo = ({ address }) => {
  const noAddressExist = !address || address.length == 0;
  // const isLoading = false
  const { isLoading, btnLoader } = useSelector((state) => state.errors);
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const dispatch = useDispatch()

  const addNewAddressHandler = () => {
    setSelectedAddress("");
    setOpenAddressModal(true);
  };

  const onDeleteAddressHandler= () => {
    dispatch(deleteUserAddress(
      toast,
      selectedAddress?.addressID,
      setOpenDeleteModal
    ))
  }

  useEffect(() => {
  console.log("Updated Address State:", selectedAddress);
}, [selectedAddress]);

  return (
    <div className="pt-4">
      {noAddressExist ? (
        <div className="p-6 rounded-lg max-w-md mx-auto flex flex-col items-center justify-center">
          <FaAddressBook size={50} className="text-gray-500 mb-4" />

          <h1 className="mb-2 text-slate-900 text-center font-semibold text-2xl">
            No Billing Address Added!
          </h1>
          <p className="mb-6 text-slate-700 text-center">
            Please add your billing address to continue
          </p>

          <button
            onClick={addNewAddressHandler}
            className="px-6 py-4 bg-custom-gradient text-white rounded-lg font-semibold"
          >
            Add Address
          </button>
        </div>
      ) : (
        <div className="relative p-6 rounded-lg w-full max-w-7xl mx-auto">
          <h1 className="text-slate-800 text-center font-bold text-2xl">
            Select Address
          </h1>
          {isLoading ? (
            <div>
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            </div>
          ) : (
            <div className=" pt-6 w-full">
              <AddressList
                address={address}
                // setSelectedAddress={setSelectedAddress}
                setSelectedAddress={(val) => {
                  setSelectedAddress(val);
                }}
                setOpenAddressModal={setOpenAddressModal}
                setOpenDeleteModal={setOpenDeleteModal}
              />
            </div>
          )}
          <button
            onClick={addNewAddressHandler}
            className="px-6 py-4 bg-custom-gradient text-white rounded-lg font-semibold mt-5"
          >
            Add Address
          </button>
        </div>
      )}
      <AddressInfoModal open={openAddressModal} setOpen={setOpenAddressModal}>
        <AddAddressForm
          address={selectedAddress}
          setOpenAddressModal={setOpenAddressModal}
        />
      </AddressInfoModal>

      <DeleteModal
        isOpen={openDeleteModal}
        loader={btnLoader}
        setIsOpen={setOpenDeleteModal}
        title="Delete Address"
        onDeleteHandler={onDeleteAddressHandler}
      />
    </div>
  );
};
