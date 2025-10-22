import './globals.css'

export const metadata = {
  title: 'Freelancer Portfolio',
  description: 'Professional freelancer portfolio showcasing custom software solutions',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
