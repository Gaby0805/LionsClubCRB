import {CircleUserRound} from "lucide-react"


export default function HeaderDash() {
    return(
        <div className="flex  h-16 bg-white  items-center mx-10 justify-between">

        <p className="font-bold text-2xl">Ana Karina</p>


        <div>
            <CircleUserRound color="black" size={36}/>
            
        </div>
        </div>
    )

}