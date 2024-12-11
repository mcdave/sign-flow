import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import DocumentItem from "./documentItem";
import { Document } from "@/state/provider";
import { useAppState } from "@/state/provider";

jest.mock("@/state/provider");

const mockDocument: Document = {
  id: "1",
  filename: "test-document.pdf",
  uploadDate: new Date().toISOString(),
  signers: [
    { id: "1", email: "john@example.com" },
    { id: "2", email: "jane@example.com" },
  ],
};

describe("DocumentItem", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useAppState as jest.Mock).mockReturnValue({ dispatch: mockDispatch });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders document filename", () => {
    render(<DocumentItem document={mockDocument} />);
    expect(screen.getByText("test-document.pdf")).toBeInTheDocument();
  });

  it("renders upload date", () => {
    render(<DocumentItem document={mockDocument} />);
    expect(
      screen.getByText(
        `Uploaded on ${new Date(mockDocument.uploadDate).toDateString()}`
      )
    ).toBeInTheDocument();
  });

  it("renders signers", () => {
    render(<DocumentItem document={mockDocument} />);
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
  });

  it("renders 'No signers yet' when there are no signers", () => {
    const emptySignersDocument = { ...mockDocument, signers: [] };
    render(<DocumentItem document={emptySignersDocument} />);
    expect(screen.getByText("No signers yet")).toBeInTheDocument();
  });

  it("renders SignatureRequest component", () => {
    render(<DocumentItem document={mockDocument} />);
    expect(screen.getByText("Request signer")).toBeInTheDocument();
  });
});
