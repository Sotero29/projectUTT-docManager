import * as types from '../actionsTypes/fileFoldersActionTypes'
import fire from '../../config/firebase'

//action

const addFolder = (payload) => ({
  type: types.CREATE_FOLDER,
  payload
})

//acction creaotr

export const createFolder = (data) => (dispatch) => {
  fire
    .firestore()
    .collection('folders')
    .add(data)
    .then(async(folder) => {
      const folderData = await (await folder.get()).data()
      dispatch(addFolder(folderData))
      alert('Se creo la carpeta correctamente')
    })
}