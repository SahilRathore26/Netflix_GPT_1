import { useState } from "react";

export default function ApiKeyInput({ onSave }) {
  const [key, setKey] = useState("");

  const handleSave = () => {
    localStorage.setItem("openai_key", key.trim());
    onSave(key.trim());
  };

  return (
    <div className="p-4 pt-40">
      <input
        type="password"
        placeholder="Enter your OpenAI API Key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        className="border px-2 py-1 rounded"
      />
      <button onClick={handleSave} className="ml-2 px-4 py-1 bg-blue-500 text-white rounded">
        Save
      </button>
    </div>
  );
}
