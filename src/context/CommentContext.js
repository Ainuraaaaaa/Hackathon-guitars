import axios from 'axios';
import React, { createContext, useReducer } from 'react';

import { COMMENT_API } from '../helpers/const';


export const commentContext = createContext()

const INIT_STATE = {
    allComments: null
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_COMMENT":
            return { ...state, allComments: action.payload }
        default:
            return state
    }
}

const CommentContextProvider = (props) => {

    const [state, dispatch] = useReducer(reducer, INIT_STATE)


    const addComment = async (newComment) => {
        try {
            const response = await axios.post(COMMENT_API, newComment)
            getComment()
        } catch (e) {
            console.log(e);
        }
    }

    const getComment = async () => {
        try {
            let response = await axios(COMMENT_API)
            let action = {
                type: "GET_COMMENT",
                payload: response.data
            }
            dispatch(action)
        } catch (e) {
            console.log(e);
        }
    }

    const deleteComment = async (id) => {
        try {
            let response = await axios.delete(`${COMMENT_API}/${id}`)
            getComment();
        } catch (e) {
            console.log();
        }
    }


    return (
        <commentContext.Provider
            value={{
                addComment: addComment,
                getComment: getComment,
                deleteComment: deleteComment,
                allComments: state.allComments
            }}>
            {props.children}
        </commentContext.Provider>
    );
};

export default CommentContextProvider;