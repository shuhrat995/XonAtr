import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import QuizForm from '@/components/quiz/QuizForm';

export const metadata = {
  title: 'Atir tanlash testi — Xon Atr',
  description: '4 ta savolga javob bering, biz sizga eng mos atirni tavsiya qilamiz!',
};

export default function QuizPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1 pt-24 sm:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              <span className="gradient-text">&quot;Atir tanlay olmayapman&quot;</span>
            </h1>
            <p className="text-text-muted max-w-lg mx-auto">
              4 ta oddiy savolga javob bering — biz sizga mukammal atirni topamiz!
            </p>
          </div>
          <QuizForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
