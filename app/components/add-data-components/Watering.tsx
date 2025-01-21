import { useFormContext } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function Watering() {
  const { register } = useFormContext()

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Watering</h2>
      <div className="space-y-2">
        <Label htmlFor="wateringFrequency">How often should this crop be watered at different stages?</Label>
        <Textarea id="wateringFrequency" {...register('wateringFrequency')} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="wateringMethods">What watering methods yield the best results for this crop?</Label>
        <Textarea id="wateringMethods" {...register('wateringMethods')} />
      </div>
    </div>
  )
}

