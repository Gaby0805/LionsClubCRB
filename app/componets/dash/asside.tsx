import {BookOpen,Backpack, FileSpreadsheet} from "lucide-react"


export default function Asside() {
    return(
        
        <div className="w-50  rounded-r-xl flex" style={{ backgroundColor: "#4C506B"}}>
            <nav className="text-white flex flex-col " >
                    <div className="flex flex-col justify-center  items-center gap-9  mt-15 mr-2  " style={{fontSize: 18}}>
                    <div className="flex items-center ">
                    <BookOpen/>
                    <a  className="ml-3" href="/dashboard/comodato">comodato</a>
                    </div>
                    <div className="flex items-center justify-items-start">
                    <Backpack/>
                    <a className="ml-3" href="">comotato <br /> inventario</a>
                    </div>
                    <div className="flex items-center ">
                    <FileSpreadsheet/>
                    <a className="ml-4" href="">relatorio</a>
                    </div>
                    </div>
                    
                    <div className="flex flex-col  justify-center  items-center gap-9  m-15 mt-auto ">

                    <a href="">configuração</a>
                    <a href="/dashboard">
                    <img src="/imgs/LogoLeoncio.png"  />
                    </a>

                    </div>

            </nav>


        </div>
    )

}