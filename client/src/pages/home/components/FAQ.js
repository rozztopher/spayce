import React, { useState } from "react";
import FAB from "../../../components/FAB";
import CTAbutton from "../../../components/CTAbutton";

const FAQ = () => {
  const fill = window.innerWidth <= 480 ? true : false;

  const [activeQ, setActiveQ] = useState(-1);

  const handleClick = (i) => {
    if (activeQ === i) {
      setActiveQ(-1);
    } else {
      setActiveQ(i);
    }
  };

  const QandAs = [
    {
      question: "What all do you include?",
      answer:
        "Velit officia consequat duis enim velit mollit. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    },
    {
      question: "What if I changed my decision?",
      answer:
        "Velit officia consequat duis enim velit mollit. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    },
    {
      question: "Which currencies do you accept?",
      answer:
        "Velit officia consequat duis enim velit mollit. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    },
    {
      question: "What about product return?",
      answer:
        "Velit officia consequat duis enim velit mollit. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    },
    {
      question: "Do you provide product support?",
      answer:
        "Velit officia consequat duis enim velit mollit. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    },
    {
      question: "What all do you include?",
      answer:
        "Velit officia consequat duis enim velit mollit. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    },
  ];

  return (
    <div className="faq-container mt-100">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-grid mt-50 mb-40">
        {QandAs.map((qa, i) => {
          return (
            <div className="q-and-a glass" key={qa + i}>
              <div className="q-and-a-header">
                <p className="fs-18">{qa.question}</p>
                <div onClick={() => handleClick(i)}>
                  <FAB
                    height="2.5vw"
                    width="2.5vw"
                    src={
                      activeQ === i
                        ? "/icons/minus.svg"
                        : "/icons/plus-bold.svg"
                    }
                    alt="plus"
                    outline={true}
                  />
                </div>
              </div>
              {activeQ === i && <p className="ceil lh-33">{qa.answer}</p>}
            </div>
          );
        })}
      </div>
      <CTAbutton
        background="linear-gradient(90deg, #BA04FC 0%, #6700EB 100%)"
        outline={false}
        text="View all FAQs"
        height="40px"
        wide={!fill}
        fill={fill}
        fontSize="0.938rem"
      />
    </div>
  );
};

export default FAQ;
