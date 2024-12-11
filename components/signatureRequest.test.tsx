import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RequestSignature from "./signatureRequest";
import { useAppState } from "@/state/provider";

jest.mock("@/state/provider");

describe("RequestSignature Component", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useAppState as jest.Mock).mockReturnValue({ dispatch: mockDispatch });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders input and button", () => {
    render(<RequestSignature documentId="123" />);
    expect(screen.getByPlaceholderText("Signer Email")).toBeInTheDocument();
    expect(screen.getByText("Request signer")).toBeInTheDocument();
  });

  it("updates email state on input change", () => {
    render(<RequestSignature documentId="123" />);
    const input = screen.getByPlaceholderText("Signer Email");
    fireEvent.change(input, { target: { value: "test@example.com" } });
    expect(input).toHaveValue("test@example.com");
  });

  it("dispatches ADD_SIGNER action on form submit", () => {
    render(<RequestSignature documentId="123" />);
    const input = screen.getByPlaceholderText("Signer Email");
    const button = screen.getByText("Request signer");

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "ADD_SIGNER",
      payload: {
        documentId: "123",
        signer: expect.objectContaining({
          email: "test@example.com",
          status: "Pending",
        }),
      },
    });
    expect(input).toHaveValue("");
  });
});
