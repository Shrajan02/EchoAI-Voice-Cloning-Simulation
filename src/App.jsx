import React, { useState, useRef } from 'react';
import TextInput from './components/TextInput';
import ControlButtons from './components/ControlButtons';

function App() {
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const utteranceRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleSpeak = () => {
    if (!window.speechSynthesis) {
      alert('Speech Synthesis is not supported in your browser.');
      return;
    }

    if (!utteranceRef.current) {
      utteranceRef.current = new SpeechSynthesisUtterance(text);
      utteranceRef.current.onend = () => setIsPlaying(false);
    }

    if (isPlaying) {
      window.speechSynthesis.resume();
    } else {
      utteranceRef.current.text = text;
      window.speechSynthesis.speak(utteranceRef.current);
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsPlaying(false);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const handleSaveAudio = async () => {
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      alert('Your browser does not support audio recording.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = audioUrl;
        a.download = 'speech.wav';
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(audioUrl);
        document.body.removeChild(a);
      };

      mediaRecorderRef.current.start();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.stop();
        }
        stream.getTracks().forEach(track => track.stop());
      };

      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error recording audio:', error);
      alert('An error occurred while trying to record audio.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold">Text-to-Speech App</h1>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <TextInput text={text} setText={setText} />
                <ControlButtons
                  text={text}
                  handleSpeak={handleSpeak}
                  handlePause={handlePause}
                  handleStop={handleStop}
                  handleSaveAudio={handleSaveAudio}
                  isPlaying={isPlaying}
                />
                <button
                  className="bg-gray-300 flex-1 justify-center items-center text-black px-4 py-3 rounded-md focus:outline-none mb-2"
                  onClick={() => setText('')}
                >
                  Clear Text
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
