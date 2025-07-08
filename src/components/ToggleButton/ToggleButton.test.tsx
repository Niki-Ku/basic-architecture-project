import React from "react";
import { render, screen } from "../../test-utils";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import ToggleButton from "./ToggleButton";

describe("<ToggleButton />", () => {
  const defaultProps = {
    id: "test-toggle",
    checked: false,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    defaultProps.onChange.mockClear();
  });

  test("renders hidden checkbox and label", () => {
    render(<ToggleButton {...defaultProps} />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveClass("hidden");
  });

  test("is checked when prop is true", () => {
    render(<ToggleButton {...defaultProps} checked={true} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  test("calls onChange when toggled", async () => {
    render(<ToggleButton {...defaultProps} />);
    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);
    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    await user.click(checkbox);
    expect(defaultProps.onChange).toHaveBeenCalledTimes(2);
  });
});