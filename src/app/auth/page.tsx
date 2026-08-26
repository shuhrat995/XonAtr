import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import AuthForm from '@/components/auth/AuthForm';

export const metadata = {
  title: 'Kirish / Ro\'yxatdan o\'tish — Xon Atr',
};

export default function AuthPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1 flex items-center justify-center pt-20">
        <AuthForm />
      </main>
      <Footer />
    </>
  );
}
