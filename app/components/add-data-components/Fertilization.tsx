import { useFormContext } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function Fertilization() {
  const { register } = useFormContext()

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Fertilization</h2>
      <div className="space-y-2">
        <Label htmlFor="recommendedFertilizers">What fertilizers do you recommend for this crop?</Label>
        <Textarea id="recommendedFertilizers" {...register('recommendedFertilizers')} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="fertilizationMethods">How and when should they be applied?</Label>
        <Textarea id="fertilizationMethods" {...register('fertilizationMethods')} />
      </div>
    </div>
  )
}

