"use client";

import { useEffect, useState, Fragment, useMemo } from "react";

interface CountdownProps {
  className?: string;
}

export default function Countdown({ className }: CountdownProps) {
  // 2026년 3월 8일 오후 3시 40분 (15:40)
  const targetDate = useMemo(() => {
    return new Date("2026-03-08T15:40:00").getTime();
  }, []);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // 즉시 계산
    calculateTimeLeft();

    // 1초마다 업데이트
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className={`w-full py-20 px-4 ${className || ''}`}>
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 md:gap-4">
          {timeUnits.map((unit, index) => (
            <Fragment key={index}>
              <div className="rounded-xl shadow-lg md:p-6 p-3 md:p-8">
                <div className="md:text-2xl text-xl font-bold mb-2">
                  {String(unit.value).padStart(2, "0")}
                </div>
                <div className="text-lg md:text-xl">{unit.label}</div>
              </div>
              {index < timeUnits.length - 1 && (
                <span className="text-xl md:text-2xl font-bold">:</span>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

