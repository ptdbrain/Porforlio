import { useCallback, useState } from 'react';
import BrainIntro from './components/BrainIntro.jsx';
import PortfolioHome from './components/PortfolioHome.jsx';

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <>
      {!introComplete && <BrainIntro onComplete={handleIntroComplete} />}
      <PortfolioHome visible={introComplete} />
    </>
  );
}
