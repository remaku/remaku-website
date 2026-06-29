'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { Input } from './ui/input'

const PRICE_PER_22B = 86_000
const DEFAULT_COUNT = 33

export function WheelspinCalculator() {
  const t = useTranslations()
  const [availableCR, setAvailableCR] = useState('')

  const cr = Number(availableCR)
  const maxCars = cr > 0 ? Math.floor(cr / PRICE_PER_22B) : 0

  return (
    <div className='not-prose my-4 rounded-lg border p-4'>
      <p className='mb-3 font-semibold'>{t('wheelspinCalculator.title')}</p>
      <label className='flex flex-wrap items-center gap-2'>
        {t('wheelspinCalculator.label')}
        <Input
          type='number'
          value={availableCR}
          onChange={(e) => {
            setAvailableCR(e.target.value)
          }}
          placeholder={t('wheelspinCalculator.placeholder')}
        />
      </label>
      {cr > 0 && (
        <div className='mt-3'>
          <p>{t('wheelspinCalculator.canBuy', { count: maxCars.toLocaleString() })}</p>
          <p>
            {t('wheelspinCalculator.defaultCost', {
              count: DEFAULT_COUNT,
              cost: (PRICE_PER_22B * DEFAULT_COUNT).toLocaleString(),
            })}
          </p>
          {maxCars < DEFAULT_COUNT && (
            <p className='mt-2 text-fd-warning'>
              {t('wheelspinCalculator.warning', {
                count: DEFAULT_COUNT,
                cost: (PRICE_PER_22B * DEFAULT_COUNT).toLocaleString(),
              })}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
