import React from 'react'
import { buildCalendarDays, isSameDay, isBetween, isRangeStart, isRangeEnd } from '../calendarUtils'
import { DAYS } from '../calendarData'

function CalendarGrid({ year, month, startDate, endDate, hoverDate, onDayClick, onDayHover, palette, animClass }) {
  const days = buildCalendarDays(year, month)

  function getDayStyle(dayObj) {
    const { date, currentMonth } = dayObj
    const isStart  = isRangeStart(date, startDate, endDate)
    const isEnd    = isRangeEnd(date, startDate, endDate)
    const inRange  = isBetween(date, startDate, endDate)
    const isSingle = startDate && !endDate && isSameDay(date, startDate)
    const isToday  = isSameDay(date, new Date())
    const dow      = date.getDay()

    let bg           = 'transparent'
    let textColor    = currentMonth ? '#111827' : '#d1d5db'
    let fontWeight   = 400
    let borderRadius = '50%'

    if (currentMonth && dow === 0) textColor = '#ef4444'
    if (currentMonth && dow === 6) textColor = '#3b82f6'

    if (isStart || isEnd || isSingle) {
      bg           = palette?.accent || '#2563eb'
      textColor    = '#fff'
      fontWeight   = 700
      borderRadius = '50%'
    } else if (inRange) {
      bg           = palette?.light || '#dbeafe'
      textColor    = palette?.text  || '#1e3a5f'
      borderRadius = '0'
    }

    return { bg, textColor, fontWeight, borderRadius, isToday, isStart, isEnd, inRange, isSingle }
  }

  return (
    <div className={animClass} style={{ padding: '10px 8px 12px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        marginBottom: '2px'
      }}>
        {DAYS.map(d => (
          <div key={d} style={{
            textAlign: 'center',
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.4px',
            textTransform: 'uppercase',
            color: d === 'Sun' ? '#ef4444' : d === 'Sat' ? '#3b82f6' : '#9ca3af',
            padding: '3px 0'
          }}>
            {d}
          </div>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '1px 0'
      }}>
        {days.map((dayObj, idx) => {
          const { bg, textColor, fontWeight, borderRadius, isToday, isStart, isEnd, inRange } = getDayStyle(dayObj)

          return (
            <div
              key={idx}
              onClick={() => dayObj.currentMonth && onDayClick(dayObj.date)}
              onMouseEnter={() => onDayHover(dayObj.date)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '30px',
                background: inRange ? (palette?.light || '#dbeafe') : 'transparent',
                cursor: dayObj.currentMonth ? 'pointer' : 'default',
              }}
            >
              <div style={{
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: (isStart || isEnd) ? '50%' : borderRadius,
                background: bg,
                fontSize: '11px',
                fontWeight,
                color: textColor,
                position: 'relative',
                userSelect: 'none',
                transition: 'all 0.15s ease',
              }}>
                {dayObj.date.getDate()}
                {isToday && !isStart && !isEnd && (
                  <span style={{
                    position: 'absolute',
                    bottom: '1px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '3px',
                    height: '3px',
                    borderRadius: '50%',
                    background: palette?.accent || '#2563eb'
                  }} />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarGrid