import { useAppState } from "@/state/provider";
import DocumentItem from "./documentItem";

const SignatureActivityReport = () => {
  const { state } = useAppState();

  return (
    <div className="my-4">
      {state.documents.length === 0 && (
        <div className="text-center p-4">
          <p>No documents yet. Please upload a document to get started.</p>
        </div>
      )}

      <ul>
        {state.documents.map((doc) => (
          <DocumentItem key={doc.id} document={doc} />
        ))}
      </ul>
    </div>
  );
};

export default SignatureActivityReport;
