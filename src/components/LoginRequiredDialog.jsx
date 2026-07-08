import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";

export function LoginRequiredDialog({ open, onOpenChange }) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>
        <AlertDialogTitle className="text-center text-2xl font-semibold text-[#222] mb-6">
          Create an account to continue
        </AlertDialogTitle>
        <button
          type="button"
          className="mb-4 w-full rounded-full bg-[#2A2A2A] py-3 text-sm font-medium text-white hover:bg-black transition-colors"
        >
          Create account
        </button>
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <button
            type="button"
            className="font-semibold text-[#222] underline underline-offset-2"
          >
            Log in
          </button>
        </p>
      </AlertDialogContent>
    </AlertDialog>
  );
}
