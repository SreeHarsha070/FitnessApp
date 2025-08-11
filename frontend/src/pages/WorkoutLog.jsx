import React, {useState, useEffect} from 'react'

const STORAGE_KEY = 'fittrack90_workouts'

export default function WorkoutLog(){
  const [items,setItems] = useState([])
  const [duration,setDuration] = useState(30)
  const [speed,setSpeed] = useState(6)
  const [incline,setIncline] = useState(2)

  useEffect(()=>{
    const raw = localStorage.getItem(STORAGE_KEY)
    if(raw) setItems(JSON.parse(raw))
  },[])

  useEffect(()=> localStorage.setItem(STORAGE_KEY, JSON.stringify(items)), [items])

  function add(){
    // rough calorie estimate: MET * weight(kg) * time(hr). We'll assume MET 6 for brisk walk.
    const weight = 85
    const met = 6
    const kcal = Math.round(met * weight * (duration/60))
    const entry = { id: Date.now(), date: new Date().toISOString(), duration, speed, incline, kcal }
    setItems(prev=>[entry, ...prev])
  }

  return (
    <div>
      <h2 className='text-lg font-medium'>Treadmill Workout</h2>
      <div className='mt-2 grid grid-cols-3 gap-2'>
        <input type='number' value={duration} onChange={e=>setDuration(e.target.value)} className='p-2 border rounded' />
        <input type='number' value={speed} step='0.1' onChange={e=>setSpeed(e.target.value)} className='p-2 border rounded' />
        <input type='number' value={incline} onChange={e=>setIncline(e.target.value)} className='p-2 border rounded' />
      </div>
      <div className='mt-2 flex gap-2'>
        <button onClick={add} className='px-3 py-2 bg-gray-800 text-white rounded'>Add</button>
      </div>

      <div className='mt-3 space-y-2'>
        {items.length===0 && <p className='text-sm text-gray-500'>No workouts logged yet.</p>}
        {items.map(it=>(
          <div key={it.id} className='p-2 border rounded bg-white flex justify-between'>
            <div>
              <div className='font-medium'>Treadmill — {it.duration} min</div>
              <div className='text-sm text-gray-500'>{new Date(it.date).toLocaleString()}</div>
            </div>
            <div className='text-right'>
              <div className='text-sm'>{it.kcal} kcal</div>
              <div className='text-xs text-gray-500'>{it.speed} km/h • incline {it.incline}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
