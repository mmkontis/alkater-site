"use client";

import Image from "next/image";

export function EspaBanner() {
  return (
    <div
      className="w-full bg-white border-b border-gray-200"
      role="banner"
      aria-label="ΕΣΠΑ 2021-2027 - Συγχρηματοδότηση Ευρωπαϊκής Ένωσης"
    >
      <div className="container mx-auto px-4 py-3 sm:py-4 max-w-7xl">
        <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-8 flex-nowrap min-w-0">
          <Image
            src="/espa/eu-flag.png"
            alt="Ευρωπαϊκή Ένωση - Με τη συγχρηματοδότηση της Ευρωπαϊκής Ένωσης"
            width={320}
            height={144}
            className="h-10 sm:h-14 md:h-20 w-auto object-contain shrink"
          />
          <Image
            src="/espa/espa-2021-2027.png"
            alt="ΕΣΠΑ 2021-2027"
            width={280}
            height={144}
            className="h-10 sm:h-14 md:h-20 w-auto object-contain shrink"
          />
          <Image
            src="/espa/antagonistikotita.jpg"
            alt="Πρόγραμμα Ανταγωνιστικότητα 2021-2027"
            width={320}
            height={144}
            className="h-10 sm:h-14 md:h-20 w-auto object-contain shrink"
          />
          <p className="hidden xl:block text-[11px] text-gray-700 leading-snug font-sans whitespace-normal max-w-xs shrink">
            Με τη συγχρηματοδότηση της Ευρωπαϊκής Ένωσης · Δράση «Ενίσχυση της Ίδρυσης και Λειτουργίας Νέων ΜμΕ» — Πρόγραμμα «Ανταγωνιστικότητα» ΕΣΠΑ 2021-2027
          </p>
        </div>
      </div>
    </div>
  );
}
