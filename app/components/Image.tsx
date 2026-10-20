import { useState, type ImgHTMLAttributes } from "react";
import sizes from "../data/image-sizes.json";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> & {
  src: string;
  alt: string;
};

export function Image({
  src,
  alt,
  width,
  height,
  loading,
  fetchPriority,
  onError,
  srcSet,
  sizes: displaySizes = "(max-width: 760px) 100vw, 760px",
  decoding = "async",
  ...props
}: Props) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const failed = failedSource === src;
  const dimensions = sizes[src as keyof typeof sizes];
  return (
    <img
      {...props}
      src={failed ? "/images/image-fallback.svg" : src}
      srcSet={failed ? undefined : (srcSet ?? dimensions?.srcSet)}
      sizes={failed ? undefined : displaySizes}
      alt={alt}
      width={width ?? dimensions?.width}
      height={height ?? dimensions?.height}
      loading={loading ?? (fetchPriority === "high" ? "eager" : "lazy")}
      fetchPriority={fetchPriority}
      decoding={decoding}
      onError={(event) => {
        if (!failed) setFailedSource(src);
        onError?.(event);
      }}
    />
  );
}
