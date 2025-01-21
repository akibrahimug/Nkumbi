import { useFormContext } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function PlantingGuide() {
  const { register } = useFormContext()

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Planting Guide</h2>
      <div className="space-y-2">
        <Label htmlFor="bestPlantingTime">When is the best time to plant this crop in Uganda?</Label>
        <Textarea id="bestPlantingTime" {...register('bestPlantingTime')} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="soilPreparation">What soil preparation is needed?</Label>
        <Textarea id="soilPreparation" {...register('soilPreparation')} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="optimalSpacing">What's the optimal spacing and depth for planting?</Label>
        <Textarea id="optimalSpacing" {...register('optimalSpacing')} />
      </div>
    </div>
  )
}

