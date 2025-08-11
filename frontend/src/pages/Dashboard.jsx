import React, {useState, useEffect} from 'react'
import WeightLog from './WeightLog'
import MealLog from './MealLog'
import WorkoutLog from './WorkoutLog'

export default function Dashboard(){
  return (
    <div className='space-y-6'>
      <header className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-semibold'>FitTrack 90</h1>
          <p className='text-sm text-gray-500'>Minimalist • White & Grey</p>
        </div>
        <div className='text-right'>
          <p className='text-sm text-gray-600'>Goal: 75 kg</p>
          <p className='text-sm text-gray-600'>Start: 85 kg</p>
        </div>
      </header>

      <section className='grid grid-cols-1 gap-4'>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <WeightLog />
        </div>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <MealLog />
        </div>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <WorkoutLog />
        </div>
      </section>
    </div>
  )
}
