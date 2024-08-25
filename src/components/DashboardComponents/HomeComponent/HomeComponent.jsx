import { shallowEqual, useSelector } from 'react-redux'
import ShowItems from '../ShowItems/ShowItems'

const HomeComponent = () => {
  const files = [
    { data: { name: 'New file' } },
    { data: { name: 'New file 2' } }
  ]

  const { isLoading, userFolders } = useSelector(
    (state) => ({
      isLoading: state.filefolders.isLoading,
      userFolders: state.filefolders.userFolders.filter(
        (folder) => folder.data.parent === 'root'
      )
    }),
    shallowEqual
  )

  return (
    <div className='col-md-12 w-100'>
      {isLoading ? (
        <h1 className='display-1 my-5 text-center'>Cargando ...</h1>
      ) : (
        <>
          <ShowItems 
            title={'Carpetas creadas'}
            type={'folder'}
            items={userFolders} 
          />
          <ShowItems title={'Documentos creados'} type={'file'} items={files} />
        </>
      )}
    </div>
  )
}

export default HomeComponent