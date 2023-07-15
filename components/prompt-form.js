import { useState } from "react";

const samplePrompts = [
  "tiiuae/falcon-7b-instruct",
  "tiiuae/falcon-40b-instruct",
  "openlm-research/open_llama_13b",
];
import sample from "lodash/sample";

export default function PromptForm(props) {
  const [prompt] = useState(sample(samplePrompts));
  const [image, setImage] = useState(null);

  return (
    <form
      onSubmit={props.onSubmit}
      className="py-5 animate-in fade-in duration-700"
    >
      <div className="flex max-w-[512px]">
        <input
          type="text"
          defaultValue={prompt}
          name="prompt"
          placeholder="Enter a Hugging Face model name..."
          className="block w-full flex-grow rounded-l-md"
        />

        <button
          className="bg-black text-white rounded-r-md text-small inline-block px-3 flex-none"
          type="submit"
        >
          FixBias
        </button>
      </div>
    </form>
  );
}
