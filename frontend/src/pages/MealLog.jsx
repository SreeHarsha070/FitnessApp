import React, {useState, useEffect} from 'react'

const PRESETS = [
  { name: 'Boiled Eggs (3)', kcal: 210, protein: 18 },
  { name: 'Idli (2)', kcal: 140, protein: 4 },
  { name: 'Dosa', kcal: 200, protein: 5 },
  { name: 'Pappu (1 cup)', kcal: 180, protein: 10 },
  { name: 'Paneer Curry (100g)', kcal: 300, protein: 18 },
  { name: 'MuscleBlaze Whey (1 scoop)', kcal: 120, protein: 24 }
]

const STORAGE_KEY = 'fittrack90_meals'

export default function MealLog(){
  const [items,setItems] = useState([])
  const [selected,setSelected] = useState(PRESETS[0].name)

  useEffect(()=>{
    const raw = localStorage.getItem(STORAGE_KEY)
    if(raw) setItems(JSON.parse(raw))
  },[])

  useEffect(()=> localStorage.setItem(STORAGE_KEY, JSON.stringify(items)), [items])

  function addPreset(){
    const preset = PRESETS.find(p=>p.name===selected)
    const entry = { id: Date.now(), date:new Date().toISOString(), ...preset }
    setItems(prev=>[entry, ...prev])
  }

  function exportCsv(){
    const rows = [['date','name','kcal','protein'], ...items.map(i=>[i.date,i.name,i.kcal,i.protein])]
    const csv = rows.map(r=>r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'meals.csv'; a.click()
  }

  return (
    <div>
      <h2 className='text-lg font-medium'>Meal Log</h2>
      <div className='mt-2 flex gap-2'>
        <select value={selected} onChange={e=>setSelected(e.target.value)} className='p-2 border rounded'>
          {PRESETS.map(p=> <option key={p.name} value={p.name}>{p.name}</option>)}
        </select>
        <button onClick={addPreset} className='px-3 py-2 bg-gray-800 text-white rounded'>Add</button>
        <button onClick={exportCsv} className='px-3 py-2 border rounded'>Export CSV</button>
      </div>

      <div className='mt-3 space-y-2'>
        {items.length===0 && <p className='text-sm text-gray-500'>No meals logged yet.</p>}
        {items.map(it=>(
          <div key={it.id} className='p-2 border rounded bg-white flex justify-between'>
            <div>
              <div className='font-medium'>{it.name}</div>
              <div className='text-sm text-gray-500'>{new Date(it.date).toLocaleString()}</div>
            </div>
            <div className='text-right'>
              <div className='text-sm'>{it.kcal} kcal</div>
              <div className='text-xs text-gray-500'>{it.protein} g protein</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
