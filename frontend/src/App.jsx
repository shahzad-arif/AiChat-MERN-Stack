import { useState } from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState("");

  const makeRequestAPI = async (prompt) => {
    const res = await axios.post('http://localhost:4000/generate', { prompt });
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: makeRequestAPI,
    mutationKey: ['gemini-ai-request'],
  });

  const submitHandler = (e) => {
    e.preventDefault();
    mutation.mutate(prompt);
  };

  const formatResponse = (data) => {
    const codeRegex = /```(\w+)\s([\s\S]+?)```/g;
    const matches = [...data.matchAll(codeRegex)];

    if (matches.length === 0) {
      const formattedText = data.split(/(\*\*\*|\*\*)/g).map((text, index) => {
        if (text === '***') {
          return <b key={index}></b>;
        } else if (text === '**') {
          return <b key={index}></b>;
        } else if (index % 4 === 2) {
          return <span key={index} className='font-bold text-blue-500'>{text}</span>;
        } else if (index % 4 === 3) {
          return <span key={index} className='font-bold text-green-500'>{text}</span>;
        }
        return text;
      });

      return <p className='text-gray-700'>{formattedText}</p>;
    }

    return matches.map((match, index) => {
      const language = match[1];
      const code = match[2];
      return (
        <div key={index} className='mb-4'>
          <SyntaxHighlighter language={language} style={okaidia}>
            {code}
          </SyntaxHighlighter>
        </div>
      );
    });
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <header className='text-4xl font-bold text-blue-600 mb-4'>
        React + Node Chat Bot
      </header>
      <p className='text-lg text-gray-700 mb-8'>
        Enter a prompt and let AI write content for you
      </p>
      <form className='bg-white p-6 rounded-lg shadow-md w-full max-w-md' onSubmit={submitHandler}>
        <label htmlFor="prompt" className='block text-gray-700 font-semibold mb-2'>
          Enter your prompt
        </label>
        <input
          type="text"
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='Write content about'
          className='w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <button className='w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300' type='submit'>
          Generate
        </button>
        <section className='mt-4'>
          {mutation.isLoading && <p className='text-gray-500'>Generating your content...</p>}
          {mutation.isError && <p className='text-red-500'>{mutation.error.message}</p>}
          {mutation.isSuccess && (
            <div className='prose prose-sm max-w-none'>
              {formatResponse(mutation.data)}
            </div>
          )}
        </section>
      </form>
    </div>
  );
}

export default App;
