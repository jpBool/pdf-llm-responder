"use client";

import { useState } from "react";

export default function PdfUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // get the selected file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    
    if (selectedFile) {
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
      } else {
        alert("Please select only PDF files.");
        e.target.value = ""; 
      }
    }
  };

  // send to backend
  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);

    try {

      const formData = new FormData();
      formData.append("pdfFile", file);

      const response = await fetch(`http://127.0.0.1:8000/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      if(response.ok){
        const res = await response.json();
        console.log(res);
      }

      // Simulating upload time
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      
      alert(`The file ${file.name} was imported successfully!`);
      setFile(null); 
    } catch (error) {
      console.error("Error during upload:", error);
      alert("Failed to import the file.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Import PDF</h2>
      

      <div className="flex flex-col items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to Upload</span>
            </p>
            <p className="text-xs text-gray-500">Only PDF (MAX. 10MB)</p>
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept="application/pdf" 
            onChange={handleFileChange}
          />
        </label>
      </div>

   
      {file && (
        <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-md text-sm">
          Selected file: <strong>{file.name}</strong> ({(file.size / 1024 / 1024).toFixed(2)} MB)
        </div>
      )}

      
      <button
        onClick={handleUpload}
        disabled={!file || isUploading}
        className={`mt-6 w-full py-2 px-4 rounded-md text-white font-medium transition-colors
          ${!file || isUploading 
            ? "bg-gray-400 cursor-not-allowed" 
            : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        {isUploading ? "Importing..." : "Import File"}
      </button>
    </div>
  );
}