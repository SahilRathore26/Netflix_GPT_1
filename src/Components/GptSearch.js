import { useEffect, useState } from "react";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";
import ApiKeyInput from "./ApiKeyInput";

const GptSearch = () => {
  const [apiKey, setApiKey] = useState(null);

  useEffect(() => {
    const savedKey = localStorage.getItem("openai_key");
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  return (
    <div className="w-full min-h-screen">
      {!apiKey ? (
        <ApiKeyInput onSave={setApiKey} />
      ) : (
        <>
          <GptSearchBar apiKey={apiKey} />
          <GptMovieSuggestions />
        </>
      )}
    </div>
  );
};

export default GptSearch;

