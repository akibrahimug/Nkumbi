import { useFormContext } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function PestAndDiseaseManagement() {
  const { register } = useFormContext()

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Pest and Disease Management</h2>
      <div className="space-y-2">
        <Label htmlFor="commonPests">List common pests for this crop and how to identify and manage them</Label>
        <Textarea id="commonPests" {...register('commonPests')} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="commonDiseases">What diseases commonly affect this crop? Describe prevention and treatment strategies</Label>
        <Textarea id="commonDiseases" {...register('commonDiseases')} />
      </div>
    </div>
  )
}

