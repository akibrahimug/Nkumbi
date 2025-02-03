import { useFormContext } from "react-hook-form";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

export function CropInformation() {
  const { register } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Crop Information</h2>
      <div className="space-y-2">
        <Label htmlFor="cropName">Crop Name</Label>
        <Select {...register("cropName")}>
          <SelectTrigger>
            <SelectValue placeholder="Select a crop" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="maize">Maize</SelectItem>
            <SelectItem value="beans">Beans</SelectItem>
            <SelectItem value="cassava">Cassava</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="otherCropName">Other Crop Name (if applicable)</Label>
        <Input id="otherCropName" {...register("otherCropName")} />
      </div>
    </div>
  );
}
