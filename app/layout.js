import './globals.css'
import ClientHydrate from './ClientHydrate'

export const metadata = {
  title: "RENEW - Energy Solutions for Homes & Businesses",
  description: "Reduce energy costs, improve efficiency, and embrace sustainability with RENEW energy solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ClientHydrate>
          {children}
        </ClientHydrate>
      </body>
    </html>
  );
}
