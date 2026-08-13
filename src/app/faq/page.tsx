import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions - Aparto',
  description: 'Find answers to common questions about Aparto products, ordering, delivery, payments, and returns.',
};

const faqs = [
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept Cash on Delivery (COD), SSLCommerz (credit/debit cards, mobile banking), and ShurjoPay.',
  },
  {
    question: 'Do you deliver all over Bangladesh?',
    answer: 'Yes, we deliver to all 64 districts in Bangladesh. Delivery charges vary based on location and order value.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 3-day replacement policy for damaged or defective items. Products must be in original condition with all packaging intact.',
  },
  {
    question: 'How can I track my order?',
    answer: 'Once your order is shipped, you will receive a tracking number via SMS and email. You can also track your order using the track order page on our website.',
  },
  {
    question: 'Are your products genuine?',
    answer: 'Yes, all our products are 100% genuine and quality-checked. We source directly from trusted manufacturers and brands.',
  },
  {
    question: 'Do you offer bulk/wholesale pricing?',
    answer: 'Yes, we offer special pricing for bulk orders. Please contact our sales team at wholesale@aparto.com.bd for more information.',
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white font-serif mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">Find answers to common questions about our products and services</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
