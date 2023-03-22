import './styles.scss'

import { AiTwotoneSetting } from "react-icons/ai";
import { BsFillArrowDownSquareFill, BsFillArrowUpSquareFill } from "react-icons/bs";
import { useDrop } from 'react-dnd'

import { ItemTypes } from "../../dragTypes/ItemTypes";
import { useState, useContext } from "react";
import { Imagens } from "../Imagens";

import { ModalRow } from '../ModalRow';
import Modal from 'react-modal';
import { ImgContext } from '../../context/imgContext';

Modal.setAppElement('#root');


interface RowProps {

  boxs: {
    cor: string;
    tier: string;
    id: number;
    order: number;
  }
}

export function Row({
  boxs,

}: RowProps) {
  const [isOpenModalRow, setIsOpenModalRow] = useState<boolean>(false)
  const { image, handleAltBox: onAltBoxs, ajustImg } = useContext(ImgContext)

 


  const { cor, tier, id, order } = boxs

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.IMGS,
      drop: (item: { index: Number }) => ajustImg(Number(item.index), id),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),

      hover(item, monitor) {



      },
    })
  )


  function handleCloseModal() {
    setIsOpenModalRow(false)
  }

  return (
    <div className='row' >
      <div className='tier' style={{ background: `${cor}` }}><span>{tier}</span></div>
      <div className='imgs' ref={drop}>
        {image.filter(img => img.row === id).sort((a, b) => a.order - b.order).map(img => <Imagens key={img.id} data={img} />)}
      </div>
      <div className='config'>
        <button onClick={() => setIsOpenModalRow(true)}>
          <AiTwotoneSetting color="#FFF" />
        </button>
        <div>
          <button onClick={() => onAltBoxs(order, 'cima')}>
            <BsFillArrowUpSquareFill color="#FFF" />
          </button>
          <button onClick={() => onAltBoxs(order, 'baixo')}>
            <BsFillArrowDownSquareFill color="#FFF" />
          </button>
        </div>
      </div>

      <Modal
        isOpen={isOpenModalRow}
        onRequestClose={() => setIsOpenModalRow(false)}
        className='modal01'
        overlayClassName='modal-overlay'

      >
        <ModalRow
          onCloseModal={handleCloseModal}
          boxs={boxs}
        />
      </Modal>

    </div>
  )
}