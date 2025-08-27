import OpenAI from "openai";

const getOpenAIClient = (apiKey) => {
  return new OpenAI({
  apiKey: apiKey, // defaults to process.env["OPENAI_API_KEY"]
  dangerouslyAllowBrowser: true,
});
};

export default getOpenAIClient;
