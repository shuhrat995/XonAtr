import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import BlogList from '@/components/blog/BlogList';

export const metadata = {
  title: 'Blog — Xon Atr',
  description: 'Atirlar haqida foydali maqolalar, maslahatlar va tavsiyalar',
};

export default function BlogPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1 pt-24 sm:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-text-muted max-w-lg mx-auto">
              Atirlar haqida foydali maqolalar va maslahatlar
            </p>
          </div>
          <BlogList />
        </div>
      </main>
      <Footer />
    </>
  );
}
