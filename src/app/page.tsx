"use client"
                            //Importando arquivos

import Image from "next/image";
import logo from "../assets/titulo.png"
import ResetIcon from "../svgs/restart.svg";
import { InfoItem } from "@/components/InfoItem";
import { Button } from "@/components/Button";
import { useEffect, useState } from "react";
import { GridItem } from "@/types/GridItem";
import { items } from "@/data/item";
import { GridItemComp } from "@/components/GridItemComp";
import { formatTimeElapsed } from "@/helpers/formatTimeElapsed";

const Page = () =>{
                              //Criando States

  const [playing, setPlaying] = useState<boolean>(false); //jogo rolando ou não
  const [timeElapsed, setTimeElapsed] = useState<number>(0); //tempo decorrido
  const [moveCount, setMoveCount] = useState<number>(0); //quantidade de movimentos
  const [showCount, setShowCount] = useState<number>(0); //cartas exibidas
  const [gridItem, setGridItem] = useState<GridItem[]>([]); //lista de itens do grid

                                //UseEffect's

  useEffect(()=>{  //começar o jogo
    resetAndCreateGrid()
  }, [])

  useEffect(()=>{ //iniciar o timer
    const timer = setInterval(()=>{
      if(playing){
        setTimeElapsed(timeElapsed + 1)
      }
    }, 1000);
    return ()=> clearInterval(timer);
  }, [playing, timeElapsed ]);

  useEffect(()=>{ // verificar as cartas abertas
    if(showCount === 2){
      let openend = gridItem.filter(item => item.shown === true);
      if(openend.length === 2){

        
        if(openend[0].item === openend[1].item){
          //v1 - Verificar se as cartas são iguais, para torna-las permanentes
          let tmpgGrid = [...gridItem];
          for(let i in tmpgGrid){
            if(tmpgGrid[i].shown){
              tmpgGrid[i].permanentShown = true;
              tmpgGrid[i].shown = false;
            }
          }
          setGridItem(tmpgGrid);
          setShowCount(0);
        } else {
          //v2 - Se as cartas não forem iguais, devem ser desviradas.
          setTimeout(()=>{
            let tmpgGrid = [...gridItem];
            for(let i in tmpgGrid){
            tmpgGrid[i].shown = false;
          }
            setGridItem(tmpgGrid);
            setShowCount(0);
          }, 2000)
        }
        setMoveCount(moveCount => moveCount + 1);
      }
    }
  }, [showCount, gridItem]);

  useEffect(()=>{ //finalizando o jogo
    if(moveCount > 0 && gridItem.every(item => item.permanentShown === true) ){
      setPlaying(false);
    }
  }, [moveCount, gridItem]);


                                //Funçõe de clique

  const resetAndCreateGrid = ()=>{
    // passo 1 - resetar o jogo
    setTimeElapsed(0);
    setMoveCount(0);
    setShowCount(0);

    //passo 2 - criar o grid
    //passo 2.1 - criar um grid vazio
    let tmpGrid: GridItem[] = [];
    for(let i = 0; i < (items.length * 2); i++){
      tmpGrid.push({
        item: null,
        shown: false,
        permanentShown: false
      });
    }
    //passso 2.2 - preencher o grid
      for(let w = 0; w < 2; w++){
        for(let i = 0; i < items.length; i++){
          let pos = -1;
          while(pos < 0 || tmpGrid[pos].item !== null){
            pos = Math.floor(Math.random() * (items.length * 2))
          }
          tmpGrid[pos].item = i;
        }
      }
    //passo 2.3 - jogar o grid na state
    setGridItem(tmpGrid);
    //passo 3 - e começar o jogo
    setPlaying(true);
  }

  const handleClickItem = (index: number)=>{
    if(playing && index !== null && showCount < 2){
      let tmpGrid = [...gridItem];

      if(tmpGrid[index].permanentShown == false && tmpGrid[index].shown === false){
        tmpGrid[index].shown = true;
        setShowCount(showCount + 1);
      }

      setGridItem(tmpGrid)
    }
  }
                            //Exibição na tela (jsx)

  return (
    <div className="w-full max-w-3xl m-auto flex py-12 px-0
                    md:flex-col"> {/* Container */}

      <div className="flex flex-col w-auto
                      md:mb-12 md:items-center"> 

      <a href="" className="block"> 
        <Image src={logo} width='200' alt="Jogo da Memória"/>
      </a> {/* LogoLink */}
        <div className="w-full py-3 px-0
                        md:flex md:justify-around md:text-center">  

        <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
        <InfoItem label="Jogadas" value={moveCount.toString()} />
        </div> {/* InfoArea */}

        <Button label="Reiniciar" icon={ResetIcon} onClick={resetAndCreateGrid}/>

      </div> {/* LeftArea/Info */}
      <div className="flex flex-1 justify-end 
                      md:justify-center md:my-0 md:mx-6">

        <div className="grid grid-cols-4 gap-3 w-96
                        md:grid-cols-3">
          {gridItem.map((item, index)=> (
            <GridItemComp
            key={index}
            item={item}
            onClick={()=> handleClickItem(index)}
            />
          ))}
        </div> {/*Grid*/}

      </div>{/* RightArea/GridArea */}

    </div> 

  )
};

export default Page;

