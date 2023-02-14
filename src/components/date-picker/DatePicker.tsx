import { FormEvent, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { useTranslate } from '../../hooks/useTranslate';
import { Message } from '../languages/messages';
import './DatePicker.scss';
import Button from '../button/button';

export function DatePicker() {

  const { trans } = useTranslate();

  const [selectedDay, setSelectedDay] = useState<Date>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>(format(new Date(), 'PPP'));

  const handleDayClick = (day: Date) => {
    setInputValue(format(day, 'PPP'));
    setSelectedDay(day);
    closeCalendar();
  };

  const handleButtonClick = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const closeCalendar = () => {
    setIsCalendarOpen(false);
  };

  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault();
  };

  const deleteDeadline = () => {
    setSelectedDay(undefined);
    setInputValue(trans(Message.NoDueDate));
  };

  return <>
    <form onSubmit={onSubmitForm} className="calendar-form">
      <Button
        className="calendar-button"
        aria-label="Pick a date"
        onClick={handleButtonClick}
      >
        {inputValue}
      </Button>
      {
        isCalendarOpen && <DayPicker showOutsideDays
          mode="single"
          selected={selectedDay}
          onDayClick={handleDayClick} />
      }
    </form>
    {
      !isCalendarOpen && <Button className='delete-button' onClick={deleteDeadline}>
        <div className='delete'></div>
      </Button>
    }
  </>;
}
