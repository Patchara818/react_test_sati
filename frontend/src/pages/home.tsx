import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    LinearProgress,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import CardList from "../components/cardList";

const Home = () => {
    // Onclick Random Function
    const [randnumber, setNum] = useState(0);
    const [errorStage, setInputError] = useState(false);

    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const btnRandomClick = () => {
        const number = randomNumberInRange(1, 10)
        setInputError(false);

        setNum(number);
        fetchData(number);
    };

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            setNum(value);
        }

        if (value > 10) {
            setInputError(true);
        }else{
            setInputError(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && (randnumber > 0 && randnumber <= 10)) {
            fetchData(randnumber);
        }else{
            setData(null);
        }
    };

    // API GET Images
    const url = "https://api.thecatapi.com/v1/images/search";
    const api_key = "live_UMIEHUqwTGnUFY8TiJrv60nSuK36A42ddgNtFcb9YWb4lsQgXUJGvfJ4xcJfnlqA"
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async (limit) => {
        setIsLoading(true);
        try {
            if (limit > 0) {
                const params = `${url}?limit=${limit}&api_key=${api_key}`;
                console.log(limit);

                const response = await axios.get(params);
                setData(response.data);
                // console.log(response.data);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);

        }
    };

    useEffect(() => {
        fetchData(0);
    }, []);

    return (
        <Stack spacing={2} padding={1} data-testid="main">
            <Typography variant="h3" component="h1">
                Cat Gallery
            </Typography>
            <Stack>
                <TextField
                    error={errorStage}
                    fullWidth
                    inputProps={{
                        "data-testid": "images-number-field",
                    }}
                    label="Images Number"
                    type="number"
                    value={randnumber}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    helperText={"Number should be between 1 and 10"}
                />
                <Button
                    onClick={btnRandomClick}
                    data-testid="random-image-btn"
                    disableElevation
                    variant="contained"
                    fullWidth
                >
                    Random
                </Button>
            </Stack>

            {isLoading && (
                <Box sx={{ width: "100%" }} data-testid="loading-indicator">
                    <LinearProgress />
                </Box>
            )}

            <CardList data={data} />
        </Stack>
    );
};

export default Home;
