import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import OrderTable from "./OrdersTable";
import { useSelector } from "react-redux";
import useOrderFilter from "../../../hooks/useOrderFilter";

const Orders = () => {
  // const adminOrder = [
  //   {
  //     orderId: 6,
  //     email: "testUser@gmail.com",
  //     orderItems: [
  //       {
  //         orderItemId: 8,
  //         productDTO: null,
  //         quantity: 1,
  //         discount: 90.0,
  //         orderedProductPrice: 49.99,
  //       },
  //     ],
  //     orderDate: "2026-04-18",
  //     payment: {
  //       paymentId: 6,
  //       paymentMethod: "online",
  //       pgPaymentId: "pi_1234567890",
  //       pgStatus: "success",
  //       pgResponseMessage: "Payment Successful",
  //       pgName: "Stripe",
  //     },
  //     totalAmount: 49.99,
  //     orderStatus: "Order Accepted!",
  //     addressID: 8,
  //   },{
  //           "orderId": 7,
  //           "email": "testUser@gmail.com",
  //           "orderItems": [
  //               {
  //                   "orderItemId": 9,
  //                   "productDTO": null,
  //                   "quantity": 1,
  //                   "discount": 80.0,
  //                   "orderedProductPrice": 144.0
  //               }
  //           ],
  //           "orderDate": "2026-04-19",
  //           "payment": {
  //               "paymentId": 7,
  //               "paymentMethod": "online",
  //               "pgPaymentId": "pi_1234567890",
  //               "pgStatus": "success",
  //               "pgResponseMessage": "Payment Successful",
  //               "pgName": "Stripe"
  //           },
  //           "totalAmount": 144.0,
  //           "orderStatus": "Order Accepted!",
  //           "addressID": 9
  //       },
  //       {
  //           "orderId": 4,
  //           "email": "testUser@gmail.com",
  //           "orderItems": [
  //               {
  //                   "orderItemId": 4,
  //                   "productDTO": null,
  //                   "quantity": 2,
  //                   "discount": 20.0,
  //                   "orderedProductPrice": 120.0
  //               }
  //           ],
  //           "orderDate": "2026-04-18",
  //           "payment": {
  //               "paymentId": 4,
  //               "paymentMethod": "online",
  //               "pgPaymentId": "pi_1234567890",
  //               "pgStatus": "success",
  //               "pgResponseMessage": "Payment Successful",
  //               "pgName": "Stripe"
  //           },
  //           "totalAmount": 240.0,
  //           "orderStatus": "Order Accepted!",
  //           "addressID": 8
  //       },
  // ];

  // const pagination = {
  //   pageNumber: 0,
  //   pageSize: 40,
  //   totalElements: 6,
  //   totalPages: 1,
  //   lastPage: true,
  // };

  const {adminOrder , pagination} = useSelector(state => state.order)
  const emptyOrder = !adminOrder || adminOrder?.length === 0;
  useOrderFilter();

  return (
    <div className="pb-6 pt-10 flex justify-center">
      {emptyOrder ? (
        <div className="flex flex-col items-center justify-center text-gray-600 py-10">
          <FaShoppingCart size={50} className="mb-3" />
          <h2 className="text-2xl font-semibold">No Orders Placed Yet!</h2>
        </div>
      ) : (
        <div className="w-full max-w-6xl">
          <OrderTable adminOrder={adminOrder} pagination={pagination} />
        </div>
      )}
    </div>
  );
};

export default Orders;
