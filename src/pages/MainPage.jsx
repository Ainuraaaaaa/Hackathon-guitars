import React, { useContext, useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


import { useNavigate } from 'react-router-dom';

import MediaCard from '../component/MediaCard';
import Pagination from '../component/Pagination';
import { clientContext } from '../context/ClientContext';
import MyCarousel from '../component/MyCarousel';

const MainPage = () => {
    const { getGuitars, guitars, currentPosts } = useContext(clientContext);
    const navigate = useNavigate()
    const [nameValue, setNameValue] = useState("")

    let object = new URLSearchParams(window.location.search)
    function filterGuitars(key, value) {
        object.set(key, value)
        let newUrl = `${window.location.pathname}?${object.toString()}`
        navigate(newUrl)
        getGuitars()
        setNameValue(value)
    }

    useEffect(() => {
        setNameValue(object.get("brand"))
    }, [object])


    useEffect(() => {
        getGuitars()
    }, [])
    console.log(currentPosts)
    return (
        <>
            <MyCarousel />
            <div className="main-page">
                <div className="sidebar">
                    <FormControl component="fieldset"
                    >

                        <RadioGroup
                            style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', width: '1440px', }}
                            aria-label="gender"
                            value={nameValue}
                            name="radio-buttons-group"
                            onChange={(e) => filterGuitars("name", e.target.value)}
                        >
                            <FormControlLabel value="Martinez" control={<Radio />} label="Martinez" />
                            <FormControlLabel value="Crafter" control={<Radio />} label="Crafter" />
                            <FormControlLabel value="Ibanez" control={<Radio />} label="Ibanez" />
                            <FormControlLabel value="Yamaha" control={<Radio />} label="Yamaha" />

                            <FormControlLabel value="Gibson" control={<Radio />} label="Gibson" />
                            <FormControlLabel value="Fender" control={<Radio />} label="Fender" />
                            <FormControlLabel value="Godin" control={<Radio />} label="Godin" />
                            <FormControlLabel value="Takamine" control={<Radio />} label="Takamine" />
                            <FormControlLabel value="Epiphone" control={<Radio />} label="Epiphone" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div></div>
                {
                    guitars ? (

                        <div className="guitars">
                            {
                                currentPosts.map((guitar) => (
                                    <MediaCard guitar={guitar} key={guitar.id} />
                                ))
                            }

                        </div>


                    ) : (
                        <h2>Loading</h2>
                    )
                }

            </div>
            <div>
                <Pagination />
            </div>
        </>
    );
};

export default MainPage;