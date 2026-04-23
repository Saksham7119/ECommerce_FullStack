import React, { useState } from "react";
import Sidebar from "./Sidebar";
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { RxCross1 } from "react-icons/rx";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    // <div>
    //   <Dialog
    //     open={sidebarOpen}
    //     onClose={() => setSidebarOpen(false)}
    //     className="relative z-50 xl:hidden"
    //   >
    //     <DialogBackdrop
    //       transition
    //       className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 transition ease-linear data-closed:opacity-0"
    //     />

    //     <div className="fixed inset-0  flex w-screen items-center justify-center">
    //       <DialogPanel
    //         transition
    //         className="relative mr-16 flex - w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
    //       >
    //         <TransitionChild>
    //           <div className="absolute left-full top-0 flex w-16 flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
    //             <button
    //               type="button"
    //               onClick={() => setSidebarOpen(false)}
    //               className="-m-2.5 p-2.5"
    //             >
    //               <span className="sr-only">Close Sidebar</span>
    //               <RxCross1 className="text-white text-2xl" />
    //             </button>
    //           </div>
    //         </TransitionChild>
    //         <Sidebar />
    //       </DialogPanel>
    //     </div>
    //   </Dialog>

    //   <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
    //     <Sidebar />
    //   </div>

    //   <div className="flex-1 xl:pl-72">
    //     <button
    //       type="button"
    //       onClick={() => setSidebarOpen(true)}
    //       className="-m-2.5 text-gray-700 xl:hidden p-4"
    //     >
    //       <span className="sr-only">Open Sidebar</span>
    //       <FaBars className="text-slate-800 text-2xl" />
    //     </button>

    //     <main>
    //       <div className="p-4 sm:p-6 xl:p-8">
    //         <Outlet />
    //       </div>
    //     </main>
    //   </div>
    // </div>

    <div className="min-h-screen bg-slate-50 flex">
      <Dialog
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        className="relative z-50 xl:hidden" /* Redesigned modern mobile drawer for small screens */
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-4 flex w-16 justify-center">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition"
                >
                  <RxCross1 className="text-gray-700 text-xl" />
                </button>
              </div>
            </TransitionChild>

            <Sidebar />
          </DialogPanel>
        </div>
      </Dialog>

      <div className="hidden xl:fixed xl:inset-y-0 xl:z-40 xl:flex xl:w-72 xl:flex-col">
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col xl:pl-72">
        <header className="sticky top-0 z-30 flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3 shadow-sm xl:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <FaBars className="text-slate-800 text-xl" />
          </button>

          <h1 className="text-base font-semibold text-gray-800">
            Admin Dashboard
          </h1>

          <div className="w-8" />
        </header>
        <main className="flex-1">
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
