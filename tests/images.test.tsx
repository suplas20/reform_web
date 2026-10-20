import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Image } from "../app/components/Image";

describe("image loading recovery", () => {
  it("replaces a failed image once, clears responsive sources, and retries a changed source", () => {
    const { rerender } = render(
      <Image
        src="/missing.webp"
        alt="가구"
        width={1536}
        height={1024}
        srcSet="/missing-small.webp 480w"
      />,
    );
    const image = screen.getByAltText("가구");
    fireEvent.error(image);
    expect(image.getAttribute("src")).toBe("/images/image-fallback.svg");
    expect(image.hasAttribute("srcset")).toBe(false);
    expect(image.getAttribute("width")).toBe("1536");
    fireEvent.error(image);
    expect(image.getAttribute("src")).toBe("/images/image-fallback.svg");
    rerender(
      <Image src="/replacement.webp" alt="가구" width={1536} height={1024} />,
    );
    expect(image.getAttribute("src")).toBe("/replacement.webp");
  });
});
