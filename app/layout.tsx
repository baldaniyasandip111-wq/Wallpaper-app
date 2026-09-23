import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata={title:"Wallpaper.app",description:"Beautiful wallpapers for your phone"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}