import React from "react";
import { render, screen } from "../../test-utils";
import "@testing-library/jest-dom/extend-expect";
import TrailerComponent from "./TrailerComponent";

describe("<TrailerComponent />", () => {
  const defaultProps = {
    src: "dQw4w9WgXcQ",
    title: "Sample Trailer",
    isError: false,
    isLoading: false,
  };

  test("renders error message if isError is true", () => {
    render(<TrailerComponent {...defaultProps} isError={true} />);
    expect(screen.getByText(/error fetching trailer/i)).toBeInTheDocument();
  });

  test("renders loading message if isLoading is true", () => {
    render(<TrailerComponent {...defaultProps} isLoading={true} />);
    expect(screen.getByText(/loading trailer/i)).toBeInTheDocument();
  });

  test("renders iframe with correct src and title", () => {
    render(<TrailerComponent {...defaultProps} />);
    const iframe = screen.getByTitle(defaultProps.title);
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      "src",
      `https://www.youtube.com/embed/${defaultProps.src}`
    );
  });

  test("iframe has required attributes", () => {
    render(<TrailerComponent {...defaultProps} />);
    const iframe = screen.getByTitle(defaultProps.title);
    expect(iframe).toHaveAttribute("allowFullScreen");
    expect(iframe).toHaveAttribute("allow", expect.stringContaining("autoplay"));
  });
});