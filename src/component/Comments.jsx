
import React, { useContext, useEffect } from 'react';
// import { commentContext } from '../contexts/CommentContext';
import * as yup from "yup"
import { Formik } from "formik"
import { TextField, Button } from '@mui/material';
import { commentContext } from '../context/CommentContext';

const Comments = (props) => {
    const schema = yup.object({
        commentator: yup
            .string()
            .min(2, "Минимальное количество символов 3")
            .max(30, "Максимальное количесиво символов 30")
            .required("Поле обязательна для заполнение"),
        comment: yup
            .string()
            .min(1, "Минимальное количество символов 3")
            .max(200, "Максимальное количесиво символов 30")
            .required("Поле обязательна для заполнение"),
    });

    const { addComment, allComments, getComment, deleteComment } = useContext(commentContext);

    useEffect(() => {
        getComment();
    }, []);
    console.log(allComments);
    const commentId = props.productId;

    const handleSubmit = (newComment) => {
        let newobj = {
            ...newComment,
            productId: commentId,
        };
        addComment(newobj);
    };

    return (
        <div className="comments">
            <Formik
                validationSchema={schema}
                onSubmit={handleSubmit}
                initialValues={{
                    comment: "",
                    commentator: "",
                }}
            >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                    <div>
                        <form className="new-comment" onSubmit={handleSubmit}>
                            <TextField
                                style={{ width: "15%", backgroundColor: 'lightyellow' }}
                                id="standard-basic"
                                label="Добавьте имя"
                                variant="outlined"
                                name="commentator"
                                value={values.commentator}
                                error={!!errors.commentator && touched.commentator}
                                helperText={touched.commentator ? errors.commentator : ""}
                                onChange={handleChange}
                            />
                            <TextField
                                style={{ width: "15%", backgroundColor: 'lightyellow' }}
                                id="standard-basic"
                                label="Добавить комментарии"
                                variant="outlined"
                                name="comment"
                                value={values.comment}
                                error={!!errors.comment && touched.comment}
                                helperText={touched.comment ? errors.comment : ""}
                                onChange={handleChange}
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                style={{ marginTop: "10px", backgroundColor: "darkblue" }}
                            >
                                Добавить
                            </Button>
                        </form>
                    </div>
                )}
            </Formik>

            <h2>Отзывы:</h2>
            {allComments ? (
                allComments.map((item) =>
                    item.productId === commentId ? (
                        <div className="comment">
                            <div className="comment-container">
                                <div className="commentator">{item.commentator}</div>
                                <div className="commentt">{item.comment}</div>
                                <Button onClick={() => deleteComment(item.id)}>Delete</Button>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )
                )
            ) : (
                <h2>Нет отзывов</h2>
            )}
        </div>
    );
};

export default Comments;