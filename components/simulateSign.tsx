import { useAppState } from "@/state/provider";
import Image from "next/image";

type SimulateSignProps = {
  documentId: string;
  signerId: string;
};

const SimulateSign = ({ documentId, signerId }: SimulateSignProps) => {
  const { dispatch } = useAppState();

  const handleStatusChange = (status: string) => {
    dispatch({
      type: "UPDATE_SIGNER_STATUS",
      payload: { documentId, status, signerId },
    });
    console.log(
      `Notification sent: Document ${documentId} with signer ${signerId} is now ${status}`
    );
  };

  return (
    <span className="flex justify-evenly overflow-hidden rounded-md border bg-white shadow-sm w-full">
      <button
        className="w-full border-e px-1 py-2 text-gray-700 hover:bg-gray-50 focus:relative focus:bg-green-300"
        title="Edit Product"
        onClick={() => handleStatusChange("Signed")}
      >
        <Image
          src="/icons/sign.svg"
          alt="Sign"
          width={20}
          height={20}
          className="mr-2 inline-block"
        />
        Sign
      </button>

      <button
        className="w-full px-1 py-2 text-gray-700 hover:bg-gray-50 focus:relative focus:bg-red-300"
        title="Decline sign"
        onClick={() => handleStatusChange("Declined")}
      >
        <Image
          src="/icons/decline.svg"
          alt="Decline"
          width={20}
          height={20}
          className="mr-2 inline"
        />
        Decline
      </button>
    </span>
  );
};

export default SimulateSign;
