"use client";
import React, { createContext, useReducer, useContext, ReactNode } from "react";

// Types
type Signer = {
  id: string;
  email: string;
  status: "Pending" | "Signed" | "Declined";
};
export type Document = {
  id: string;
  filename: string;
  uploadDate: string;
  signers: Signer[];
};

type State = {
  documents: Document[];
};

type Action =
  | { type: "ADD_DOCUMENT"; payload: Omit<Document, "id"> }
  | { type: "ADD_SIGNER"; payload: { documentId: string; signer: Signer } }
  | { type: "REMOVE_SIGNER"; payload: { documentId: string; signerId: string } }
  | { type: "UPDATE_STATUS"; payload: { documentId: string; status: string } }
  | {
      type: "UPDATE_SIGNER_STATUS";
      payload: { documentId: string; status: string; signerId: string };
    };

const initialState: State = { documents: [] };

// Reducer
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_DOCUMENT":
      return {
        ...state,
        documents: [
          ...state.documents,
          { id: Date.now().toString(), ...action.payload },
        ],
      };
    case "ADD_SIGNER":
      return {
        ...state,
        documents: state.documents.map((doc) =>
          doc.id === action.payload.documentId
            ? { ...doc, signers: [...doc.signers, action.payload.signer] }
            : doc
        ),
      };
    case "REMOVE_SIGNER":
      return {
        ...state,
        documents: state.documents.map((doc) =>
          doc.id === action.payload.documentId
            ? {
                ...doc,
                signers: doc.signers.filter(
                  (signer) => signer.id !== action.payload.signerId
                ),
              }
            : doc
        ),
      };
    case "UPDATE_STATUS":
      return {
        ...state,
        documents: state.documents.map((doc) =>
          doc.id === action.payload.documentId
            ? { ...doc, status: action.payload.status }
            : doc
        ),
      };
    case "UPDATE_SIGNER_STATUS":
      return {
        ...state,
        documents: state.documents.map((doc) =>
          doc.id === action.payload.documentId
            ? {
                ...doc,
                signers: doc.signers.map((signer) =>
                  signer.id === action.payload.signerId
                    ? {
                        ...signer,
                        status: action.payload.status as Signer["status"],
                      }
                    : signer
                ),
              }
            : doc
        ),
      };
    default:
      return state;
  }
}

// Context
const StateContext = createContext<
  { state: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

// Provider
export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

// Custom Hook
export const useAppState = () => {
  const context = useContext(StateContext);
  if (!context)
    throw new Error("useAppState must be used within a StateProvider");
  return context;
};

export { reducer };
