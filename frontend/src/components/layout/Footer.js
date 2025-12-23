import Link from "next/link";
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="text-2xl font-bold text-brand-primary mb-4 block">
                            Kronus
                        </Link>
                        <p className="text-gray-600 max-w-sm mb-6">
                            Empowering businesses with intelligent CRM solutions. Scale faster, manage better, and grow smarter with Kronus.
                        </p>
                        <div className="flex gap-4">
                            {[FaTwitter, FaLinkedin, FaGithub, FaInstagram].map((Icon, i) => (
                                <a key={i} href="#" className="text-gray-400 hover:text-brand-primary transition-colors text-xl">
                                    <Icon />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Product</h3>
                        <ul className="space-y-3">
                            {["Features", "Pricing", "Integrations", "FAQ"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-gray-600 hover:text-brand-primary transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Company</h3>
                        <ul className="space-y-3">
                            {["About Us", "Careers", "Blog", "Contact"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-gray-600 hover:text-brand-primary transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} Kronus CRM. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-gray-900">Privacy Policy</Link>
                        <Link href="#" className="hover:text-gray-900">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
