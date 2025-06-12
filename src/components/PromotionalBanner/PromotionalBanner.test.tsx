import React from "react";
import { render, screen } from "../../test-utils";
import "@testing-library/jest-dom/extend-expect";
import PromotionalBanner from "./PromotionalBanner";

describe("<PromotionalBanner />", () => {
  test("renders correctly", () => {
    render(
      <PromotionalBanner
        alt="Movie banner"
        onCloseClick={() => console.log("k")}
      />
    );
    
    expect(screen.getByAltText(/movie banner/i)).toBeInTheDocument();
  });
});
