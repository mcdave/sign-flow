"use client";

import { StateProvider } from "@/state/provider";
import InputFile from "./inputFile";
import SignatureActivityReport from "./signatureTracker";

const SignDashboard = () => {
  return (
    <StateProvider>
      <div className="w-full">
        <InputFile />
        <SignatureActivityReport />
      </div>
    </StateProvider>
  );
};

export default SignDashboard;
