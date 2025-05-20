import React from 'react';

export default function WaveBackground() {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
    }}>
      <svg
        style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '60%' }}
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGradient1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9C27B0" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#6A1B9A" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#BA68C8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6A1B9A" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path>
          <animate attributeName="d" dur="12s" repeatCount="indefinite"
            values="M0,400 Q360,350 720,400 T1440,400 V600 H0Z;
                    M0,420 Q360,480 720,420 T1440,400 V600 H0Z;
                    M0,400 Q360,350 720,400 T1440,400 V600 H0Z" />
        </path>
        <path fill="url(#waveGradient1)" fillOpacity="1">
          <animate attributeName="d" dur="10s" repeatCount="indefinite"
            values="M0,420 Q360,480 720,420 T1440,400 V600 H0Z;
                    M0,400 Q360,350 720,400 T1440,400 V600 H0Z;
                    M0,420 Q360,480 720,420 T1440,400 V600 H0Z" />
        </path>
        <path fill="url(#waveGradient2)" fillOpacity="0.7">
          <animate attributeName="d" dur="16s" repeatCount="indefinite"
            values="M0,440 Q360,420 720,440 T1440,420 V600 H0Z;
                    M0,400 Q360,350 720,400 T1440,400 V600 H0Z;
                    M0,440 Q360,420 720,440 T1440,420 V600 H0Z" />
        </path>
      </svg>
    </div>
  );
} 