import SignatureRequest from "./signatureRequest";

import type { Document } from "@/state/provider";
import SignerItem from "./signerItem";

const DocumentItem = ({ document }: { document: Document }) => {
  return (
    <div
      key={document.id}
      className="p-4 rounded-lg mb-4 border-purple-300 border-2"
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{document.filename}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Uploaded on {new Date(document.uploadDate).toDateString()}
          </p>
        </div>
      </div>
      <div className="mt-4">
        {document.signers.length === 0 && (
          <p className="text-purple-500  p-4 text-center mb-4 bg-purple-100 rounded-lg">
            No signers yet
          </p>
        )}

        <ul className="my-4">
          {document.signers.map((signer) => (
            <li key={signer.id} className=" py-3">
              <SignerItem signer={signer} documentId={document.id} />
            </li>
          ))}
        </ul>

        <SignatureRequest documentId={document.id} />
      </div>
    </div>
  );
};

export default DocumentItem;
