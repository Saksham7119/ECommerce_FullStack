import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Divider } from "@mui/material";
import { MdClose, MdDone } from "react-icons/md";
import Status from "../shared/Status";
import defaultProductImg from "../../assets/images/defaultProduct.png"

export default function ProductViewModal({
  open,
  setOpen,
  product,
  isAvailable,
}) {
  const {
    id,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice,
  } = product;
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Dialog
        open={open}
        as="div"
        className="relative z-10 "
        onClose={() => setOpen(false)}
        __demoMode
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-500 opacity-70 transition-opacity" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all md:max-w-155 w-100"
            >
              {image && (
                <div className="flex justify-center aspect-[3/2 w-100">
                  <img src = {defaultProductImg} alt={productName} className="w-full" />
                </div>
              )}
              <div className="px-6 pt-10 pb-2">
                <DialogTitle
                  as="h1"
                  className="lg:text-3xl sm:text-2xl text-xl font-semibold leading-6 text-gray-800 mb-4"
                >
                  {productName}
                </DialogTitle>
                <div className="space-y-2 text-gray-700 pb-4">
                  <div className="flex items-center justify-between gap-2">
                    {specialPrice ? (
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-slate-400 line-through">
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

                    {isAvailable ? (
                        <Status
                          text = "In Stock"
                          icon = {MdDone}
                          bg = "bg-teal-200"
                          color = "text-teal-900"
                      />
                    ) : (
                      <Status
                          text = "Out Of Stock"
                          icon = {MdClose}
                          bg = "bg-rose-200"
                          color = "text-rose-700"
                      />
                    )}
                  </div>
                  <Divider />
                  <p className="mt-3
                  ">{description}</p>
                </div>
              </div>

              <Button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-700 border-3 hover:text-slate-800 hover:border-slate-800 rounded-md mb-3 ms-80"
              >
                Close
              </Button>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
