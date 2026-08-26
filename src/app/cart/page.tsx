import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import CartView from '@/components/cart/CartView';

export const metadata = {
  title: 'Savatcha — Xon Atr',
};

export default function CartPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1 pt-24 sm:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-8">
            <span className="gradient-text">Savatcha</span>
          </h1>
          <CartView />
        </div>
      </main>
      <Footer />
    </>
  );
}
