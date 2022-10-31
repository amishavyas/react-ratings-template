import { Box, Button, Slider, TextField, Typography, Checkbox, Radio } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ValueLabel from "@material-ui/core/Slider/ValueLabel";
import styled from "styled-components";
import dartLogo from "./images/D-Pine_CMYK.png";
import labLogo from "./images/lab-logo.png";

const Title = ({ text }) => {
    return (
        <Typography
        style={{ fontWeight: "bold", color: "#165806" }}
        component="h1"
        variant="h4"
        align="center"
        >
            <br />{text} <br />
        </Typography>
    );
};

const Logos = () => {
    return (
        <Box style={{ display: "flex", justifyContents: "center" }}>
            <img
                src={dartLogo}
                alt={"Dartmouth logo"}
                style={{
                    height: "120px",
                    margin: "auto",
                    marginTop: "15px",
                    marginRight: "-30%",
                }}
            ></img>
            <img
                src={labLogo}
                alt={"SCRAP Lab logo"}
                style={{
                    height: "120px",
                    margin: "auto",
                    marginTop: "15px",
                }}
            ></img>
        </Box>
    );
};

const StyledButton = ({ nextPage, text }) => {
    return (
        <Box style={{ display: "flex", justifyContent: "center" }}>
            <Button
                onClick={nextPage}
                variant="contained"
                style={{
                    fontSize: "15px",
                    marginTop: "5%",
                    marginBottom: "10%",
                    backgroundColor: "#e4d09e",
                }}
            >
                {text}
            </Button>
        </Box>
    );
};

const CustomSlider = withStyles({
    root: {
        color: "#654321",
        height: 0,
    },
    active: {},
    track: {
        height: 12,
        borderRadius: 2,
        opacity: 0.6,
    },
    thumb: {
        height: 15,
        width: 15,
        bottom: "1px",
        backgroundColor: "beige",
        border: "1px solid darkbeige",

        boxShadow: "lightgrey 0 1px 1px",
        "&:focus, &:hover, &$active": {
            boxShadow: "#ccc 0 2px 2px",
        },
        color: "lightgrey",
    },
    rail: {
        height: 12,
    },
})(Slider);

const StyledValueLabel = withStyles({
    label: {
        color: "black",
        fontWeight: "bold",
        fontSize: "15px",
    },
})(ValueLabel);

const StyledRadioButton = withStyles({
    root: {
        "&$checked": {
            color: "#165806",
            opacity: "70%",

            "&:hover": {
                color: "default",
                backgroundColor: "transparent",
                opacity: "100%",
            },
        },
        "&:hover": {
            color: "default",
            backgroundColor: "transparent",
            opacity: "100%",
        },
    },
    checked: {},
})(Radio);

const StyledCheckbox = withStyles({
    root: {
        "&$checked": {
            color: "#165806",
            opacity: "70%",

            "&:hover": {
                backgroundColor: "transparent",
            },
        },

        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    checked: {},
})(Checkbox);

const StyledTextField = withStyles({
    root: {
        "& label.Mui-focused": {
            color: "green",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "green",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "red",
            },
            "&:hover fieldset": {
                borderColor: "yellow",
            },
            "&.Mui-focused fieldset": {
                borderColor: "green",
            },
        },
    },
})(TextField);

const StyledBox = styled.div`
    text-align: center;
    display: flex;
    border-radius: 5px;
    background-color: #e4d09e;
    opacity: 60%;
    flex-direction: column;
    font-size: 30px;
    color: black;
    margin: auto;
    min-height: 10px;
    width: 45%;
`;

export {
    CustomSlider,
    Logos,
    StyledValueLabel,
    StyledRadioButton,
    StyledCheckbox,
    StyledTextField,
    StyledBox,
    StyledButton,
    Title,
};
