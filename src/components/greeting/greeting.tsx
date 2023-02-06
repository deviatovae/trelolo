import './greeting.scss';
import { useState, useEffect } from 'react';

const Greeting = () => {
  const [greeting, setGreeting] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const currentDate = new Date();
    setDate(
      currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      })
    );

    const currentTime = currentDate.getHours();
    if (currentTime < 12) {
      setGreeting('Good morning');
    } else if (currentTime < 18) {
      setGreeting('Good afternoon');
    } else if (currentTime < 24) {
      setGreeting('Good evening');
    } else  {
      setGreeting('Good night');
    }
  }, []);

  return (
    <div className="greeting__wrapper">
      <p className="greeting__date">{date}</p>
      <p className="greeting__word">{greeting}, Kira</p>
    </div>
  );
};

export default Greeting;
