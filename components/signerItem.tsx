import Image from "next/image";
import SimulateSign from "./simulateSign";

const SignerItem = ({
  signer,
  documentId,
}: {
  signer: any;
  documentId: string;
}) => {
  return (
    <>
      <div className="flex py-2">
        <Image src="/icons/person.svg" width={20} height={20} alt="Signer" />
        <span className="ml-2">{signer.email}</span>

        <span className="inline-flex items-center justify-center rounded-full border border-purple-500 px-2.5 py-0.5 text-purple-700 ml-2">
          <p className="whitespace-nowrap text-sm">{signer.status}</p>
        </span>
      </div>
      <SimulateSign documentId={documentId} signerId={signer.id} />
    </>
  );
};

export default SignerItem;
