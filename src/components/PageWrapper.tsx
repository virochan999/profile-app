import { ReactNode } from "react"

const PageWrapper = ({children} : {children: ReactNode}) => {
  return (
    <div className="flex-1 flex">
      {children}
    </div>
  )
}

export default PageWrapper