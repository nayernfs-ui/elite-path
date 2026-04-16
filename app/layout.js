import './globals.css';

export const metadata = {
  title: 'Elite-Path — Premium Visa, Study & Immigration Services',
  description: 'Elite-Path — trusted visa, study abroad & immigration consultancy. US B1/B2, Canada tourism visas, and more.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Fraunces:wght@400;500;600;700&family=DM+Serif+Display&family=Bodoni+Moda:wght@400;500;600;700&family=Manrope:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&family=Work+Sans:wght@300;400;500;600;700&family=Amiri:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
