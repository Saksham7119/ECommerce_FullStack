import React from "react";

// Pure React + Tailwind CSS (No lucide-react or external icon libraries)

export const OrderSummary = ({ totalPrice, cart, address, paymentMethod }) => {
  const productsTotal = cart?.reduce(
    (acc, item) => acc + item.specialPrice * item.quantity,
    0
  );

  const tax = (productsTotal * 0.05).toFixed(2);
  console.log("Total Price - " + totalPrice);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT SECTION */}
        <div className="lg:col-span-8 space-y-8">
          {/* Billing Address */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-7 hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-slate-800 mb-5 border-b pb-3">
              Billing Address
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-slate-700 text-sm">
              <p>
                <span className="font-medium text-slate-900">Building:</span>{" "}
                {address?.buildingName}
              </p>
              <p>
                <span className="font-medium text-slate-900">Street:</span>{" "}
                {address?.street}
              </p>
              <p>
                <span className="font-medium text-slate-900">City:</span>{" "}
                {address?.city}
              </p>
              <p>
                <span className="font-medium text-slate-900">State:</span>{" "}
                {address?.state}
              </p>
              <p>
                <span className="font-medium text-slate-900">Pincode:</span>{" "}
                {address?.pincode}
              </p>
              <p>
                <span className="font-medium text-slate-900">Country:</span>{" "}
                {address?.country}
              </p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-7 hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-slate-800 mb-5 border-b pb-3">
              Payment Method
            </h2>

            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl px-5 py-4">
              <span className="text-slate-700 font-medium">
                Selected Method
              </span>

              <span className="px-4 py-1.5 text-sm font-semibold bg-white text-indigo-600 border border-indigo-200 rounded-full capitalize shadow-sm">
                {paymentMethod || "Not Selected"}
              </span>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-7 hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-slate-800 mb-6 border-b pb-3">
              Order Items
            </h2>

            <div className="space-y-5">
              {cart?.map((item) => (
                <div
                  key={item?.productId}
                  className="flex items-center justify-between bg-slate-50 hover:bg-white border border-slate-200 rounded-2xl p-5 transition-all duration-200 hover:shadow-sm"
                >
                  <div className="flex items-center gap-5">
                    <img
                      src={`${import.meta.env.VITE_BACK_END_URL}/images${item?.image}`}
                      alt="Product"
                      className="w-20 h-20 object-cover rounded-xl border border-slate-200"
                    />

                    <div>
                      <p className="font-semibold text-slate-900 text-base">
                        {item?.productName}
                      </p>

                      <p className="text-sm text-slate-500 mt-1">
                        Quantity: {item?.quantity}
                      </p>

                      <p className="text-sm text-slate-400">
                        Unit Price: ₹{item?.specialPrice}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-slate-500">Subtotal</p>
                    <p className="font-semibold text-lg text-slate-900">
                      ₹{item?.specialPrice * item?.quantity}
                    </p>
                  </div>
                </div>
              ))}

              {cart?.length === 0 && (
                <p className="text-center text-slate-500 py-6">
                  No items in cart
                </p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SECTION - ORDER SUMMARY */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-7 sticky top-24">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 text-slate-700 text-sm">
              <div className="flex justify-between">
                <span>Products</span>
                <span className="font-medium">₹{productsTotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax (5%)</span>
                <span className="font-medium">₹{tax}</span>
              </div>

              <div className="border-t border-dashed border-slate-300 my-4" />

              <div className="flex justify-between text-lg font-semibold text-slate-900">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>

            <button className="mt-8 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3.5 rounded-2xl shadow-md transition-all duration-200 active:scale-[0.98]">
              Place Order
            </button>

            <p className="text-xs text-slate-400 text-center mt-4">
              Secure checkout powered by encrypted payment gateway
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
