import '@styles/globals.css'
import Nav from '@components/nav'

export const metadata = {
    title: "Crypto",
    description: "this is my crypto site"
}

const RootLayout = ({children}) => {
  return (
    <html>
        <body>
            <div>
                <div className="main">
                    <div className="gradient"></div>

                    <main className='app'>
                        <Nav/>
                        {children}
                    </main>
                </div>

            </div>
        </body>
    </html>
  )
}

export default RootLayout;