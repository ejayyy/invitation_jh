"use client";

import React, { useRef, useEffect, useState } from "react";

interface Account {
  title: string;
  name: string;
  number: string;
  bank: string;
}

interface AccordionItem {
  title: string;
  accounts: Account[];
}

interface AccordionProps {
  title: string;
  accounts: Account[];
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionProps> = ({ title, accounts, isOpen, onToggle }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen, accounts]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("계좌번호가 복사되었습니다.");
    });
  };

  return (
    <div className="mb-4 w-full border border-neutral-200 dark:border-neutral-700 rounded-sm">
      <button
        onClick={onToggle}
        className="w-full p-3 flex justify-between items-center hover:bg-neutral-100 dark:hover:bg-neutral-900"
      >
        <span className="font-light font-(family-name:--font-ibm-plex-sans-kr)">{title}</span>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className="overflow-hidden transition-all duration-300"
        style={{ height: `${contentHeight}px` }}
      >
        <div ref={contentRef} className="p-3">
          <div className="flex flex-col gap-3">
            {accounts.map((acc, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-bold">{acc.title}</span>
                  <span className="text-sm font-medium">{acc.name}</span>
                </div>
                <button
                  onClick={() => handleCopy(`${acc.bank} ${acc.number}`)}
                  className="bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 py-2 px-3 rounded-sm text-sm flex items-center basis-2/3"
                >
                  <span className="text-xs ml-1 mr-2">{acc.bank}</span>
                  {acc.number}
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 text-right font-(family-name:--font-ibm-plex-sans-kr)">
            계좌번호 클릭 시 복사됩니다.
          </p>
        </div>
      </div>
    </div>
  );
};

interface AccordionComponentProps {
  className?: string;
}

export default function Accordion({ className }: AccordionComponentProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // 여기에 계좌 정보를 입력하세요
  const accordionData: AccordionItem[] = [
    {
      title: "신부 측",
      accounts: [
        {
          title: "신부",
          name: "정보민",
          number: "110-427-946154",
          bank: "신한",
        },
        {
          title: "아버지",
          name: "정동수",
          number: "85690100005762",
          bank: "국민",
        },
        {
          title: "어머니",
          name: "박미경",
          number: "912-04-106769",
          bank: "신한",
        },
      ],
    },
    {
      title: "신랑 측",
      accounts: [{
        title: "신랑",
        name: "하정수",
        number: "110-427-946154",
        bank: "신한",
      },
      {
        title: "아버지",
        name: "하후동",
        number: "1005-903-884007",
        bank: "우리",
      },
      {
        title: "어머니",
        name: "박옥분",
        number: "1005-403-217198",
        bank: "우리",
      },
      ],
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`w-full py-20 px-4 ${className || ''}`}>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          마음 전하실 곳
        </h2>
        <div className="space-y-4">
          {accordionData.map((item, index) => (
            <AccordionItem
              key={index}
              title={item.title}
              accounts={item.accounts}
              isOpen={openIndex === index}
              onToggle={() => toggleAccordion(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 