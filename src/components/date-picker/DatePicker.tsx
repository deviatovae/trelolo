import { FormEvent, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useTranslate } from '../../hooks/useTranslate';
import { Message } from '../languages/messages';
import './DatePicker.scss';
import Button from '../button/button';
import { formatDate } from '../../utils/formatDate';

interface DatePickerProp {
  onClick: ({ dueDate } : { dueDate: string }) => void
  dueDate: string
}

export function DatePicker({ onClick, dueDate }: DatePickerProp) {

  const { trans } = useTranslate();

  const [selectedDay, setSelectedDay] = useState<Date>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>(formatDate(dueDate ? new Date(dueDate) : new Date()));

  const handleDayClick = (day: Date) => {
    setInputValue(formatDate(day));
    setSelectedDay(day);
    closeCalendar();
    onClick({ dueDate: day.toDateString() });
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
      !isCalendarOpen && inputValue !== trans(Message.NoDueDate) && <Button className='delete-button' onClick={deleteDeadline}>
        <div className='delete'></div>
      </Button>
    }
  </>;
}
