"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export function EspaBanner() {
  const t = useTranslations("footer");
  const a = useTranslations("a11y");

  return (
    <div
      className="w-full bg-white border-b border-gray-200"
      role="region"
      aria-label={a("espaBanner")}
    >
      <div className="container mx-auto px-4 py-3 sm:py-4 max-w-7xl">
        <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-8 flex-nowrap min-w-0">
          <Image
            src="/espa/eu-flag.png"
            alt={t("euAlt")}
            width={320}
            height={144}
            className="h-10 sm:h-14 md:h-20 w-auto object-contain shrink"
          />
          <Image
            src="/espa/espa-2021-2027.png"
            alt={t("espaAlt")}
            width={280}
            height={144}
            className="h-10 sm:h-14 md:h-20 w-auto object-contain shrink"
          />
          <Image
            src="/espa/antagonistikotita.jpg"
            alt={t("competitivenessAlt")}
            width={320}
            height={144}
            className="h-10 sm:h-14 md:h-20 w-auto object-contain shrink"
          />
          <p className="hidden xl:block text-[11px] text-gray-700 leading-snug font-bold font-['Arial',Calibri,Tahoma,sans-serif] whitespace-normal max-w-xs shrink">
            {t("espaText")}
          </p>
        </div>
      </div>
    </div>
  );
}
