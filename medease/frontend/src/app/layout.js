// These styles apply to every route in the application
import "./globals.css";

export const metadata = {
  title: "MedEase",
  description: "Electronic blockchain based healthcare system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
