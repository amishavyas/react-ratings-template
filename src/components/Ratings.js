import React, { useState, useEffect } from "react";
import { Container, Typography, LinearProgress } from "@mui/material";
import { StyledButton, StyledSlider } from "../StyledElements";

function Ratings({ stimOrder, nextPage, responses, setResponses }) {
    const [trialNum, setTrialNum] = useState(0);
    const [currStim, setCurrStim] = useState(stimOrder[trialNum]);
    const [RT, setRT] = useState(0);
    const [slider, setSlider] = useState({
        value: 0,
        moved: false,
    });

    const setTrial = () => {
        /* Resetting states (RT, new stim, slider values) for the new trial */
        setRT(Date.now());
        setCurrStim(stimOrder[trialNum]);
        setSlider({ value: 0, moved: false });
    };

    const nextTrial = () => {
        /*
            Record responses and move to the next trial only if the ratings slider has been moved
            If not, display an alert 
        */
        if (slider.moved) {
            setResponses([
                ...responses,
                {
                    trial: trialNum,
                    stim: currStim,
                    rating: slider.value,
                    RT: Date.now() - RT,
                },
            ]);
            setTrialNum(trialNum + 1);
        } else {
            alert(
                "Please move the slider from its default position to continue, even if your response is 0."
            );
        }
    };

    const handleSlider = (e, newValue) => {
        /* 
            Record new slider value and that it has been interacted with
            Users cannot proceed to the next trial without moving the slider
            from its default position 
        */
        setSlider({ value: newValue, moved: true });
    };

    useEffect(() => {
        /* Runs only when trialNum updates */
        if (trialNum === stimOrder.length) {
            nextPage();
        } else {
            setTrial();
        }
    }, [trialNum]);

    return (
        <div>
            <LinearProgress
                variant="determinate"
                value={(trialNum / stimOrder.length) * 100}
                sx={{
                    height: 10,
                    backgroundColor: `#c7d1bc`,
                    "& .MuiLinearProgress-bar": {
                        backgroundColor: `#165806`,
                    },
                }}
            />
            <Container component="main" maxWidth="md" align="center">
                <Typography variant="h4" padding="3%" marginTop="20px">
                    How {currStim} is your partner?
                </Typography>

                <StyledSlider
                    value={slider.value}
                    valueLabelDisplay="auto"
                    onChange={handleSlider}
                    min={-50}
                    max={50}
                    style={{ marginTop: "20px" }}
                />

                <StyledButton handleClick={nextTrial} text="Next Trial" />
            </Container>
        </div>
    );
}

export default Ratings;
