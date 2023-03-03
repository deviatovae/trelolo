import './greeting.scss';
import { useEffect, useState } from 'react';
import { useTranslate } from '../../hooks/useTranslate';
import { Message } from '../languages/messages';
import { useAuth } from '../../hooks/auth';
import { getName } from '../../utils/format';

const Greeting = () => {
  const [greeting, setGreeting] = useState('');
  const [date, setDate] = useState('');
  const { trans, locale } = useTranslate();
  const { userInfo } = useAuth();

  useEffect(() => {
    const currentDate = new Date();
    setDate(
      currentDate.toLocaleDateString(locale, {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      })
    );
    const currentTime = currentDate.getHours();
    if (currentTime > 6 && currentTime < 12) {
      setGreeting(trans(Message.GoodMorning));
    } else if (currentTime >= 12 && currentTime < 18) {
      setGreeting(trans(Message.GoodAfternoon));
    } else if (currentTime >= 18 && currentTime < 24) {
      setGreeting(trans(Message.GoodEvening));
    } else {
      setGreeting(trans(Message.GoodNight));
    }
  }, [trans, locale]);

  return (
    <div className="greeting__wrapper wrapper">
      <p className="greeting__date">{date}</p>
      {userInfo && <p className="greeting__word">{greeting}, {getName(userInfo.name)}</p>}
    </div>
  );
};

export default Greeting;
