import React, { Fragment } from "react";
import "./Footer.css";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <>
            <div className="mainFtr ">
                <div className="coMainFtr">
                    <div className="bireki col-3">
                        <h5>Покупателям</h5>
                        <Link to="/order">
                            <a href="#">Доставка</a>
                        </Link>
                        <Link to="/cart">
                            <a href="#">Оплата</a>
                        </Link>
                        <a href="#">Возврат товара</a>
                        <a href="#">Личный кабинет</a>
                    </div>
                    <div className="bireki col-3">
                        <h5>Информация</h5>
                        <a href="#">О нас</a>
                        <a href="#">FAQ</a>
                        <a href="#">Блог</a>
                        <a href="#">Контакты</a>
                        <a href="#">Обратная связь</a>
                    </div>
                    <div className="col-3">
                        <h5>Мы на связи</h5>
                        <span className="number">+996704200830</span>


                    </div>
                    <div className="col-3">
                        <h5>Подписка на новости</h5>
                        <span className="fourth">
                            Получите доступ к эксклюзивным скидкам
                        </span>
                        <Form
                            onSubmit={(e) => {
                                e.preventDefault();
                                console.log("worked");
                            }}
                        >
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                        </Form>{" "}
                    </div>
                </div>


            </div>
        </>
    );
};

export default React.memo(Footer);