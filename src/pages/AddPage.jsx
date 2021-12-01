import { Button, TextField } from "@mui/material";
import React, { useContext } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { adminContext } from "../context/AdminContext"
import { useNavigate } from "react-router";

const AddPage = () => {
    const schema = yup.object({
        name: yup
            .string()
            .required("Данное поле обязательно"),
        description: yup
            .string()
            .min(3, "Минимальное 3 символа")
            .max(1000, "Максимальное 1000 символов")
            .required("Данное поле обязательно"),
        image: yup
            .string()
            .min(10, "Минимальный 10 символ")
            .max(1000, "Максимальное 1000 символов")
            .required("Данное поле обязательно"),
        color: yup
            .string()
            .min(2, "Минимальное 2 символа")
            .max(30, "Максимальное 30 символов")
            .required("Данное поле обязательно"),
        brand: yup
            .string()
            .min(2, "Минимальное 2 символов")
            .max(1555, "Максимальное 1555 символов")
            .required("Данное поле обязательно"),
        price: yup
            .number()
            .min(3, "Минимальное 3 символа")
            .required("Данное поле обязательно"),

    });

    const { addGuitar } = useContext(adminContext)
    const navigate = useNavigate()
    const handleSubmit = (product) => {
        addGuitar(product)
        navigate("/admin")
    }
    return (
        <div className="add-page">
            <h2>Добавить продукт</h2>
            <Formik
                className='cards'
                validationSchema={schema}
                onSubmit={handleSubmit}
                initialValues={{
                    name: '',
                    description: '',
                    image: '',
                    color: '',
                    brand: '',
                    price: ''
                }}
            >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Название продукта"
                            type="text"
                            variant="standard"
                            name="name"
                            value={values.name}
                            error={!!errors.name && touched.name}
                            helperText={touched.name ? errors.name : ''}
                            onChange={handleChange}
                        />
                        <TextField

                            label="Описание продукта"
                            type="text"
                            variant="standard"
                            name="description"
                            value={values.description}
                            error={!!errors.description && touched.description}
                            helperText={touched.description ? errors.description : ''}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Фото продукта"
                            type="text"
                            variant="standard"
                            name="image"
                            value={values.image}
                            error={!!errors.image && touched.image}
                            helperText={touched.image ? errors.image : ''}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Цвет продукта"
                            type="text"
                            variant="standard"
                            name="color"
                            value={values.color}
                            error={!!errors.color && touched.color}
                            helperText={touched.color ? errors.color : ''}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Бренд продукта"
                            type="text"
                            variant="standard"
                            name="brand"
                            value={values.brand}
                            error={!!errors.brand && touched.brand}
                            helperText={touched.brand ? errors.brand : ''}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Цена продукта"
                            type="number"
                            variant="standard"
                            name="price"
                            value={values.price}
                            error={!!errors.price && touched.price}
                            helperText={touched.price ? errors.price : ''}
                            onChange={handleChange}
                        />
                        <Button
                            variant="contained"
                            color="success"
                            type="submit">
                            Добавить продукт
                        </Button>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default AddPage;