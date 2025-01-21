import { useFormContext } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function EnvironmentalAdaptations() {
  const { register } = useFormContext()

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Environmental Adaptations</h2>
      <div className="space-y-2">
        <Label htmlFor="climateTolerance">How does this crop react to different weather conditions in Uganda?</Label>
        <Textarea id="climateTolerance" {...register('climateTolerance')} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="soilRequirements">What are the ideal soil conditions (type, pH, nutrients) for this crop?</Label>
        <Textarea id="soilRequirements" {...register('soilRequirements')} />
      </div>
    </div>
  )
}

