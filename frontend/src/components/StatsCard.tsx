import React from 'react'
import { Card, CardContent } from './ui/card'

type StatsCardProps = {
  icon: React.ElementType,
  label: string,
  value: string
}

const StatsCard = ({ icon: Icon, label, value }: StatsCardProps) => {
  
  return (
    <Card className='bg-zinc-400/20 border-zinc-400/20'>
      <CardContent className='p-3'>
        <div className='flex items-center gap-4'>
          <div>
            <Icon />
          </div>
          <div>
            <p className='font-bold'>{label}</p>
            <p className='font-medium'>{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default StatsCard