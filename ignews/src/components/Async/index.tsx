import { useEffect, useState } from 'react';

export function Async() {
  const [isButton1Visible, setIsButton1Visible] = useState(false);
  const [isButton2Visible, setIsButton2Visible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsButton1Visible(true);
      setIsButton2Visible(false);
    }, 1000);
  });

  return (
    <div>
      <div>Hello World</div>
      {isButton1Visible && <button>Button 1</button>}
      {isButton2Visible && <button>Button 2</button>}
    </div>
  );
}
