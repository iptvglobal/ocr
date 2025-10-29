import React from 'react';
import { AccordionItem } from './components/AccordionItem';

const faqData = [
  {
    question: "Is my image data stored on your servers?",
    answer: "No, your privacy is our top priority. Images are sent directly to Google's Gemini API for processing and are never stored on our servers. The process is designed to be stateless; we process your image and then immediately discard it."
  },
  {
    question: "What image formats are supported?",
    answer: "We support all common image formats, including PNG, JPG/JPEG, and WEBP. For best results, use a clear image with high contrast between the text and the background."
  },
  {
    question: "How accurate is the text extraction and translation?",
    answer: "Powered by Google's state-of-the-art Gemini model, our tool offers extremely high accuracy. However, accuracy can vary based on the image quality, the clarity and font of the text, and the complexity of the language. For translations, the AI provides a context-aware result that is generally very reliable."
  },
  {
    question: "Is Screen 2 Text free to use?",
    answer: "Yes, our basic service is completely free to use. We believe in making this technology accessible to everyone."
  },
  {
    question: "Are there any limits on usage?",
    answer: "For anonymous users, there are fair-use rate limits in place to ensure service stability for everyone. These limits are generally high enough for most standard use cases."
  },
  {
    question: "Which languages can I translate to?",
    answer: "We support a wide and growing list of languages. You can see the full, up-to-date list in the language selector dropdown on the main tool page."
  }
];

const FAQPage: React.FC = () => {
  return (
    <div className="py-16 sm:py-24 bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base font-semibold text-indigo-400 tracking-wide uppercase">FAQ</h2>
          <p className="mt-1 text-4xl font-extrabold text-white sm:text-5xl">
            Frequently Asked Questions
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-300">
            Have questions? We have answers. If you can't find what you're looking for, feel free to contact our support.
          </p>
        </div>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <AccordionItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
