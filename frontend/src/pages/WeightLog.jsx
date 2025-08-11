import React, {useState, useEffect} from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

const STORAGE_KEY = 'fittrack90_weight'

export default function WeightLog(){
  const [weight, setWeight] = useState('')
  const [items, setItems] = useState([])

  useEffect(()=> {
    const raw = localStorage.getItem(STORAGE_KEY)
    if(raw) setItems(JSON.parse(raw))
  },[])

  useEffect(()=> localStorage.setItem(STORAGE_KEY, JSON.stringify(items)), [items])

  function add(){
    if(!weight) return
    const entry = { date: new Date().toISOString(), weight: parseFloat(weight) }
    setItems(prev => [...prev, entry])
    setWeight('')
  }

  const labels = items.map(i => new Date(i.date).toLocaleDateString())
  const data = {
    labels,
    datasets: [{
      label: 'Weight (kg)',
      data: items.map(i=>i.weight),
      borderColor: '#374151',
      backgroundColor: 'rgba(55,65,81,0.1)',
      tension: 0.2,
    }]
  }

  return (
    <div>
      <h2 className='text-lg font-medium'>Weight Tracker</h2>
      <div className='mt-2 flex gap-2'>
        <input value={weight} onChange={e=>setWeight(e.target.value)} className='p-2 border rounded w-32' placeholder='kg' />
        <button onClick={add} className='px-3 py-2 bg-gray-800 text-white rounded'>Add</button>
      </div>

      <div className='mt-4'>
        {items.length ? <Line data={data} /> : <p className='text-sm text-gray-500'>No weights logged yet.</p>}
      </div>
    </div>
  )
}
