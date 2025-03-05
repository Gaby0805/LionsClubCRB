import {BookOpen,Backpack, FileSpreadsheet} from "lucide-react"


export default function Asside() {
    return(
        
        <div className="w-52  rounded-r-xl flex" style={{ backgroundColor: "#4C506B"}}>
            <nav className="text-white flex flex-col mr">
                    <div className="flex flex-col justify-center  items-center gap-9  mt-15  " style={{fontSize: 20}}>
                    <div className="flex items-center ">
                    <BookOpen/>
                    <a  className="ml-1.5" href="">comodato</a>
                    </div>
                    <div className="flex items-center">
                    <Backpack/>
                    <a className="ml-1.5" href="">comotato <br />inventario</a>
                    </div>
                    <div className="flex items-center ">
                    <FileSpreadsheet/>
                    <a className="ml-1.5" href="">relatorio</a>
                    </div>
                    </div>
                    
                    <div className="flex flex-col  justify-center  items-center gap-9  m-15 mt-auto ">

                    <a href="">configuração</a>
                    <img src="/imgs/LogoLeoncio.png"  />

                    </div>

            </nav>


        </div>
    )

}