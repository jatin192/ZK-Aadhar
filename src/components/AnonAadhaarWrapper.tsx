import React from 'react';
import { LogInWithAnonAadhaar, useAnonAadhaar } from '@anon-aadhaar/react';

interface AnonAadhaarWrapperProps {
  onProofGenerated: () => void;
  onVerify: () => void;
  onError: (error: Error) => void;
}

const AnonAadhaarWrapper: React.FC<AnonAadhaarWrapperProps> = ({
  onProofGenerated,
  onVerify,
  onError
}) => {
  const [anonAadhaar] = useAnonAadhaar();

  React.useEffect(() => {
    // console.log('Anon Aadhaar status:', anonAadhaar.status);

    if (anonAadhaar.status === "logging-in") {
      onProofGenerated();
    } else if (anonAadhaar.status === "logged-in") {
      onVerify();
    } else if (anonAadhaar.status === "logged-out") {
      // Handle initial state
    }
  }, [anonAadhaar.status, onProofGenerated, onVerify]);

  return (
    <div className="flex flex-col items-center gap-4">
      <LogInWithAnonAadhaar 
        nullifierSeed={1234}
      />
      
      {anonAadhaar.status === "logging-in" && (
        <p className="text-gray-400">
          Generating your proof... Please wait.
        </p>
      )}
    </div>
  );
};

export default AnonAadhaarWrapper;