import './globals.css';

export const metadata = {
  title: 'Nagarik Sathi',
  description: 'Citizen support app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
