import ShowItems from '../ShowItems/ShowItems'

const HomeComponent = () => {
  const folders = ['Nueva carpeta', 'Nueva carpeta 2']
  const files = ['Nuevo documento', 'Nuevo documento 2']

  return (
    <div className='col-md-12 w-100'>
      <ShowItems title={'Carpetas creados'} items={folders} />
      <ShowItems title={'Documentos creados'} items={files} />
    </div>
  )
}

export default HomeComponent