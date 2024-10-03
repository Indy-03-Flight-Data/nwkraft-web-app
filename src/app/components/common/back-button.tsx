"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div>
      <button onClick={handleBack}>Back</button>
    </div>
  );
}
