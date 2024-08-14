import React, { useEffect, useState } from "react";
import { useFileContext } from "../FileContext";
import axios from "axios";

const FileContent = () => {
  const { openFile } = useFileContext();

  const [fileData, setFileData] = useState({
    fileName: openFile,
    fileContent: "",
  });

  const setData = async () => {
    const response = await axios.post("/api/updateFile", { fileData });
    return response;
  };

  const fileDataHandler = (e) => {
    const { name, value } = e.target;

    setFileData((prevState) => ({
      ...prevState,
      [name]: value,
      fileName: openFile,
    }));

    let interval;
    (function(){
      clearTimeout(interval)
      interval = setTimeout(()=>{
        setData();
      }, 500)
    })()
  };


  useEffect(() => {
    if (openFile) {
      const readFile = async () => {
        const response = await axios.get(`/api/readFile/${openFile}`);
        setFileData({
          ["openFile"]:openFile,
          ["fileContent"]:response.data.data
        })
        return 
      };
      readFile();
    }
  }, [fileData.fileContent, openFile]);

  return (
    <div className="w-full text-gray-300 relative">
      <div className="header py-1.5 border-b-[1px] text-gray-300 bg-[#191D17] px-2 relative z-20">
        {openFile ? openFile : "No file Open"}
      </div>
      <textarea
        name="fileContent"
        className="absolute top-0 h-full w-full resize-none bg-gray-800 outline-none px-2 pt-10 py-3 z-10 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300"
        onChange={fileDataHandler}
        value={!openFile ? "No file Selected" : fileData.fileContent}
        disabled={!openFile}
      ></textarea>
    </div>
  );
};

export default FileContent;
