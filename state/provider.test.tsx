import { reducer } from "./provider";
import { Signer, State, Action } from "./provider";

describe("reducer", () => {
  const initialState: State = { documents: [] };

  it("should add a document", () => {
    const action: Action = {
      type: "ADD_DOCUMENT",
      payload: { filename: "test.pdf", uploadDate: "2023-10-01", signers: [] },
    };
    const newState = reducer(initialState, action);
    expect(newState.documents.length).toBe(1);
    expect(newState.documents[0].filename).toBe("test.pdf");
  });

  it("should add a signer to a document", () => {
    const initialStateWithDoc: State = {
      documents: [
        {
          id: "1",
          filename: "test.pdf",
          uploadDate: "2023-10-01",
          signers: [],
        },
      ],
    };
    const signer: Signer = {
      id: "1",
      email: "test@example.com",
      status: "Pending",
    };
    const action: Action = {
      type: "ADD_SIGNER",
      payload: { documentId: "1", signer },
    };
    const newState = reducer(initialStateWithDoc, action);
    expect(newState.documents[0].signers.length).toBe(1);
    expect(newState.documents[0].signers[0].email).toBe("test@example.com");
  });

  it("should remove a signer from a document", () => {
    const initialStateWithSigner: State = {
      documents: [
        {
          id: "1",
          filename: "test.pdf",
          uploadDate: "2023-10-01",
          signers: [{ id: "1", email: "test@example.com", status: "Pending" }],
        },
      ],
    };
    const action: Action = {
      type: "REMOVE_SIGNER",
      payload: { documentId: "1", signerId: "1" },
    };
    const newState = reducer(initialStateWithSigner, action);
    expect(newState.documents[0].signers.length).toBe(0);
  });

  it("should update the status of a document", () => {
    const initialStateWithDoc: State = {
      documents: [
        {
          id: "1",
          filename: "test.pdf",
          uploadDate: "2023-10-01",
          signers: [],
        },
      ],
    };
    const action: Action = {
      type: "UPDATE_STATUS",
      payload: { documentId: "1", status: "Signed" },
    };
    const newState = reducer(initialStateWithDoc, action);
    expect(newState.documents[0].status).toBe("Signed");
  });

  it("should update the status of a signer", () => {
    const initialStateWithSigner: State = {
      documents: [
        {
          id: "1",
          filename: "test.pdf",
          uploadDate: "2023-10-01",
          signers: [{ id: "1", email: "test@example.com", status: "Pending" }],
        },
      ],
    };
    const action: Action = {
      type: "UPDATE_SIGNER_STATUS",
      payload: { documentId: "1", signerId: "1", status: "Signed" },
    };
    const newState = reducer(initialStateWithSigner, action);
    expect(newState.documents[0].signers[0].status).toBe("Signed");
  });
});
