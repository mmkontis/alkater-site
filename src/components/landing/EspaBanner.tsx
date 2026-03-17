"use client";

import Image from "next/image";

export function EspaBanner() {
  return (
    <div
      className="w-full bg-white border-b border-gray-200"
      role="banner"
      aria-label="ΕΣΠΑ 2021-2027 - Συγχρηματοδότηση Ευρωπαϊκής Ένωσης"
    >
      <div className="container mx-auto px-4 py-4 sm:py-6 max-w-7xl">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
            <Image
              src="/espa/eu-flag.png"
              alt="Ευρωπαϊκή Ένωση - Με τη συγχρηματοδότηση της Ευρωπαϊκής Ένωσης"
              width={240}
              height={108}
              className="h-16 sm:h-20 md:h-24 w-auto object-contain"
            />
            <Image
              src="/espa/espa-2021-2027.png"
              alt="ΕΣΠΑ 2021-2027"
              width={200}
              height={108}
              className="h-16 sm:h-20 md:h-24 w-auto object-contain"
            />
            <Image
              src="/espa/antagonistikotita.jpg"
              alt="Πρόγραμμα Ανταγωνιστικότητα 2021-2027"
              width={240}
              height={108}
              className="h-16 sm:h-20 md:h-24 w-auto object-contain"
            />
          </div>
          <p className="text-xs sm:text-sm text-gray-600 text-center leading-snug max-w-2xl font-sans">
            Με τη συγχρηματοδότηση της Ευρωπαϊκής Ένωσης. Δράση «Ενίσχυση της Ίδρυσης και Λειτουργίας Νέων ΜμΕ» —
            Πρόγραμμα «Ανταγωνιστικότητα» ΕΣΠΑ 2021-2027
          </p>
        </div>
      </div>
    </div>
  );
}
