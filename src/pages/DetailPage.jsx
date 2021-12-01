import { phoneDetails, ShoppingCart } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import Comments from '../component/Comments';
import { clientContext } from '../context/ClientContext';


const DetailPage = () => {
    const { getDetails, guitarDetails } = useContext(clientContext)
    const params = useParams()
    useEffect(() => {
        getDetails(params.id)
    }, [])
    console.log(guitarDetails)
    return (
        <div>
            {guitarDetails ? (
                <div className="detail-page">

                    <div className="detail-image">
                        <img src={guitarDetails.image} alt="" />
                    </div>
                    <div>
                        <h2>{guitarDetails.name}</h2>
                        <p>{guitarDetails.description}</p>
                        <Button variant="contained" color="primary">
                            Add to Cart
                        </Button>
                        <div>
                            <h4>Label:</h4>
                            <ul className="character">
                                <li>
                                    <strong>price:</strong>
                                    <span>{guitarDetails.price}</span>
                                </li>
                                <li>
                                    <strong>color:</strong>
                                    <span>{guitarDetails.color}</span>
                                </li>
                                <li>
                                    <strong>brand:</strong>
                                    <span>{guitarDetails.brand}</span>
                                </li>


                            </ul>
                        </div>
                    </div>
                    <Comments productId={getDetails.id} />

                </div>
            ) : (
                <h2>Loading</h2>
            )}
        </div>

    );
};

export default DetailPage;