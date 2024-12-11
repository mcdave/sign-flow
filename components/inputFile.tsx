"use client";
import React, { useState } from "react";
import { useAppState } from "@/state/provider";

const InputFile: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const { dispatch } = useAppState();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file) {
      dispatch({
        type: "ADD_DOCUMENT",
        payload: {
          filename: file.name,
          uploadDate: new Date().toISOString(),
          signers: [],
        },
      });
      setFile(null);
      (event.target as HTMLFormElement).reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 lg:p-10 shadow-md rounded-lg bg-white dark:bg-slate-900 dark:text-white"
    >
      <input
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        onChange={handleFileUpload}
        className="border-dashed p-4 rounded-lg w-full mb-4 border-gray-300 dark:border-gray-700 border-opacity-50 border-2"
        role="upload-document"
      />
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-purple-600 text-white rounded-lg py-2 px-3 hover:bg-purple-700 w-full md:w-auto"
        >
          Upload the document
        </button>
      </div>
    </form>
  );
};

export default InputFile;
