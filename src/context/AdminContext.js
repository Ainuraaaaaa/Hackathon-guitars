import axios from 'axios';
import React, { useReducer } from 'react';
import { API } from '../helpers/const';

export const adminContext = React.createContext()

const INIT_STATE = {
    guitars: null,
    guitarToEdit: null
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_GUITARS":
            return { ...state, guitars: action.payload };
        case "GET_GUITAR_TO_EDIT":
            return { ...state, guitarToEdit: action.payload };
        case "CLEAR_STATE":
            return { ...state, guitarToEdit: action.payload }
        default:
            return state
    }
}

const AdminContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    // ! CREATE
    const addGuitar = async (guitar) => {
        console.log(guitar);
        try {
            const response = await axios.post(API, guitar)
            console.log(response);
            getGuitars();
        } catch (e) {
            console.log(e)
        }
    }



    // ! READ

    const getGuitars = async () => {
        try {
            const response = await axios(API);
            let action = {
                type: "GET_GUITARS",
                payload: response.data,

            };
            dispatch(action);
            console.log(response);
        } catch (e) {
            console.log(e)
        }
    }

    // ! UPDATE
    // данная функция нужна чтобы стянуть данные. Данные нужны для отображения в инпутах
    const getGuitarToEdit = async (id) => {
        try {
            const response = await axios(`${API}/${id}`)
            let action = {
                type: "GET_GUITAR_TO_EDIT",
                payload: response.data,
            }
            dispatch(action);
        } catch (e) {
            console.log(e)
        }
    }

    const saveEditedGuitar = async (editedGuitar) => {
        try {
            const response = await axios.patch(`${API}/${editedGuitar.id}`, editedGuitar);
            getGuitars();
            clearState();
        } catch (e) {
            console.log(e)
        }
    }

    const clearState = () => {
        let action = {
            type: "CLEAR_STATE",
            payload: null
        }
        dispatch(action)
    }


    // DELETE
    const deleteGuitar = async (id) => {
        try {
            const response = await axios.delete(`${API}/${id}`);
            getGuitars()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <adminContext.Provider value={{
            addGuitar: addGuitar,
            getGuitars: getGuitars,
            getGuitarToEdit: getGuitarToEdit,
            saveEditedGuitar: saveEditedGuitar,
            clearState: clearState,
            deleteGuitar: deleteGuitar,
            guitars: state.guitars,
            guitarToEdit: state.guitarToEdit
        }}>
            {children}
        </adminContext.Provider>
    );
};

export default AdminContextProvider;