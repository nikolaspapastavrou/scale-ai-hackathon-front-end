import { useState } from "react";
import Head from "next/head";
import PromptForm from "components/prompt-form";
import { XCircle as StartOverIcon } from "lucide-react";
import { ReactSketchCanvas } from "react-sketch-canvas";

import fetch from 'node-fetch';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(null);
  const [fixGenderBias, setFixGenderBias] = useState(false);
  const [fixRacialBias, setFixRacialBias] = useState(false);
  const [fixHeteronormativeBias, setFixHeteronormativeBias] = useState(false);
  const [fixXenophobicBias, setFixXenophobicBias] = useState(false);

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
    setPredictions(undefined);
    setError(null);
  };

  return (
    <div>
      <main className="container mx-auto p-5">
        {error && <div>{error}</div>}

        <div className="max-w-[512px] mx-auto">
          <PromptForm onSubmit={handleSubmit} />
        </div>

        <div className="max-w-[512px] mx-auto">
          <p>Select model bias to fix:</p>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div className="pretty">
    <input type="checkbox" onChange={e => setFixGenderBias(!fixGenderBias)}/>
    <div className="state">
      <label>Gender Bias</label>
    </div>
  </div> 
  <div className="pretty">
    <input type="checkbox" onChange={e => setFixRacialBias(!fixRacialBias)}/>
    <div className="state">
      <label>Racial Bias</label>
    </div>
  </div> 
  <div className="pretty">
    <input type="checkbox" onChange={e => setFixHeteronormativeBias(!fixHeteronormativeBias)}/>
    <div className="state">
      <label>Heteronormative Bias</label>
    </div>
  </div> 
  <div className="pretty">
    <input type="checkbox" onChange={e => setFixXenophobicBias(!fixXenophobicBias)}/>
    <div className="state">
      <label>Xenophobic Bias</label>
    </div>
  </div> 
          </div>
        </div>
        <textarea name="comments" id="comments"></textarea>
      </main>
    </div>
  );
}