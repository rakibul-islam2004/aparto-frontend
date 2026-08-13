import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'Terms & Conditions - Aparto',
  description: 'Read the terms and conditions for using Aparto e-commerce platform.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white font-serif mb-8">Terms & Conditions</h1>
        <div className="prose dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">By accessing and using the Aparto platform, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">2. Use of the Platform</h2>
            <p className="text-muted-foreground">You agree to use our platform only for lawful purposes and in a way that does not infringe the rights of others. You are responsible for maintaining the confidentiality of your account information.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">3. Orders and Payments</h2>
            <p className="text-muted-foreground">All orders are subject to acceptance and availability. We reserve the right to refuse any order. Prices are subject to change without notice. Payment must be received before order processing.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">4. Delivery</h2>
            <p className="text-muted-foreground">We aim to deliver within the estimated timeframe. However, delivery times are not guaranteed. We are not liable for delays caused by courier services or unforeseen circumstances.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">5. Returns and Refunds</h2>
            <p className="text-muted-foreground">We offer a 3-day replacement policy for damaged or defective items. Returns are subject to our return policy. Refunds will be processed within 7-10 business days after inspection.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">6. Intellectual Property</h2>
            <p className="text-muted-foreground">All content on this platform, including text, graphics, logos, and images, is the property of Aparto and is protected by intellectual property laws.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">7. Contact</h2>
            <p className="text-muted-foreground">For questions about these terms, please contact us at legal@aparto.com.bd.</p>
          </section>
        </div>
        <div className="mt-8">
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
