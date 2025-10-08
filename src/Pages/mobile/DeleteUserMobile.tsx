import { motion } from "framer-motion";

interface DeleteUserMobileProps {
  name: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteUserMobile({
  name,
  onCancel,
  onConfirm,
}: DeleteUserMobileProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white w-[350px] rounded-xl shadow-lg p-6 text-center"
      >
        {/* Warning Icon */}
        <div className="flex justify-center mb-3">
          <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-full">
            <span className="text-red-600 text-2xl">!</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800">Delete User</h2>
        <p className="text-sm text-gray-600 mt-2">
          Are you sure you want to delete{" "}
          <span className="text-red-600 font-medium">"{name}"</span>? This
          action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
}
