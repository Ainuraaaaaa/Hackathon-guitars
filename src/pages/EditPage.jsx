import React, { useContext, useEffect } from 'react';
import * as yup from 'yup'
import { Formik } from 'formik'
import { Button, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { adminContext } from '../context/AdminContext';


const EditPage = () => {
    const schema = yup.object({
        name: yup
            .string()
            .min(3)
            .max(30)
            .required("обязательно для заполнения"),
        description: yup
            .string()
            .min(10)
            .max(1000)
            .required("обязательно для заполнения"),

        image: yup
            .string()
            .required("обязательно для заполнения"),

        price: yup
            .number()
            .min(3)
            .required("обязательно для заполнения"),
        color: yup
            .string()
            .required("обязательно для заполнения"),

        brand: yup
            .string()
            .required("обязательно для заполнения"),

    })
    const params = useParams();
    const { getGuitarToEdit, guitarToEdit, saveEditedGuitar } = useContext(adminContext);
    useEffect(() => {
        getGuitarToEdit(params.id);
    }, [])
    const navigate = useNavigate();
    return (
        <div className="edit-page">
            <h2>Editing Guitar</h2>
            {
                guitarToEdit ? (
                    <Formik
                        validationSchema={schema}
                        onSubmit={(editedGuitar) => {
                            saveEditedGuitar(editedGuitar)
                            navigate("/admin")
                        }}
                        initialValues={guitarToEdit}
                    >
                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                            <form onSubmit={handleSubmit}>
                                < TextField
                                    label="guitar name"
                                    type="text"
                                    variant="standard"
                                    name="name"
                                    value={values.name}
                                    error={!!errors.name && touched.name}
                                    helperText={touched.name ? errors.name : ""}
                                    onChange={handleChange}


                                />
                                <TextField
                                    label="guitar details"
                                    type="text"
                                    variant="standard"
                                    name="description"
                                    value={values.description}
                                    error={!!errors.description && touched.description}
                                    helperText={touched.description ? errors.description : ""}
                                    onChange={handleChange}


                                />
                                <TextField
                                    label="guitar image"
                                    type="text"
                                    variant="standard"
                                    name="image"
                                    value={values.image}
                                    error={!!errors.image && touched.image}
                                    helperText={touched.image ? errors.image : ""}
                                    onChange={handleChange}


                                />
                                <TextField
                                    label="guitar price"
                                    type="number"
                                    variant="standard"
                                    name="price"
                                    value={values.price}
                                    error={!!errors.price && touched.price}
                                    helperText={touched.price ? errors.price : ""}
                                    onChange={handleChange}


                                />
                                <TextField
                                    label="guitar color"
                                    type="text"
                                    variant="standard"
                                    name="color"
                                    value={values.color}
                                    error={!!errors.color && touched.color}
                                    helperText={touched.color ? errors.color : ""}
                                    onChange={handleChange}


                                />
                                <TextField
                                    label="guitar brand"
                                    type="text"
                                    variant="standard"
                                    name="brand"
                                    value={values.brand}
                                    error={!!errors.brand && touched.brand}
                                    helperText={touched.brand ? errors.brand : ""}
                                    onChange={handleChange}


                                />

                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit">Save Changes</Button>
                            </form>
                        )}

                    </Formik>
                ) : (
                    <h2>Loading</h2>
                )
            }

        </div>
    );
};

export default EditPage;