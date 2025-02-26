import React, { useState } from 'react';
import './calender.css';

const Calendar = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthsOfYear = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const currentDate = new Date();
  const today = {
    day: currentDate.getDate(),
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  };

  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="calender">
      <div className="navigate-date">
        <h2 className="month">{monthsOfYear[currentMonth]},</h2>
        <h2 className="year">{currentYear}</h2>
        <div className="buttons">
          <i className="bx bx-chevron-left" onClick={handlePrevMonth}></i>
          <i className="bx bx-chevron-right" onClick={handleNextMonth}></i>
        </div>
      </div>
      <div className="weekdays">
        {daysOfWeek.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="days">
        {Array.from({ length: daysInMonth }, (_, index) => {
          const day = index + 1;
          const isToday =
            day === today.day &&
            currentMonth === today.month &&
            currentYear === today.year;

          return (
            <span
              key={day}
              className={isToday ? 'today' : ''}
            >
              {day}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
