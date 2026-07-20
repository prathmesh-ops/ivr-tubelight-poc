import { useEffect, useRef } from 'react';
import { getTubelightIframeUrl } from '../lib/tubelight-api';

const TubelightDialer = ({ agentVerificationKey, className = '' }) => {
  const iframeRef = useRef(null);

  const iframeUrl = getTubelightIframeUrl(agentVerificationKey);
  console.log(iframeUrl,"iframeUrl");
  return (
    <div className={`tubelight-dialer-container ${className}`}>
      <iframe
        ref={iframeRef}
        name="tubeCallingScreen"
        id="tubeCallingScreen"
        style={{ width: '445px', height: '765px', border: '2px solid #e5e7eb', borderRadius: '20px' }}
        allow="microphone"
        src={iframeUrl}
        title="Tubelight Dialer"
      />
    </div>
  );
};

export default TubelightDialer;
