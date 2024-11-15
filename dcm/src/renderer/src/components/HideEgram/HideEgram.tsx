import React from 'react';
import { EyeOff } from 'lucide-react';
import './HideEgram.css';

const HideEgramData: React.FC = () => {
  // hide egram from the dashboard
  const handleHideEgram = (): void => {
    console.log('IMPLEMENT LOGIC FOR HIDING EGRAM');
  };

  // return the component
  return (
    <button
      className="egram-button"
      type="button"
      onClick={handleHideEgram}
    >
      <EyeOff size={24} />
      <span>Hide Electrogram</span>
    </button>
  );
};

export default HideEgramData;