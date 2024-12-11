import { useAppState } from "@/state/provider";
import { useState } from "react";

const RequestSignature = ({ documentId }: { documentId: string }) => {
  const { dispatch } = useAppState();
  const [email, setEmail] = useState("");

  const handleAddSigner = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({
      type: "ADD_SIGNER",
      payload: {
        documentId,
        signer: { id: Date.now().toString(), email, status: "Pending" },
      },
    });
    setEmail("");
  };

  return (
    <form
      className="border-t-2 border-dashed pt-4 justify-between items-center flex border-purple-300"
      onSubmit={handleAddSigner}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Signer Email"
        required
        title="Please enter a valid email address (e.g., user@example.com)"
        className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-4 w-full"
      />
      <button
        type="submit"
        className="bg-purple-400 text-white rounded-lg py-2 px-2 hover:bg-purple-500 focus:border-indigo-300 ml-2 text-nowrap"
      >
        Request signer
      </button>
    </form>
  );
};

export default RequestSignature;
