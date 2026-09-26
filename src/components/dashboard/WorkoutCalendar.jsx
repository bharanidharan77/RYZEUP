import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, CheckCircle2, XCircle, MinusCircle } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import { getUserDailyTracking, getTodayDateString } from '../../services/fitnessService';

export default function WorkoutCalendar({ userId }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const todayStr = getTodayDateString();
  const todayDateObj = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleGoToToday = () => {
    setCurrentDate(new Date());
  };

  // Compute Days for the Month Grid
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const totalDaysInMonth = lastDayOfMonth.getDate();

  // Get day of week for 1st of month (0 = Sun, 1 = Mon... convert so Mon=0)
  let firstDayIndex = firstDayOfMonth.getDay() - 1;
  if (firstDayIndex === -1) firstDayIndex = 6; // Sunday

  const daysArray = [];

  // Empty leading slots
  for (let i = 0; i < firstDayIndex; i++) {
    daysArray.push(null);
  }

  // Populate Month Days
  for (let day = 1; day <= totalDaysInMonth; day++) {
    const formattedMonth = String(month + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const dateStr = `${year}-${formattedMonth}-${formattedDay}`;

    const dateObj = new Date(year, month, day);

    // Check actual workout tracking record for this user
    const log = getUserDailyTracking(userId, dateStr);
    const isCompleted = log.workout?.completed || false;

    let status = 'neutral'; // default

    const isFuture = dateObj > todayDateObj && dateStr !== todayStr;
    const isToday = dateStr === todayStr;

    if (isCompleted) {
      status = 'completed';
    } else if (!isFuture && !isToday && dateObj < todayDateObj) {
      // Past date with no workout completion
      status = 'missed';
    }

    daysArray.push({
      day,
      dateStr,
      isToday,
      isFuture,
      status
    });
  }

  return (
    <GlassCard hoverEffect={false} style={{ padding: '1.75rem', marginBottom: '2rem' }}>
      {/* Calendar Header with Navigation Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--pastel-mint)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <CalendarIcon size={18} style={{ color: 'var(--pastel-mint-dark)' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--pastel-text-dark)', margin: 0 }}>
              Workout Calendar
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--pastel-text-muted)', fontWeight: 600 }}>
              Track workout completion history by date
            </span>
          </div>
        </div>

        {/* Month Navigation Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={handlePrevMonth}
            className="btn-pastel-secondary"
            style={{ padding: '0.4rem 0.65rem', borderRadius: '50%' }}
            title="Previous Month"
          >
            <ChevronLeft size={18} />
          </button>

          <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--pastel-text-dark)', minWidth: '130px', textAlign: 'center' }}>
            {monthNames[month]} {year}
          </span>

          <button
            type="button"
            onClick={handleNextMonth}
            className="btn-pastel-secondary"
            style={{ padding: '0.4rem 0.65rem', borderRadius: '50%' }}
            title="Next Month"
          >
            <ChevronRight size={18} />
          </button>

          <button
            type="button"
            onClick={handleGoToToday}
            className="btn-pastel-primary"
            style={{ padding: '0.35rem 0.85rem', fontSize: '0.78rem', marginLeft: '0.25rem' }}
          >
            Today
          </button>
        </div>
      </div>

      {/* Days of Week Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '0.5rem',
        textAlign: 'center',
        marginBottom: '0.5rem',
        fontWeight: 700,
        fontSize: '0.8rem',
        color: 'var(--pastel-text-muted)'
      }}>
        {daysOfWeek.map((d) => (
          <div key={d} style={{ padding: '0.35rem 0' }}>{d}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '0.5rem'
      }}>
        {daysArray.map((item, index) => {
          if (!item) {
            return <div key={`empty_${index}`} style={{ minHeight: '44px' }} />;
          }

          let bg = 'rgba(255,255,255,0.6)';
          let border = '1px solid rgba(0,0,0,0.05)';
          let textColor = 'var(--pastel-text-dark)';
          let icon = null;

          if (item.status === 'completed') {
            bg = 'var(--pastel-mint)';
            border = '1.5px solid rgba(116, 198, 157, 0.6)';
            textColor = 'var(--pastel-mint-dark)';
            icon = <CheckCircle2 size={12} style={{ color: 'var(--pastel-mint-dark)' }} />;
          } else if (item.status === 'missed') {
            bg = 'var(--pastel-baby-pink)';
            border = '1.5px solid rgba(247, 178, 198, 0.6)';
            textColor = 'var(--pastel-baby-pink-dark)';
            icon = <XCircle size={12} style={{ color: 'var(--pastel-baby-pink-dark)' }} />;
          }

          return (
            <div
              key={item.dateStr}
              style={{
                minHeight: '44px',
                borderRadius: '0.75rem',
                background: bg,
                border: item.isToday ? '2px solid var(--pastel-baby-blue-dark)' : border,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justify: 'center',
                padding: '0.35rem',
                position: 'relative',
                boxShadow: item.isToday ? '0 2px 10px rgba(0,0,0,0.06)' : 'none'
              }}
            >
              <span style={{ fontSize: '0.85rem', fontWeight: item.isToday ? 900 : 700, color: textColor }}>
                {item.day}
              </span>
              {icon}
            </div>
          );
        })}
      </div>

      {/* Small Calendar Legend */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justify: 'center',
        gap: '1.5rem',
        marginTop: '1.25rem',
        paddingTop: '1rem',
        borderTop: '1px solid rgba(0,0,0,0.05)',
        fontSize: '0.82rem',
        fontWeight: 700,
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--pastel-mint-dark)' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--pastel-mint-dark)', display: 'inline-block' }} />
          🟢 Workout Completed
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--pastel-baby-pink-dark)' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--pastel-baby-pink-dark)', display: 'inline-block' }} />
          🔴 Workout Missed
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--pastel-text-muted)' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#e2e8f0', display: 'inline-block' }} />
          ⚪ No workout / Future
        </div>
      </div>
    </GlassCard>
  );
}
