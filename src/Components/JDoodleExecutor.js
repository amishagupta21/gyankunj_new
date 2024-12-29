import React, { useState } from "react";
import axios from "axios";

const JDoodleExecutor = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const executeCode = async () => {
    const requestBody = {
      script: code,
      language: "javascript", // Change to your preferred language
      versionIndex: "0",
      clientId: "ec3a6c53dc6ea51855762b1b37f4bef3", // Replace with your JDoodle client ID
      clientSecret: "64d97462bc7ea6e3f8d0e56a6ccd00a0c7ea59155ded7f263453506f40dd22df", // Replace with your JDoodle client secret
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/execute",
        requestBody
      );
      setOutput(response.data.output);
    } catch (error) {
      console.error("Error executing code:", error);
      setOutput("Error executing code");
    }
  };

  return (
    <div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows="10"
        cols="50"
        placeholder="Write your code here..."
      />
      <button onClick={executeCode}>Run Code</button>
      <pre>{output}</pre>
    </div>
  );
};

export default JDoodleExecutor;