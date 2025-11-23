// pages/_app.js
import './globals.css';
import './homepage.css';
import ClientHydrate from './ClientHydrate';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return (
    <ClientHydrate>
      <Head>
        <title>RENEW - Energy Solutions for Homes & Businesses</title>
        <meta
          name="description"
          content="Reduce energy costs, improve efficiency, and embrace sustainability with RENEW energy solutions."
        />
      </Head>
      <Component {...pageProps} />
    </ClientHydrate>
  );
}
