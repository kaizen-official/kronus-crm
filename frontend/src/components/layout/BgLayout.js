import Header from "./Header";
import Footer from "./Footer";

export default function BgLayout({ children, showHeader = true, showFooter = true }) {
    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans selection:bg-brand-primary selection:text-white">
            {showHeader && <Header />}
            <main className={`grow ${showHeader ? "pt-20" : ""}`}>
                {children}
            </main>
            {showFooter && <Footer />}
        </div>
    );
}
