'use client'

import { useState, useRef, useEffect } from 'react'
import { CATS } from '@/data/instruments'

interface SidebarProps {
  currentTk: string | null
  onPickInstrument: (tk: string) => void
}

export default function Sidebar({ currentTk, onPickInstrument }: SidebarProps) {
  const [filter, setFilter] = useState('')
  const [openCats, setOpenCats] = useState<Record<string, boolean>>({})
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const [debouncedFilter, setDebouncedFilter] = useState('')

  function handleFilter(val: string) {
    setFilter(val)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setDebouncedFilter(val), 120)
  }

  function toggleCat(id: string) {
    setOpenCats(prev => ({ ...prev, [id]: prev[id] === false ? true : false }))
  }

  const q = debouncedFilter.toLowerCase()

  return (
    <aside className="sidebar" style={{ width: 260, height: 'calc(100vh - 64px)', position: 'sticky', top: 64, padding: '16px 0' }}>
      <div style={{ padding: '0 14px 14px' }}>
        <input
          type="text"
          placeholder="Filter instruments..."
          value={filter}
          onChange={e => handleFilter(e.target.value)}
          style={{ width: '100%', height: 36, fontSize: 12, borderRadius: 18, paddingLeft: 14 }}
        />
      </div>

      <div id="sidebarList">
        {CATS.map(c => {
          const allRows = c.groups.flatMap(g =>
            g.rows.filter(r => !q || r[0].toString().toLowerCase().includes(q) || (r[1] as string).toLowerCase().includes(q))
          )
          if (allRows.length === 0) return null
          const open = openCats[c.id] !== false

          return (
            <div key={c.id} className="sb-cat" style={{ marginBottom: 2 }}>
              <div className="sb-cat-hdr" onClick={() => toggleCat(c.id)}>
                <span>{c.name}</span>
                <span className="cnt">{allRows.length}</span>
              </div>
              {open && c.groups.map(g => {
                const gRows = g.rows.filter(r => !q || r[0].toString().toLowerCase().includes(q) || (r[1] as string).toLowerCase().includes(q))
                if (gRows.length === 0) return null
                return (
                  <div key={g.name} className="sb-grp" style={{ padding: '0 8px' }}>
                    <div className="sb-grp-name">{g.name}</div>
                    {gRows.map(r => {
                      const tk = r[0] as string
                      const active = currentTk === tk
                      return (
                        <div
                          key={tk}
                          className={`sb-row${active ? ' active' : ''}`}
                          onClick={() => onPickInstrument(tk)}
                        >
                          <span className="mono" style={{ fontWeight: 600, minWidth: 52, fontSize: 12 }}>{tk}</span>
                          <span style={{ flex: 1, color: active ? 'var(--bg)' : 'var(--mu)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: 12 }}>
                            {r[1] as string}
                          </span>
                          <span className={`mono ${active ? '' : r[3]}`} style={{ fontWeight: 700, fontSize: 12, color: active ? 'var(--bg)' : undefined }}>
                            {(r[2] as number).toFixed(1)}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </aside>
  )
}

