import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Ray Marcus | Interactive Room",
    description: "Immersive 3D website for R&B artist Ray Marcus",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>{children}</body>
        </html>
    );
}
