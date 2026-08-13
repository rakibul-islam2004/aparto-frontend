import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'Privacy Policy - Aparto',
  description: 'Read how Aparto collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white font-serif mb-8">Privacy Policy</h1>
        <div className="prose dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">1. Information We Collect</h2>
            <p className="text-muted-foreground">We collect information you provide directly, such as your name, email, phone number, shipping address, and payment information when you place an order or create an account.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">2. How We Use Your Information</h2>
            <p className="text-muted-foreground">We use your information to process orders, communicate with you about your purchases, improve our services, and send promotional offers (with your consent).</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">3. Data Security</h2>
            <p className="text-muted-foreground">We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">4. Cookies</h2>
            <p className="text-muted-foreground">We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can disable cookies in your browser settings.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">5. Third-Party Services</h2>
            <p className="text-muted-foreground">We may use third-party services for payment processing, delivery, and analytics. These services have their own privacy policies.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">6. Your Rights</h2>
            <p className="text-muted-foreground">You have the right to access, correct, or delete your personal information. Contact us at privacy@aparto.com.bd for any privacy-related requests.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">7. Changes to This Policy</h2>
            <p className="text-muted-foreground">We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
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
