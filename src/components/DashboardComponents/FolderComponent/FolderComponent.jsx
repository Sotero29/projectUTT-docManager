import { shallowEqual, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ShowItems from '../ShowItems/ShowItems'

const FolderComponent = () => {
  const { folderId } = useParams()

  const { currentFolderData, childFolders, childFiles } = useSelector(
    (state) => ({
      currentFolderData: state.filefolders.userFolders.find(
        (folder) => folder.docId === folderId
      )?.data,
      childFolders: state.filefolders.userFolders.filter(
        (folder) => folder.data.parent === folderId
      ),
      childFiles: state.filefolders.userFiles.filter(
        (file) => file.data.parent === folderId
      )
    }),
    shallowEqual
  )

  const createdFiles =
    childFiles && childFiles.filter((file) => file.data.url === null)
  const uploadedFiles =
    childFiles && childFiles.filter((file) => file)

  return (
    <div>
      {childFolders.length > 0 || childFiles.length > 0 ? (
        <>
          {childFolders.length > 0 && (
            <ShowItems
              title={'Carpetas creadas'}
              type={'folder'}
              items={childFolders}
            />
          )}
          {createdFiles && createdFiles.length > 0 && (
            <ShowItems
              title={'Archivos creadas'}
              type={'file'}
              items={createdFiles}
            />
          )}
          {uploadedFiles &&  uploadedFiles.length > 0 && (
            <ShowItems
              title={'Archivos actualizados'}
              type={'file'}
              items={uploadedFiles}
            />
          )}
        </>
      ) : (
        <p className='text-center my-5'>Carpeta vacía</p>
      )}
    </div>
  )
}

export default FolderComponent