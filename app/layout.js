import Navbar from "../components/navbar"

export const metadata = {
  title: 'SAES',
  description: 'Proyecto final',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <Navbar />
          <div className="content">{children}</div>
        </div>
        
      </body>
    </html>
  )
}
