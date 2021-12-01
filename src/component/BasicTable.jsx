import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Button, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { adminContext } from '../context/AdminContext';



export default function BasicTable() {
    const { getGuitars, guitars, deleteGuitar } = React.useContext(adminContext);
    React.useEffect(() => {
        getGuitars()
    }, [])

    return (
        <>


            {
                guitars ? (
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Detail</TableCell>
                                    <TableCell align="right">Image</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Color</TableCell>
                                    <TableCell align="right">Brand</TableCell>
                                    <TableCell align="right">#</TableCell>
                                    <TableCell align="right">#</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {guitars.map((guitar) => (
                                    <TableRow
                                        key={guitar.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="guitar">
                                            {guitar.name}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Tooltip title={guitar.description}>
                                                <p>{guitar.description.slice(0, 20)}...</p>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="right">
                                            <img width="50" src={guitar.image} alt="guitar" />
                                        </TableCell>
                                        <TableCell align="right">{guitar.price}</TableCell>
                                        <TableCell align="right">{guitar.color}</TableCell>
                                        <TableCell align="right">{guitar.brand}</TableCell>
                                        <TableCell align="right">
                                            <Link to={`/admin/edit/${guitar.id}`}>

                                                <Button color="primary" variant="contained">
                                                    Edit
                                                </Button>
                                            </Link>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button variant="contained" color="warning" onClick={() => deleteGuitar(guitar.id)}>Delete</Button>
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                ) : (
                    <h2>Loading</h2>
                )
            }


        </>
    );
}
