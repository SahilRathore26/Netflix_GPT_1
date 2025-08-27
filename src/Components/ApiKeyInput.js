import { useState } from "react";
import lang from "../utils/languageConstant";
import { useSelector } from "react-redux";

export default function ApiKeyInput({ onSave }) {
  const [key, setKey] = useState("");
  const langKey = useSelector((store) => store.config.lang);

  const handleSave = () => {
    localStorage.setItem("openai_key", key.trim());
    onSave(key.trim());
  };

  return (
    <div className="pt-28 md:pt-28 flex justify-center">
      <form className="w-full mx-5 flex md:w-1/3">
        <input
          type="password"
          placeholder={lang[langKey].openAIKeyPlaceHolder}
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="w-3/4 p-2 px-4 m-2 h-10 border-none rounded-sm text-sm"
        />
        <button
          onClick={handleSave}
          className="m-2 p-2 px-6 h-10  hover:bg-emerald-700 bg-emerald-600 text-sm text-white ml-2 rounded-sm"
        >
          {lang[langKey].save}
        </button>
      </form>
    </div>
  );
}
