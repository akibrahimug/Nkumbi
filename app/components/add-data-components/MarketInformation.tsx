import { useFormContext } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function MarketInformation() {
  const { register } = useFormContext()

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Market Information</h2>
      <div className="space-y-2">
        <Label htmlFor="marketTrends">What are the current market trends for this crop in Uganda? When are the best times to sell?</Label>
        <Textarea id="marketTrends" {...register('marketTrends')} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="buyerInformation">Who are the known buyers for this crop? What are their buying preferences?</Label>
        <Textarea id="buyerInformation" {...register('buyerInformation')} />
      </div>
    </div>
  )
}

