import { ExpertApplicationForm } from "@/app/components/ExpertApplicationForm";
import { Suspense } from "react";
import Loading from "./loading";

export default function AddDataPage() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen bg-[#F4F1DE] py-8">
        <ExpertApplicationForm />
      </div>
    </Suspense>
  );
}
