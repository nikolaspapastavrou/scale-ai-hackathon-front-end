import { useState } from "react";
import Head from "next/head";
import PromptForm from "components/prompt-form";
import { XCircle as StartOverIcon } from "lucide-react";

import fetch from 'node-fetch';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Assembling url');
    console.log(e.target.prompt.value);

    const huggingfaceUrl = `wwww.huggingface.co/${e.target.prompt.value}`;

    console.log(huggingfaceUrl);
  
    console.log('Sending huggingface GET request');

    try {
      const response = await fetch(huggingfaceUrl);
      const body = await response.text();
      console.log('hi');
    } catch (error) {
      console.error(error);
      setError('Validation failed!');
      throw error;
    }

    const response = await fetch(huggingfaceUrl);

    console.log('Received huggingface GET response');

    if (response.status == 400 || response.status == 500) {
      console.log('Validation failed!');
      setError('Validation failed!');
      return;
    }

    console.log('Validation succeeded');

    setPredictions('Validation succeeded!');
  };

  const startOver = async (e) => {
    e.preventDefault();
    setPredictions(null);
    setError(null);
  };

  return (
    <div>
      <main className="container mx-auto p-5">
        {error && <div>{error}</div>}

        <div className="max-w-[512px] mx-auto">
          <PromptForm onSubmit={handleSubmit} />

          <div className="text-center">
            { 
            predictions && (<p>validated</p>)
            }
          </div>
        </div>
      </main>
    </div>
  );
}