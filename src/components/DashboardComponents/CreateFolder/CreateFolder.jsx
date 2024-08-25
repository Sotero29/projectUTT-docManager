import { useState } from 'react'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'

import { createFolder } from '../../../redux/actionCreators/fileFoldersActionCreator'

const CreateFolder = ({ setIsCreateFolderModalOpen }) => {
  const [folderName, setFolderName] = useState('')

  const { userFolders, user, currentFolder, currentFolderData } = useSelector(
    (state) => ({
      userFolders: state.filefolders.userFolders,
      user: state.auth.user,
      currentFolder: state.filefolders.currentFolder,
      currentFolderData: state.filefolders.userFolders.find(
        (folder) => folder.docId === state.filefolders.currentFolder
      ),
    }),
    shallowEqual
  )
  const dispatch = useDispatch()

  const checkFolderAlreadyPresent = (name) => {
    const folderPresent = userFolders
      .filter((folder) => folder.data.parent === currentFolder)
      .find((folder) => folder.data.name === name)
    if (folderPresent) {
      return true
    } else {
      return false
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (folderName) {
      if (folderName.length > 3) {
        if (!checkFolderAlreadyPresent(folderName)) {
          const data = {
            createdAt: new Date(),
            name: folderName,
            userId: user.uid,
            createdBy: user.displayName,
            path:
              currentFolder === 'root'
                ? []
                : [...currentFolderData?.data.path, currentFolder],
            parent: currentFolder,
            lastAccessed: null,
            updatedAt: new Date()
          }
          dispatch(createFolder(data))
        } else {
          alert('Esta carpeta ya existe ')
        }
      } else {
        alert('El nombre de la carpeta debe de tener minimo 3 caracteres')
      }
    } else {
      alert('El nombre de la carpeta no puede estar vacia')
    }
  }

  return (
    <div
      className='col-md-12 position-fixed top-0 left-0 w-100 h-100'
      style={{ background: 'rgba(0, 0, 0, 0.4)', zIndex: 9999 }}
    >
      <div className='row align-items-center justify-content-center'>
        <div className='col-md-4 mt-5 bg-white rounded p-4'>
          <div className='d-flex justify-content-between'>
            <h4>Crear carpeta</h4>
            <button
              className='btn'
              onClick={() => setIsCreateFolderModalOpen(false)}
            >
              <FontAwesomeIcon
                icon={faTimes}
                className='text-black'
                size='sm'
              />
            </button>
          </div>
          <hr />
          <div className='d-flex flex-column align-items-center'>
            <form className='mt-3 w-100' onSubmit={handleSubmit}>
              <div className='form-group'>
                <input
                  type="text"
                  className='form-control'
                  id='folderName'
                  placeholder='Nombre de la carpeta'
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                />
              </div>
              <button
                type='submit'
                className='btn btn-primary mt-5 form-control'
              >
                Crear carpeta
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateFolder