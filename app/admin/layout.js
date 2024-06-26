import Ahome from "../../components/html/home3.jsx"


export default function userLayout({ children }) {
    return (      
        <div>
            <Ahome/>
            {children}
            
        </div>
    )
  }
  