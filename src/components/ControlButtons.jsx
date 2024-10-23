import React from 'react';

const ControlButtons = ({ text, handleSpeak, handlePause, handleStop, handleSaveAudio, isPlaying }) => {
  return (
    <div className="pt-4 flex flex-wrap items-center space-x-4">
      <button
        className="bg-blue-500 flex-1 justify-center items-center text-white px-4 py-3 rounded-md focus:outline-none mb-2"
        onClick={handleSpeak}
        disabled={!text.trim()}
      >
        {isPlaying ? 'Resume' : 'Play'}
      </button>
      <button
        className="bg-yellow-500 flex-1 justify-center items-center text-white px-4 py-3 rounded-md focus:outline-none mb-2"
        onClick={handlePause}
      >
        Pause
      </button>
      <button
        className="bg-red-500 flex-1 justify-center items-center text-white px-4 py-3 rounded-md focus:outline-none mb-2"
        onClick={handleStop}
      >
        Stop
      </button>
      <button
        className="bg-green-500 flex-1 justify-center items-center text-white px-4 py-3 rounded-md focus:outline-none mb-2"
        onClick={handleSaveAudio}
      >
        Save Audio
      </button>
    </div>
  );
};

export default ControlButtons;
