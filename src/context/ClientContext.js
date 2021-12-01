import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { calcSubPrice, calcTotalPrice } from '../helpers/calcPrice';
import { API } from '../helpers/const'

export const clientContext = React.createContext()

const INIT_STATE = {
    guitars: null,
    guitarDetails: null,
    guitarsCountInCart: JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")).guitars.length : 0,
    cart: null,
    productsCountInFavorites: JSON.parse(localStorage.getItem('favorite')) ? JSON.parse(localStorage.getItem('favorite')).favorites.length : 0,
    favorites: null,
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_GUITARS":
            return { ...state, guitars: action.payload }
        case "GET_DETAILS":
            return { ...state, guitarDetails: action.payload }
        case "ADD_AND_DELETE_GUITAR_IN_CART":
            return { ...state, guitarsCountInCart: action.payload }
        case "GET_CART":
            return { ...state, cart: action.payload }
        case "GET_FAVORITES":
            return { ...state, favorites: action.payload };
        case "ADD_AND_DELETE_FAVORITES":
            return { ...state, productsCountInFavorites: action.payload }
        default:

            return state;
    }
}

const ClientContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)
    const getGuitars = async () => {
        try {
            let filter = window.location.search

            const response = await axios(`${API}/${filter}`)
            let action = {
                type: "GET_GUITARS",
                payload: response.data,
            }
            dispatch(action)
            resetCurrentPage()
        } catch (e) {
            console.log(e)
        }
    }

    // ! для страницы деталей

    const getDetails = async (id) => {
        try {
            const response = await axios(`${API}/${id}`)
            let action = {
                type: "GET_DETAILS",
                payload: response.data,
            }
            dispatch(action)


        } catch (e) {
            console.log(e)
        }
    }

    // ! ПАГИНАЦИЯ
    console.log(state.guitars)
    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(6)

    useEffect(() => {
        if (state.guitars) {
            const data = state.guitars
            setPosts(data)
        }
    }, [state.guitars])
    const numberOfLastPost = currentPage * postsPerPage;
    const numberOfFirstPost = numberOfLastPost - postsPerPage;
    const currentPosts = posts.slice(numberOfFirstPost, numberOfLastPost)
    const totalPosts = posts.length;


    const handlePage = (newPage) => {
        setCurrentPage(newPage);
    }

    function resetCurrentPage() {
        setCurrentPage(1)
    }

    // Корзина

    const addAndDeleteGuitarInCart = (guitar) => {
        let cart = JSON.parse(localStorage.getItem("cart"))
        if (!cart) {
            cart = {
                guitars: [],
                totalPrice: 0,
            }
        }
        let product = {
            guitar: guitar,
            count: 1,
            subPrice: 0
        }
        product.subPrice = calcSubPrice(product)
        let checkArr = cart.guitars.filter(item => {
            return item.guitar.id === guitar.id;
        })
        if (checkArr.length === 0) {
            cart.guitars.push(product)

        } else {
            cart.guitars = cart.guitars.filter(item => {
                return item.guitar.id !== guitar.id
            })
        }
        cart.totalPrice = calcTotalPrice(cart)
        localStorage.setItem("cart", JSON.stringify(cart))
        let action = {
            type: "ADD_AND_DELETE_GUITAR_IN_CART",
            payload: cart.guitars.length,
        }
        dispatch(action)
    }

    const checkGuitarInCart = (id) => {
        let cart = JSON.parse(localStorage.getItem("cart"))
        if (!cart) {
            cart = {
                guitars: [],
                totalPrice: 0
            }
        }
        let checkArr = cart.guitars.filter(item => {
            return item.guitar.id === id
        })
        if (checkArr.length === 0) {
            return false
        } else {
            return true
        }
    }

    const getCart = () => {
        let cart = JSON.parse(localStorage.getItem("cart"))
        if (!cart) {
            cart = {
                guitars: [],
                totalPrice: 0
            }
        }
        let action = {
            type: "GET_CART",
            payload: cart,
        }
        dispatch(action)
    }

    const changeCountGuitar = (count, id) => {
        if (count < 1) {
            return;
        }
        let cart = JSON.parse(localStorage.getItem("cart"))
        cart.guitars = cart.guitars.map(item => {
            if (item.guitar.id === id) {
                item.count = count
                item.subPrice = calcSubPrice(item)
            }
            return item;
        })
        cart.totalPrice = calcTotalPrice(cart)
        localStorage.setItem("cart", JSON.stringify(cart))
        getCart()
    }

    // ! favorites 
    const addAndDeleteProductInFavorites = (item) => {
        let favorite = JSON.parse(localStorage.getItem("favorite"));
        if (!favorite) {
            favorite = {
                favorites: [],
            };
        }
        let favProduct = {
            item: item,
        };
        let checkArr = favorite.favorites.filter((elem) => {
            return elem.item.id === item.id;
        });
        if (checkArr.length === 0) {
            favorite.favorites.push(favProduct);
        } else {
            favorite.favorites = favorite.favorites.filter((elem) => {
                return elem.item.id !== item.id;
            });
        }
        localStorage.setItem("favorite", JSON.stringify(favorite));
        dispatch({
            type: "ADD_AND_DELETE_FAVORITES",
            payload: favorite.favorites.length,
        });
        getFavorite()
    };
    const checkFavoriteInFavorites = (id) => {
        let favorite = JSON.parse(localStorage.getItem("favorite"));
        if (!favorite) {
            favorite = {
                favorites: [],
            };
        }
        let checkArr = favorite.favorites.filter((elem) => {
            return elem.item.id === id;
        });
        if (checkArr.length === 0) {
            return false;
        } else {
            return true;
        }
    };



    const getFavorite = () => {
        let favorite = JSON.parse(localStorage.getItem("favorite"));
        dispatch({
            type: "GET_FAVORITES",
            payload: favorite,
        });
    };

    return (
        <clientContext.Provider value={{
            getGuitars: getGuitars,
            getDetails: getDetails,
            handlePage: handlePage,
            addAndDeleteGuitarInCart: addAndDeleteGuitarInCart,
            checkGuitarInCart: checkGuitarInCart,
            getCart: getCart,
            changeCountGuitar: changeCountGuitar,
            getFavorite: getFavorite,
            checkFavoriteInFavorites: checkFavoriteInFavorites,
            addAndDeleteProductInFavorites: addAndDeleteProductInFavorites,
            // addAndDeleteProductInCart: addAndDeleteProductInCart,
            // checkProductInCart: checkProductInCart,
            favorites: state.favorites,
            productsCountInFavorites: state.productsCountInFavorites,
            guitars: state.guitars,
            guitarDetails: state.guitarDetails,
            totalPosts: totalPosts,
            currentPosts: currentPosts,
            postsPerPage: postsPerPage,
            currentPage: currentPage,
            guitarsCountInCart: state.guitarsCountInCart,

            cart: state.cart,

        }}>
            {props.children}
        </clientContext.Provider>
    );
};

export default ClientContextProvider;