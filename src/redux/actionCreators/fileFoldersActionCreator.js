import * as types from '../actionsTypes/fileFoldersActionTypes'
import fire from '../../config/firebase'
//actions

const addFolder = (payload) => ({
  type: types.CREATE_FOLDER,
  payload
})

const addFolders = (payload) => ({
  type: types.ADD_FOLDERS,
  payload,
})

const setLoading = (payload) => ({
  type: types.SET_LOADING,
  payload,
})

const setChangeFolder = (payload) => ({
  type: types.CHANGE_FOLDER,
  payload,
})

//files

const addFiles = (payload) => ({
  type: types.ADD_FILES,
  payload,
})

const addFile = (payload) => ({
  type: types.CREATE_FILE,
  payload,
})

// action creators

export const createFolder = (data) => (dispatch) => {
  fire
    .firestore()
    .collection('folders')
    .add(data)
    .then(async (folder) => {
      const folderData = await (await folder.get()).data()
      const folderId = folder.id
      dispatch(addFolder({ data: folderData, docId: folderId }))
      alert('Se creo la carpeta correctamente')
    })
}

export const getFolders = (userId) => (dispatch) => {
  dispatch(setLoading(true))
  fire
    .firestore()
    .collection('folders')
    .where('userId', '==', userId)
    .get()
    .then(async (folders) => {
      const foldersData = await folders.docs.map((folder) => ({
        data: folder.data(),
        docId: folder.id,
      }))
      dispatch(setLoading(false))
      dispatch(addFolders(foldersData))
    })
}

export const changeFolder = (folderId) => (dispatch) => {
  dispatch(setChangeFolder(folderId))
}

//files

export const getFiles = (userId) => (dispatch) => {
  fire
    .firestore()
    .collection('files')
    .where('userId', '==', userId)
    .get()
    .then(async (files) => {
      const filesData = await files.docs.map((file) => ({
        data: file.data(),
        docId: file.id,
      }))
      dispatch(addFiles(filesData))
    })
}

export const createFile = (data, setSuccess) => (dispatch) => {
  fire
    .firestore()
    .collection('files')
    .add(data)
    .then(async (file) => {
      const fileData = await (await file.get()).data()
      const fileId = file.id
      alert('Archivo creado correctamente ')
      dispatch(addFile({ data: fileData, docId: fileId }))
      setSuccess(true)
    })
    .catch(() => {
      setSuccess(false)
    })
}