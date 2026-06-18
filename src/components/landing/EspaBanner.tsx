"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

export function EspaBanner() {
  const t = useTranslations("footer");
  const a = useTranslations("a11y");

  // ESPA signage stays Greek by law on the EL site; EN & DE show the official English logos.
  const en = useLocale() !== "el";
  const euSrc = en ? "/espa/eu-flag-en.png" : "/espa/eu-flag.png";
  const espaSrc = en ? "/espa/espa-2021-2027-en.png" : "/espa/espa-2021-2027.png";
  const competitivenessSrc = en ? "/espa/antagonistikotita-en.png" : "/espa/antagonistikotita.jpg";

  // Clicking the banner opens the A3 publicity poster (αφίσα) in a new tab — ESPA visibility requirement.
  // EL → official Greek poster (PDF); EN & DE → English version.
  const posterHref = en ? "/espa/poster-alkater-a3-en.jpg" : "/espa/poster-alkater-a3.pdf";

  return (
    <div
      className="w-full bg-white border-b border-gray-200"
      role="region"
      aria-label={a("espaBanner")}
    >
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 py-3 sm:py-4 max-w-7xl">
        <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-8 flex-nowrap min-w-0">
          <a
            href={posterHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={a("espaPoster")}
            title={a("espaPoster")}
            className="flex items-center justify-center gap-3 sm:gap-5 md:gap-8 flex-nowrap min-w-0 rounded-sm outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
          >
            <Image
              src={euSrc}
              alt={t("euAlt")}
              width={320}
              height={144}
              className="h-6 sm:h-9 md:h-12 w-auto object-contain shrink"
            />
            <Image
              src={espaSrc}
              alt={t("espaAlt")}
              width={280}
              height={144}
              className="h-6 sm:h-9 md:h-12 w-auto object-contain shrink"
            />
            <Image
              src={competitivenessSrc}
              alt={t("competitivenessAlt")}
              width={320}
              height={144}
              className="h-6 sm:h-9 md:h-12 w-auto object-contain shrink"
            />
          </a>
          <p className="hidden xl:block text-[11px] text-gray-700 leading-snug font-bold font-['Arial',Calibri,Tahoma,sans-serif] whitespace-normal max-w-xs shrink">
            {t("espaText")}
          </p>
        </div>
      </div>
    </div>
  );
}
