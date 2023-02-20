import { FormEvent, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useTranslate } from '../../hooks/useTranslate';
import { Message } from '../languages/messages';
import './DatePicker.scss';
import Button from '../button/button';
import { formatDate, formatDateString } from '../../utils/formatDate';
import { addMonths } from 'date-fns';

interface DatePickerProp {
  onChange: ({ dueDate }: { dueDate: string | null }) => void
  dueDate: string | null
}

export function DatePicker({ onChange, dueDate }: DatePickerProp) {

  const { trans } = useTranslate();
  let  buttonClasses = 'calendar-button';

  const [selectedDay, setSelectedDay] = useState<Date>(new Date(dueDate || Date.now()));
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>(dueDate ? formatDate(new Date(dueDate)) : trans(Message.NoDueDate));

  const handleDayClick = (day: Date) => {
    setInputValue(formatDate(day));
    setSelectedDay(day);
    closeCalendar();
    onChange({ dueDate: day.toDateString() });
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
    setSelectedDay(new Date());
    setInputValue(trans(Message.NoDueDate));
    onChange({ dueDate: null });
  };

  if (selectedDay && formatDateString(selectedDay.toString(), 'yyyy-MM-dd') <= formatDateString(new Date().toString(), 'yyyy-MM-dd')) {
    buttonClasses += ' asap';
  }

  return <>
    <form onSubmit={onSubmitForm} className="calendar-form">
      <Button
        className={buttonClasses}
        aria-label="Pick a date"
        onClick={handleButtonClick}
      >
        {inputValue}
      </Button>
      {
        isCalendarOpen && <DayPicker showOutsideDays
          mode="single"
          selected={selectedDay}
          onDayClick={handleDayClick}
          defaultMonth={addMonths(selectedDay, 0)}
          />
      }
    </form>
    {
      !isCalendarOpen && inputValue !== trans(Message.NoDueDate) && <Button className="delete-button" onClick={deleteDeadline}>
        <div className="delete"></div>
      </Button>
    }
  </>;
}
