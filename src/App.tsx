import { useContext, useEffect, useState } from 'react'
import './styles/home.scss'
import { ChangeEvent } from 'react'

//components
import { Imagens } from './components/Imagens'
import { Row } from './components/Row/Index'
import { ImgContext } from './context/imgContext'


function App() {

  const { image, boxs, attImage } = useContext(ImgContext)

  function handleImagem(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (files && files.length > 0) {
      const totalImagens = image.length
      const imgArray = Array.from(files).map((file, index) => ({
        url: URL.createObjectURL(file),
        id: totalImagens + index,
        alt: 'komi-san',
        row: 999,
        order: 0
      }))
      console.log('aqui1')
      attImage(imgArray, 'prev')

    }
  }

  return (
    <>
      <div className='container'>
        <div className='squared'>
          {boxs.sort((a, b) => a.order - b.order).map(box => (
            <Row key={box.id} boxs={box} />
          ))}
        </div>
        <input type="file" multiple onChange={handleImagem} />
        <div className='Imagens' id='999'>
          {image.filter(img => img.row === 999).map(img => <Imagens data={img} key={img.id} />)}
        </div>
      </div>
    </>

  )
}

export default App
