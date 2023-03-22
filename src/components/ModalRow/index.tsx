import './styles.scss'

import { useContext, useState } from 'react';
import { IoMdClose } from 'react-icons/io'
import { ImgContext } from '../../context/imgContext';

interface ModalRowProps {
  boxs: {
    cor: string;
    tier: string;
    id: number;
    order: number;
  };
  onCloseModal: () => void;

 
}


export function ModalRow({ boxs, onCloseModal  }: ModalRowProps) {
  const { handlTierColor: onTierColor, handlDelRow:onDelRow } = useContext(ImgContext)

  const [color, setColor] = useState(boxs.cor)
  const [tier, setTier] = useState(boxs.tier)

  function enviar() {
    if (tier.trim() === '') return
    onTierColor(tier, color, boxs.id)
    onCloseModal()
  }

  const colors = [
    { cor: 'red' },
    { cor: 'blue' },
    { cor: 'green' },
    { cor: 'yellow' },
    { cor: 'gray' },
    { cor: 'blueviolet' },
  ]




  return (
    <div className="ContainerModal">
      <button className='btnClose' onClick={onCloseModal}>
        <IoMdClose />
      </button>
      <header>
        <h2>Escolha a Cor de fundo da box:</h2>
        <div className='areaColor'>
          {colors.map(cor => (
            <div key={cor.cor} onClick={() => setColor(cor.cor)} className={color === cor.cor ? 'active' : ''}
              style={{ backgroundColor: cor.cor }}
            >
            </div>
          ))}
        </div>
      </header >
      <main>
        <h2>Edit Label Text Below:</h2>
        <textarea rows={2} onChange={(text) => setTier(text.target.value)} defaultValue={boxs.tier} ></textarea>
        <div>
          <button onClick={() => onDelRow(boxs.id)}> Deletar Linha</button>
          <button> Tirar todas imagens da linha</button>
          <button> Adicionar Linha Acima</button>
          <button> Adicionar Linha Abaixo</button>
        </div>


        <button
          className='save'
          onClick={enviar}
        >
          Salvar alterações
        </button>

      </main>

    </div >
  )
}