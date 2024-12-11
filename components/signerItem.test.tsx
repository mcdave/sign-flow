import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SignerItem from "./signerItem";
import { useAppState } from "@/state/provider";

jest.mock("@/state/provider");

describe("SignerItem", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useAppState as jest.Mock).mockReturnValue({ dispatch: mockDispatch });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockSigner = {
    email: "test@example.com",
    status: "Pending",
    id: "1",
  };
  const mockDocumentId = "doc123";

  it("renders signer email", () => {
    render(<SignerItem signer={mockSigner} documentId={mockDocumentId} />);
    const emailElement = screen.getByText(mockSigner.email);
    expect(emailElement).toBeInTheDocument();
  });

  it("renders signer status", () => {
    render(<SignerItem signer={mockSigner} documentId={mockDocumentId} />);
    const statusElement = screen.getByText(mockSigner.status);
    expect(statusElement).toBeInTheDocument();
  });

  it("renders the Sign component with correct props", () => {
    render(<SignerItem signer={mockSigner} documentId={mockDocumentId} />);
    const simulateSignElement = screen.getByText("Sign");
    expect(simulateSignElement).toBeInTheDocument();
  });
});
