"use client";

import { useMemo } from "react";

interface CalendarProps {
  className?: string;
}

export default function Calendar({ className }: CalendarProps) {
  const weddingDate = new Date("2026-03-08");
  const currentDate = new Date();

  const year = weddingDate.getFullYear();
  const month = weddingDate.getMonth();
  const weddingDay = weddingDate.getDate();

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  }, [year, month]);

  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  const isWeddingDay = (day: number | null) => {
    return day !== null && day === weddingDay;
  };

  const isToday = (day: number | null) => {
    if (day === null) return false;
    return (
      currentDate.getFullYear() === year &&
      currentDate.getMonth() === month &&
      currentDate.getDate() === day
    );
  };
  return (
    <section className={`w-full py-20 px-4 ${className || ''}`}>
      <div className="max-w-4xl mx-auto text-center">
        <div className="rounded-2xl shadow-lg p-8 md:p-12">
          <div className="text-2xl md:text-3xl font-bold mb-8">
            {year}.{String(month + 1).padStart(2, '0')}.{String(weddingDay).padStart(2, '0')}
            <br />
            일요일 오후 3시 40분
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {weekdays.map((weekday) => (
              <div
                key={weekday}
                className="text-sm md:text-base font-semibold py-2"
              >
                {weekday}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`aspect-square flex items-center justify-center text-sm md:text-base relative ${day === null
                  ? "text-transparent"
                  : isWeddingDay(day)
                    ? "text-white font-bold"
                    : isToday(day)
                      ? "text-blue-600 font-semibold"
                      : "text-gray-700"
                  }`}
              >
                {day !== null && (
                  <>
                    {isWeddingDay(day) && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-500 flex items-center justify-center mb-1">
                          <span>{day}</span>
                        </div>
                        <span className="text-xs md:text-sm text-red-500 font-medium">오후 3시</span>
                      </div>
                    )}
                    {!isWeddingDay(day) && <span>{day}</span>}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

