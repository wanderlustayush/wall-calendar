import React, { useState, useRef, useCallback } from 'react'
import CalendarHeader from './components/CalendarHeader'
import CalendarGrid from './components/CalendarGrid'
import NotesPanel from './components/NotesPanel'
import { monthImages, MONTHS } from './calendarData'

function App() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [hoverDate, setHoverDate] = useState(null)
  const [animClass, setAnimClass] = useState('')
  const isAnimating = useRef(false)

  const image = monthImages[month]
  const palette = image.palette

  const changeMonth = useCallback((direction) => {
    if (isAnimating.current) return
    isAnimating.current = true
    setAnimClass('flip-out')
    setTimeout(() => {
      setMonth(prev => {
        const next = prev + direction
        if (next < 0)  { setYear(y => y - 1); return 11 }
        if (next > 11) { setYear(y => y + 1); return 0  }
        return next
      })
      setStartDate(null)
      setEndDate(null)
      setHoverDate(null)
      setAnimClass('flip-in')
      setTimeout(() => {
        setAnimClass('')
        isAnimating.current = false
      }, 350)
    }, 340)
  }, [])

  function handleDayClick(date) {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date)
      setEndDate(null)
    } else {
      if (date.getTime() === startDate.getTime()) {
        setStartDate(null)
        return
      }
      setEndDate(date)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '40px 16px 60px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        background: '#fff',
        borderRadius: '4px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        border: '1px solid #e5e7eb',
      }}>
        <CalendarHeader
          month={MONTHS[month]}
          year={year}
          image={image}
          palette={palette}
          onPrev={() => changeMonth(-1)}
          onNext={() => changeMonth(1)}
          animClass={animClass}
        />

        <div style={{
          display: 'flex',
          borderTop: `3px solid ${palette.accent}`,
        }}>
          <div style={{
            width: '38%',
            borderRight: '1px solid #e5e7eb',
            padding: '14px 12px',
            background: '#fafafa',
          }}>
            <div style={{
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: '#9ca3af',
              marginBottom: '10px',
            }}>
              Notes
            </div>

            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} style={{
                height: '24px',
                borderBottom: '1px solid #e5e7eb',
              }} />
            ))}

            <div style={{ position: 'relative', marginTop: '-240px' }}>
              <textarea
                placeholder="Write here…"
                rows={10}
                style={{
                  width: '100%',
                  height: '240px',
                  resize: 'none',
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: '11px',
                  fontFamily: 'inherit',
                  color: '#374151',
                  lineHeight: '24px',
                  padding: '2px 4px',
                }}
              />
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <CalendarGrid
              year={year}
              month={month}
              startDate={startDate}
              endDate={endDate}
              hoverDate={hoverDate}
              onDayClick={handleDayClick}
              onDayHover={setHoverDate}
              palette={palette}
              animClass={animClass}
            />
          </div>
        </div>

        <NotesPanel
          startDate={startDate}
          endDate={endDate}
          monthKey={`${year}-${month}`}
          palette={palette}
        />
      </div>
    </div>
  )
}

export default App