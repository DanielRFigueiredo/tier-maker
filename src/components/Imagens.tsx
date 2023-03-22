import { useDrag } from 'react-dnd'
import { ItemTypes } from '../dragTypes/ItemTypes'

interface ImagensProps {
  data: {
    url: string;
    alt: string;
    id: number;
  }

}

export function Imagens({ data }: ImagensProps) {

  const { alt, url, id } = data;
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.IMGS,
    item: { index: id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))


  return (


    <img className='img2'
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
      }}
      src={`${url}`} alt={`${alt}`}
    />



  )
}