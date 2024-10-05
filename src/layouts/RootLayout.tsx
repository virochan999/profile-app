import { Outlet } from "react-router-dom"
import Footer from "../components/Footer.tsx"
import Header from "../components/Header.tsx"

const RootLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gradient-to-r from-neutral-900 to-gray-500 text-white">
        <Header/>
        <Outlet/>
        <Footer/>
      </div>
    </>
  )
}

export default RootLayout
