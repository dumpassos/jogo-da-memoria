import { GridItem } from "@/types/GridItem"
import b7Svg from "../svgs/b7.svg";
import Image from "next/image";
import {items} from "../data/item";

type Props = {
    item: GridItem,
    onClick: () => void
}

export const GridItemComp = ({item, onClick}: Props)=>{
    return (
        <div onClick={onClick}
        > {/*Conteiner*/}
        {item.permanentShown === false && item.shown === false &&
            <div className="bg-gray-300 h-24 rounded-2xl flex 
                            justify-center items-center cursor-pointer">
            <Image src={b7Svg} alt=""
                    className="h-10 w-10 opacity-10"/>
            </div>
        }

        {(item.permanentShown || item.shown) && item.item !== null &&
            <div className="bg-teal-600 h-24 rounded-2xl flex 
                            justify-center items-center cursor-pointer">
            <Image src={items[item.item].icon} alt=""
                className="h-10 w-10"/>
            </div>
        }
        </div>
    )
}