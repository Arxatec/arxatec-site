import React, { useState } from "react";

const QaSection = ({ faqSection }) => {
  const faqs = faqSection.faqs;

  const [openIndex, setOpenIndex] = useState(-1);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40 w-full">
        <div className="mx-auto w-full">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-base/7 font-semibold text-blue-600 text-left">
              {faqSection.tag}
            </h2>
            <p className="mt-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-gray-950 text-left">
              {faqSection.title}
            </p>
            <p className="mt-6 max-w-2xl text-pretty text-left text-base font-medium text-gray-600">
              {faqSection.description}
            </p>
          </div>

          <dl className="mt-2 divide-y divide-gray-900/10 w-full bg-white p-6 rounded-lg shadow-lg">
            {faqs.map((faq, index) => (
              <div key={index} className="py-6 first:pt-0 last:pb-0">
                <dt>
                  <button
                    type="button"
                    className="flex w-full items-start justify-between text-left text-gray-900 text-lg"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={openIndex === index}
                  >
                    <span className="text-base font-semibold">
                      {faq.question}
                    </span>
                    <span className="ml-6 flex h-7 items-center">
                      {openIndex === index ? (
                        <svg
                          className="size-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18 12H6"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="size-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v12m6-6H6"
                          />
                        </svg>
                      )}
                    </span>
                  </button>
                </dt>
                <dd
                  className={`mt-2 pr-12 text-gray-600 ${
                    openIndex === index ? "" : "hidden"
                  }`}
                >
                  <p className="text-base/7">{faq.answer}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default QaSection;
