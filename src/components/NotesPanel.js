import React, { useState, useEffect } from 'react'
import { formatShort, daysBetween } from '../calendarUtils'

function NotesPanel({ startDate, endDate, monthKey, palette }) {
  const [note, setNote]         = useState('')
  const [saved, setSaved]       = useState(false)
  const [notesList, setNotesList] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem(`cal-notes-${monthKey}`)
    if (stored) {
      try { setNotesList(JSON.parse(stored)) }
      catch { setNotesList([]) }
    } else {
      setNotesList([])
    }
    setNote('')
    setSaved(false)
  }, [monthKey])

  function handleSave() {
    if (!note.trim()) return
    const newNote = {
      id: Date.now(),
      text: note.trim(),
      start: startDate ? startDate.toISOString() : null,
      end:   endDate   ? endDate.toISOString()   : null,
    }
    const updated = [newNote, ...notesList]
    setNotesList(updated)
    localStorage.setItem(`cal-notes-${monthKey}`, JSON.stringify(updated))
    setNote('')
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  function handleDelete(id) {
    const updated = notesList.filter(n => n.id !== id)
    setNotesList(updated)
    localStorage.setItem(`cal-notes-${monthKey}`, JSON.stringify(updated))
  }

  const accent = palette?.accent || '#2563eb'
  const light  = palette?.light  || '#dbeafe'
  const text   = palette?.text   || '#1e40af'

  return (
    <div style={{
      borderTop: '1px solid #f3f4f6',
      padding: '14px 18px 20px',
      background: '#fafafa',
      borderRadius: '0 0 16px 16px',
    }}>

      {startDate && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '12px',
          padding: '7px 11px',
          background: light,
          borderRadius: '8px',
          fontSize: '12px',
          color: text,
          fontWeight: 500
        }}>
          <span>📅</span>
          {startDate && !endDate
            ? <span>{formatShort(startDate)} — click another date to finish range</span>
            : <span>{formatShort(startDate)} → {formatShort(endDate)} · {daysBetween(startDate, endDate)} days</span>
          }
        </div>
      )}

      <div style={{
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.6px',
        textTransform: 'uppercase',
        color: '#9ca3af',
        marginBottom: '6px'
      }}>
        Notes
      </div>

      <textarea
        value={note}
        onChange={e => setNote(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSave() }}
        placeholder={
          startDate && endDate
            ? `Add a note for ${formatShort(startDate)} – ${formatShort(endDate)}…`
            : 'Jot something down for this month…'
        }
        rows={3}
        style={{
          width: '100%',
          resize: 'vertical',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '9px 11px',
          fontSize: '13px',
          fontFamily: 'inherit',
          color: '#111827',
          background: '#fff',
          outline: 'none',
          lineHeight: 1.6,
        }}
        onFocus={e  => e.target.style.borderColor = accent}
        onBlur={e   => e.target.style.borderColor = '#e5e7eb'}
      />

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '8px'
      }}>
        <span style={{ fontSize: '11px', color: '#9ca3af' }}>Ctrl + Enter to save</span>
        <button
          onClick={handleSave}
          style={{
            background: saved ? '#10b981' : accent,
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '6px 16px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'background 0.2s',
          }}
        >
          {saved ? '✓ Saved' : 'Save Note'}
        </button>
      </div>

      {notesList.length > 0 && (
        <div style={{ marginTop: '14px' }}>
          <div style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.6px',
            textTransform: 'uppercase',
            color: '#9ca3af',
            marginBottom: '8px'
          }}>
            Saved
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {notesList.map(n => (
              <div key={n.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '8px',
                padding: '8px 10px',
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '12px',
              }}>
                <div style={{ flex: 1 }}>
                  {n.start && (
                    <div style={{
                      fontSize: '10px',
                      color: accent,
                      fontWeight: 700,
                      marginBottom: '3px'
                    }}>
                      {formatShort(new Date(n.start))}
                      {n.end ? ` – ${formatShort(new Date(n.end))}` : ''}
                    </div>
                  )}
                  <div style={{ color: '#374151', lineHeight: 1.5 }}>{n.text}</div>
                </div>
                <button
                  onClick={() => handleDelete(n.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#d1d5db',
                    fontSize: '16px',
                    lineHeight: 1,
                    padding: '1px 3px',
                    transition: 'color 0.15s',
                    flexShrink: 0
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                  onMouseLeave={e => e.currentTarget.style.color = '#d1d5db'}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default NotesPanel