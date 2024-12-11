import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import SimulateSign from "./simulateSign";
import { useAppState } from "@/state/provider";

jest.mock("@/state/provider");

describe("SimulateSign Component", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useAppState as jest.Mock).mockReturnValue({ dispatch: mockDispatch });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render sign and decline buttons", () => {
    const { getByTitle } = render(
      <SimulateSign documentId="doc123" signerId="signer123" />
    );

    expect(getByTitle("Edit Product")).toBeInTheDocument();
    expect(getByTitle("Decline sign")).toBeInTheDocument();
  });

  it("should dispatch 'Signed' status when sign button is clicked", () => {
    const { getByTitle } = render(
      <SimulateSign documentId="doc123" signerId="signer123" />
    );

    fireEvent.click(getByTitle("Edit Product"));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "UPDATE_SIGNER_STATUS",
      payload: {
        documentId: "doc123",
        status: "Signed",
        signerId: "signer123",
      },
    });
  });

  it("should dispatch 'Declined' status when decline button is clicked", () => {
    const { getByTitle } = render(
      <SimulateSign documentId="doc123" signerId="signer123" />
    );

    fireEvent.click(getByTitle("Decline sign"));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "UPDATE_SIGNER_STATUS",
      payload: {
        documentId: "doc123",
        status: "Declined",
        signerId: "signer123",
      },
    });
  });
});
