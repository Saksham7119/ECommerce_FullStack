import { 
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";

export const DeleteModal = ({ 
    isOpen,
    setIsOpen,
    title,
    onDeleteHandler,
    loader,
}) => {

  return (
    <>

      {/* Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4"
      >
        <DialogPanel className="max-w-lg space-y-4 bg-white p-6 rounded-lg shadow-lg">
          <DialogTitle className="text-lg font-bold text-red-600">
            Confirm Deletion
          </DialogTitle>

          <Description className="text-gray-600">
            This action cannot be undone.
          </Description>

          <p className="text-gray-700">
            Are you sure you want to delete this Address?
          </p>

          <div className="flex justify-end gap-4 pt-4">
            <button
            disabled = {loader}
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
            disabled={loader}
              onClick={onDeleteHandler}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              {loader ? "Loading..." : "Delete"}
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
};