"use client";

import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

export default function QRScanner({ onScan }: { onScan: (data: string) => void }) {
  const [lastScan, setLastScan] = useState<string>("");

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <Scanner
        onScan={(detectedCodes) => {
          if (!detectedCodes || detectedCodes.length === 0) return;

          const rawValue = detectedCodes[0]?.rawValue;
          if (!rawValue) return;

          // prevent repeat triggers
          if (rawValue === lastScan) return;
          setLastScan(rawValue);

          console.log("✅ QR Scanned:", rawValue);
          onScan(rawValue);
        }}
        onError={(err) => console.warn("❌ QR Scan Error:", err)}
        constraints={{ facingMode: "environment" }}
        styles={{ container: { width: "100%" } }}
      />
    </div>
  );
}
