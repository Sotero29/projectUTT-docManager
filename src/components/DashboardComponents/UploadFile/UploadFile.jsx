import { useEffect, useState } from 'react'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { uploadFile } from '../../../redux/actionCreators/fileFoldersActionCreator'

//import { createFile } from '../../../redux/actionCreators/fileFoldersActionCreator'

const UploadFile = ({ setIsFileUploadModalOpen }) => {
  const [file, setFile] = useState(null)
  const [success, setSuccess] = useState(false)

  const { userFiles, user, currentFolder, currentFolderData } = useSelector(
    (state) => ({
      userFiles: state.filefolders.userFiles,
      user: state.auth.user,
      currentFolder: state.filefolders.currentFolder,
      currentFolderData: state.filefolders.userFolders.find(
        (folder) => folder.docId === state.filefolders.currentFolder
      ),
    }),
    shallowEqual
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (success) {
      setFile(''),
      setSuccess(false)
      setIsFileUploadModalOpen(false)
    }
  }, [success])

  const checkFileAlreadyPresent = (name) => {
    const filePresent = userFiles
      .filter((file) => file.data.parent === currentFolder)
      .find((fldr) => fldr.data.name === name)
    if (filePresent) {
      return true
    } else {
      return false
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (file) {
        if (!checkFileAlreadyPresent(file.name)) {
          const data = {
            createdAt: new Date(),
            name: file.name,
            userId: user.uid,
            createdBy: user.displayName,
            path:
              currentFolder === 'root'
                ? []
                : [...currentFolderData?.data.path, currentFolder],
            parent: currentFolder,
            lastAccessed: null,
            updatedAt: new Date(),
            extension: file.name.split('.')[1],
            data: null,
            url: '',
          }
          dispatch(uploadFile(file, data, setSuccess))
        } else {
          alert('Este documento ya existe')
        }
    } else {
      alert('El nombre del documento no puede estar vacia')
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
            <h4>Actualizar archivo</h4>
            <button
              className='btn'
              onClick={() => setIsFileUploadModalOpen(false)}
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
                  type="file"
                  className='form-control'
                  id='file'

                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <button
                type='submit'
                className='btn btn-primary mt-5 form-control'
              >
                Actualizar archivo
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadFile