import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }


  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      
      <div className="header-title">
        <h1>Write your idea and let GPT create your prompt</h1>
      </div>


      <div className="container">
        <div className="header">
            <p className='small'>
            <b>About</b>
            </p>
            <p className='small'>
            I love creating images on Lexica.art but writing good prompts is not always easy. 
            </p>
            <p className='small'>
            So, I created this website that helps you fill in the blanks so that you can have a complete prompt. 
            </p>
            <p className='small'>
            Use it as it is, or remix it, or generated another prompt until you are satisfied. 
            </p>
            <p className='small'>
            This is your playground. 
            </p>
            <p className='small'>
            <b>Instructions</b>
            </p>
            <p className='small'>
            Write the protagonist of your idea in the text box. Then click generate. 
            </p>
            <p className='small'>
            The app will take sometime coming up with your promp and then it will spit it in the blue box. 
            </p>        
        </div>

        <div className="prompt-container">
          <textarea 
            className="prompt-box"
            placeholder="start typing here"
            value={userInput}
            onChange={onUserChangedText}
          />

        <div className="prompt-buttons">
          <a
            className={isGenerating ? 'generate-button loading' : 'generate-button'}
            onClick={callGenerateEndpoint}>

            <div className="generate">
            {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
            </div>
          
          </a>
        </div>

        </div>

        <div className="output">
            <div className="output-content">
            {apiOutput && (
              <p>{userInput}{apiOutput}</p>
            )}
            </div>
            <a className='button-lexica' target="_blank" href="https://lexica.art/"> Try your prompt on Lexica.art</a>
        </div>

      </div>

      <div className="footer">
        <div className="badge-container grow">
          <a
            href="https://buildspace.so/builds/ai-writer"
            target="_blank"
            rel="noreferrer"
          >
            <div className="badge">
              <Image src={buildspaceLogo} alt="buildspace logo" />
              <p>build with buildspace</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
