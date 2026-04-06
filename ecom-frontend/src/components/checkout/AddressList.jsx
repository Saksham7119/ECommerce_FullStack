import React from "react";
import { FaBuilding, FaEdit, FaMapMarkerAlt, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectUserCheckoutAddress } from "../../store/actions";

export const AddressList = ({
  address,
  setSelectedAddress,
  setOpenAddressModal,
  setOpenDeleteModal,
}) => {
  const dispatch = useDispatch();
  const { selectedUserCheckoutAddress } = useSelector((state) => state.auth);

  const handleAddressSelection = (selectedAddress) => {
    setSelectedAddress(selectedAddress)
    dispatch(selectUserCheckoutAddress(selectedAddress));
  };

  const onEditButtonHandler = (selectedAddress) => {
    setSelectedAddress(selectedAddress);
    setOpenAddressModal(true);
  };

  const onDeleteButtonHandler = (selectedAddress) => {
    setSelectedAddress(selectedAddress);
    setOpenDeleteModal(true)

  };

  return (
    <div
      className="
      w-full
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      gap-6
    "
    >
      {address?.map((addr) => {
        const id = addr.addressID;

        const isSelected = selectedUserCheckoutAddress?.addressID === id;

        return (
          <div
            key={addr.addressID}
            onClick={() => handleAddressSelection(addr)}
            className={`
              cursor-pointer
              border
              rounded-xl
              p-5
              transition
              shadow-sm hover:shadow-md
              relative
              ${
                isSelected
                  ? "border-green-600 bg-green-50"
                  : "border-gray-200 bg-white hover:border-green-400"
              }
            `}
          >
            {/* Top Row */}
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-gray-900 text-base">
                {addr.buildingName}
              </h3>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {/* Edit */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditButtonHandler(addr);
                  }}
                  className="
                    text-blue-600
                    hover:text-blue-800
                    transition
                  "
                  title="Edit Address"
                >
                  <FaEdit size={16} />
                </button>

                {/* Delete */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteButtonHandler(addr);
                  }}
                  className="
                    text-red-600
                    hover:text-red-800
                    transition
                  "
                  title="Delete Address"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            </div>

            {/* Address Details */}
            <div className="text-sm text-gray-700 space-y-1 mt-3">
              <p>{addr.street}</p>

              <p>
                {addr.city}, {addr.state}
              </p>

              <p className="font-medium">{addr.pincode}</p>

              <p>{addr.country}</p>
            </div>

            {/* Selected Badge */}
            {isSelected && (
              <span
                className="
                absolute top-3 right-3
                text-xs font-semibold
                bg-green-100 text-green-700
                px-2 py-1 rounded
              "
              >
                Selected
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
