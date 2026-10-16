import type { ComponentPropsWithoutRef } from "react";
import { useToast } from "./Toast";

export function DownloadButton({
  onClick,
  ...props
}: ComponentPropsWithoutRef<"button">) {
  const showToast = useToast();
  return (
    <button
      {...props}
      type="button"
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) showToast("출시 예정입니다");
      }}
    />
  );
}
