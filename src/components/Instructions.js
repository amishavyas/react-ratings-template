import React from "react";
import { Container, Typography } from "@material-ui/core";
import { Title, StyledButton } from "../StyledElements";

const Instructions = ({ nextStep }) => {
    const Continue = (e) => {
        e.preventDefault();
        nextStep();
    };

    return (
        <Container component="main" maxWidth="md">
            <Title text="INSTRUCTIONS" />

            <Typography
                style={{ fontSize: "21px" }}
                component="h2"
                variant="h6"
                align="center"
            >
                <br />
                Welcome to the experiment!
                <br />
                <br /> You can track your progress during the experiment with a
                progress bar located on the top of your screen. After finishing
                all the experiment trials, you will complete a short demographic
                survey, be debriefed, and receive your completion code.
                <br />
                <br />
                <strong>
                    PLEASE DO NOT REFRESH YOUR BROWSER OR CLICK THE BACK BUTTON
                    DURING THE EXPERIMENT
                </strong>
            </Typography>

            <StyledButton nextPage={Continue} text="Start Experiment" />
        </Container>
    );
};

export default Instructions;
