import "./globals.css";


export const metadata = {
  title: "BusBuddies",
  description: "Stay safe and find your bus buddy",
  image: "/logo.svg",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <main>{children}</main>
      </body>
    </html>
  );
}