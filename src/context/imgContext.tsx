import { createContext, ReactNode, useState } from 'react'

interface BoxsData {
  cor: string;
  tier: string;
  id: number;
  order: number;
}

type imgsData = {
  url: string;
  id: number;
  alt: string;
  row: number;
  order: number;
}

interface ImgProviderProp {
  children: ReactNode
}

interface ImgContextData {
  image: imgsData[];

  boxs: BoxsData[]
  attImage: (array: imgsData[], prev?: 'prev') => void;


  handleAltBox: (position: number, text: 'cima' | 'baixo') => void;
  ajustImg: (imgId: number, rowId: number) => void;
  handlTierColor: (tier: string, cor: string, id: number) => void;
  handlDelRow: (id: number) => void;

}

export const ImgContext = createContext<ImgContextData>({} as ImgContextData)



export default function ImgProvider({ children }: ImgProviderProp) {
  const [image, setImage] = useState([
    { id: 0, alt: 'komi-san', row: 999, order: 0, url: 'https://w0.peakpx.com/wallpaper/162/578/HD-wallpaper-komi-san-cute-thumbnail.jpg' },
    { id: 1, alt: 'komi-san', row: 999, order: 0, url: 'https://c4.wallpaperflare.com/wallpaper/517/850/372/komi-san-wa-comyushou-desu-alternate-outfit-ponytail-pantyhose-black-sweater-hd-wallpaper-preview.jpg' },
  ])

  const [boxs, setBoxs] = useState<BoxsData[]>([
    { cor: 'red', tier: 'S', id: 0, order: 0 },
    { cor: 'blue', tier: 'A', id: 1, order: 1 },
    { cor: 'green', tier: 'B', id: 2, order: 2 },
    { cor: 'yellow', tier: 'C', id: 3, order: 3 },
  ])

  function attImage(newArrayImagens: imgsData[], prev?: 'prev') {
    if (prev) {
      console.log('aqui2')
      setImage(prev => [...prev, ...newArrayImagens])
      
    } else {
      console.log('aqui3')
      setImage(newArrayImagens)
    }
  }

  // muda a ordem das boxs
  function handleAltBox(position: number, text: 'cima' | 'baixo') {
    if (text === 'cima') {
      if (position === 0) return
      const newBoxs = boxs.map(box => {
        if (box.order === position) {
          box.order = box.order - 1
          return box
        }
        if (box.order === position - 1) {
          box.order = box.order + 1
          return box
        }
        return box
      })
      setBoxs(newBoxs)


    }
    if (text === 'baixo') {
      if (position === boxs.length - 1) return
      const newBoxs = boxs.map(box => {
        if (box.order === position) {
          box.order = box.order + 1
          return box
        }
        if (box.order === position + 1) {
          box.order = box.order - 1
          return box
        }
        return box
      })
      setBoxs(newBoxs)
    }

  }

  // coloca as imagens na box correta
  function ajustImg(imgId: number, rowId: number) {

   
      console.log(image)
      const totalImgRow = image.filter(img => img.row === rowId).sort((a, b) => a.order - b.order)

      const ultImg = ultImg01()
      function ultImg01() {
        if ([totalImgRow[totalImgRow.length - 1]][0]?.order) return [totalImgRow[totalImgRow.length - 1]][0].order
        return 0
      }

      const newArrayImg = image.map(img => {
        if (img.id === imgId) {
          img.row = rowId
          img.order = ultImg + 1
        }
        return img
      })

      attImage(newArrayImg)
    


  }
  //muda o tier e a cor da box selecionada
  function handlTierColor(tier: string, cor: string, id: number) {
    const newBoxs = boxs.map(box => {
      if (box.id === id) {
        box.tier = tier;
        box.cor = cor;
      }
      return box;
    })
    setBoxs(newBoxs)
  }
  // deleta a box selecionada
  function handlDelRow(id: number) {
    const newBoxs = boxs.filter(box => box.id !== id)
    setBoxs(newBoxs)
  }




  return (
    <ImgContext.Provider value={{ image, boxs, attImage, handleAltBox, ajustImg, handlTierColor, handlDelRow }}>
      {children}
    </ImgContext.Provider>
  )

}