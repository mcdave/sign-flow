import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import InputFile from "./inputFile";
import { useAppState } from "@/state/provider";

jest.mock("@/state/provider");

describe("InputFile Component", () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    (useAppState as jest.Mock).mockReturnValue({ dispatch: dispatchMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the file input and submit button", () => {
    const { getByText, getByRole } = render(<InputFile />);
    const fileInput = getByRole("upload-document") as HTMLInputElement;
    expect(fileInput).toBeInTheDocument();
    expect(getByText(/Upload the document/i)).toBeInTheDocument();
  });

  it("should handle file upload", () => {
    const { getByText } = render(<InputFile />);
    const fileInput = getByText(/upload the document/i) as HTMLInputElement;
    const file = new File(["dummy content"], "example.pdf", {
      type: "application/pdf",
    });

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(fileInput.files?.[0]).toBe(file);
    expect(fileInput.files?.[0].name).toBe("example.pdf");
  });

  it("should dispatch action on form submit", () => {
    const { getByText, getByRole } = render(<InputFile />);
    const fileInput = getByRole("upload-document") as HTMLInputElement;
    const file = new File(["dummy content"], "example.pdf", {
      type: "application/pdf",
    });

    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.click(getByText(/upload the document/i));

    expect(dispatchMock).toHaveBeenCalledWith({
      type: "ADD_DOCUMENT",
      payload: {
        filename: "example.pdf",
        uploadDate: expect.any(String),
        signers: [],
      },
    });
  });

  it("should reset the form after submission", () => {
    const { getByText } = render(<InputFile />);
    const fileInput = getByText(/upload the document/i) as HTMLInputElement;
    const file = new File(["dummy content"], "example.pdf", {
      type: "application/pdf",
    });

    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.click(getByText(/upload the document/i));

    expect(fileInput.value).toBe("");
  });
});
