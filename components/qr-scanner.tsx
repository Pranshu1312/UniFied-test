"use client";

import { Scanner } from "@yudiel/react-qr-scanner";

export default function QRScanner({ onScan }: { onScan: (data: string) => void }) {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <Scanner
        onScan={(result) => {
          if (result) onScan(result[0].rawValue);
        }}
        onError={(error: unknown) => {
          console.error(error);
        }}
        constraints={{
          facingMode: "environment",
        }}
        styles={{ container: { width: "100%" } }}
      />
    </div>
  );
}
