"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function BlogDisplay({ error }) {
  // This effect will run when the component mounts and the error prop is passed
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return null; // You can render anything else you need here, if necessary
}
