
import { Button } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BasicTable from '../component/BasicTable';
import { adminContext } from '../context/AdminContext';


const AdminPage = () => {
    const { clearState } = useContext(adminContext)
    useEffect(() => {
        clearState()
    }, [])
    return (
        <div>
            <h2>Admin Page</h2>
            <div>
                <Link to="/admin/add">
                    <Button variant="contained" color="success">Add Guitar</Button>
                </Link>
                <div>
                    <BasicTable />
                </div>
            </div>
        </div>
    );
};

export default AdminPage;