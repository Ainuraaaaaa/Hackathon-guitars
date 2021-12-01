import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { clientContext } from '../context/ClientContext';
import FavoriteIcon from '@mui/icons-material/Favorite';


export default function MediaCard(props) {
    const { addAndDeleteProductInFavorites, checkGuitarInCart, checkFavoriteInFavorites, addAndDeleteGuitarInCart } = React.useContext(clientContext)

    return (
        <Card className='cards' Card sx={{ maxWidth: 300, minWidth: 300, margin: "20px", color: "black" }}>
            <CardMedia
                component="img"
                height="140"

                style={{ objectFit: "contain" }}
                image={props.guitar.image}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.guitar.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.guitar.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => addAndDeleteGuitarInCart(props.guitar)}>
                    <ShoppingCartIcon color={checkGuitarInCart(props.guitar.id) ? "error" : "success"} />
                </Button>
                <Button size="small" onClick={() => addAndDeleteProductInFavorites(props.guitar)}>
                    <FavoriteIcon color={checkFavoriteInFavorites(props.guitar.id) ? "error" : "success"} />
                </Button>
                <Link to={`/guitar/${props.guitar.id}`}>
                    <Button size="small" variant="contained" color="success">Подробнее</Button>
                </Link>

            </CardActions>
        </Card>
    );
}
