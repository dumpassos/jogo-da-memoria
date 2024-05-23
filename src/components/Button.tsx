import Image from "next/image"

type Props = {
    label: string,
    icon?: any,
    onClick: React.MouseEventHandler<HTMLDivElement>

}

export const Button = ({label, icon, onClick}: Props)=>{

    return(
        <div onClick={onClick} 
        className="w-52 h-12 flex bg-teal-600 rounded-full 
                cursor-pointer opacity-100 hover:opacity-80 transition-all"
            > {/* Container */}

            {icon &&
            <div className="h-12 flex justify-center items-center border-r-2 py-0 px-4">  {/* IconArea */}
            <Image src={icon} alt="" className="h-5"/>
            </div>
            }

            <div className="h-12 text-white flex 
                            justify-center items-center flex-1 py-0 p-5">{label}</div>
        </div> 
    )
}