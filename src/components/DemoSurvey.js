import React, { Component } from "react";
import { Container, Grid, Typography, RadioGroup, FormGroup, FormControlLabel } from "@material-ui/core";
import { Logos, StyledButton, StyledRadioButton, StyledCheckbox, StyledTextField, Title } from "../StyledElements";

const raceLabels = [
    "American Indian or Alaska Native",
    "Black or African American",
    "South Asian",
    "South East Asian",
    "East Asian",
    "Middle Eastern / North African",
    "Native Hawaiian or Other Pacific Islander",
    "White",
    "Prefer not to answer",
    "Other",
];
const genderLabels = ["Man", "Woman", "Non-binary", "Prefer not to answer"];
const educationLabels = [
    "Less than high school credential",
    "High school credential",
    "Some post-high-school, no bachelor's degree",
    "Bachelor's degree",
    "Graduate degree",
    "Prefer not to answer",
];
const sexLabels = ["Female", "Male", "Prefer not to answer"];
const ethnicityLabels = ["Hispanic or Latino", "Not Hispanic or Latino"];

export default class DemoSurvey extends Component {
    /* Collect age, education, gender, and race / ethnicity info for each participant */

    constructor(props) {
        super(props);
        this.state = {
            age: "",
            education: "",
            gender: "",
            sex: "",
            race: [],
            ethnicity: "",
        };
    }

    continue = (e) => {
        e.preventDefault();
        if (this.validateResponses()) {
            this.sendDemoDataToParent();
        }
        /* If they are younger than 18, they will not see the debrief page and completion code 
        We will also not be storing their data */
    };

    validateResponses = () => {
        for (const demo of Object.entries(this.state)) {
            if (demo[1] === "" || demo[1].length === 0) {
                alert(
                    "Please enter your response for - " + demo[0].toUpperCase()
                );
                return false;
            }
        }
        return true;
    };

    sendDemoDataToParent = () => {
        for (const demo of Object.entries(this.state)) {
            if (demo[0].includes("Other")) {
                continue;
            } else {
                this.props.updateParentState(demo[0], demo[1]);
            }
        }
        if (this.state.age < 18) {
            alert("Please enter your age correctly");
        } else {
            this.props.nextStep();
        }
    };

    handleCheckbox = (e) => {
        const currentRaceSelection = Array.from(this.state.race);
        if (e.target.checked) {
            if (!currentRaceSelection.includes(e.target.value)) {
                this.setState({ race: [...this.state.race, e.target.value] });
            }
        } else {
            currentRaceSelection.splice(
                currentRaceSelection.indexOf(e.target.value),
                1
            );
            this.setState({ race: currentRaceSelection });
        }
    };

    render() {
        return (
            <Container component="main" maxWidth="md">
                <Logos />
                <Title text="DEMOGRAPHIC SURVEY" />

                <Typography
                    style={{
                        marginTop: "3%",
                        textAlign: "center",
                        fontSize: "21px",
                        color: "black",
                    }}
                >
                    You have finished all the trials! <br />
                    <br />
                    Please complete the following survey. You will be debriefed
                    and receive your completion code on the next page.
                </Typography>

                <Typography
                    style={{ marginTop: "3%", textAlign: "left" }}
                    component="h1"
                    variant="h6"
                >
                    Please enter your age
                    <StyledTextField
                        placeholder="Age"
                        onChange={(e) => this.setState({ age: e.target.value })}
                        type="number"
                        InputProps={{ style: { fontSize: 19 }, minLength: 2 }}
                        fullWidth
                    />
                    <br />
                    <br />
                    Please indicate your gender
                    <br />
                    <RadioGroup
                        name="controlled-radio-buttons-group"
                        onChange={(e) =>
                            this.setState({ gender: e.target.value })
                        }
                        inputlabelprops={{ style: { fontSize: 18 } }}
                    >
                        {genderLabels.map((gender, index) => (
                            <FormControlLabel
                                value={gender}
                                key={index}
                                control={<StyledRadioButton />}
                                label={
                                    <Typography style={{ fontSize: "18px" }}>
                                        {" "}
                                        {gender}{" "}
                                    </Typography>
                                }
                            />
                        ))}
                        <FormControlLabel
                            value={"Other: " + this.state.genderOther}
                            key={"other"}
                            control={<StyledRadioButton />}
                            label={
                                <Typography style={{ fontSize: "18px" }}>
                                    <Grid item md={10}>
                                        <StyledTextField
                                            placeholder="Other"
                                            onChange={(e) =>
                                                this.setState({
                                                    genderOther: e.target.value,
                                                })
                                            }
                                            InputProps={{
                                                style: { fontSize: 19 },
                                            }}
                                        />
                                    </Grid>
                                </Typography>
                            }
                        />
                    </RadioGroup>
                    <br />
                    Please indicate your sex at birth
                    <br />
                    <RadioGroup
                        name="controlled-radio-buttons-group"
                        onChange={(e) => this.setState({ sex: e.target.value })}
                        inputlabelprops={{ style: { fontSize: 18 } }}
                    >
                        {sexLabels.map((sex, index) => (
                            <FormControlLabel
                                value={sex}
                                key={index}
                                control={<StyledRadioButton />}
                                label={
                                    <Typography style={{ fontSize: "18px" }}>
                                        {" "}
                                        {sex}{" "}
                                    </Typography>
                                }
                            />
                        ))}
                        <FormControlLabel
                            value={"Other: " + this.state.sexOther}
                            control={<StyledRadioButton />}
                            label={
                                <Typography style={{ fontSize: "18px" }}>
                                    <Grid item md={10}>
                                        <StyledTextField
                                            placeholder="Other"
                                            onChange={(e) =>
                                                this.setState({
                                                    sexOther: e.target.value,
                                                })
                                            }
                                            InputProps={{
                                                style: { fontSize: 19 },
                                            }}
                                        />
                                    </Grid>
                                </Typography>
                            }
                        />
                    </RadioGroup>
                    <br />
                    Please indicate your race. Select all that apply.
                    <FormGroup onChange={this.handleCheckbox}>
                        {raceLabels.map((race, index) => (
                            <FormControlLabel
                                value={race}
                                key={index}
                                control={<StyledCheckbox />}
                                label={
                                    <Typography style={{ fontSize: "18px" }}>
                                        {race}
                                    </Typography>
                                }
                            />
                        ))}
                    </FormGroup>
                    <br />
                    Please indicate your ethnicity
                    <RadioGroup
                        onChange={(e) =>
                            this.setState({ ethnicity: e.target.value })
                        }
                    >
                        {ethnicityLabels.map((ethnicity, index) => (
                            <FormControlLabel
                                value={ethnicity}
                                key={index}
                                control={<StyledRadioButton />}
                                label={
                                    <Typography style={{ fontSize: "18px" }}>
                                        {ethnicity}
                                    </Typography>
                                }
                            />
                        ))}
                    </RadioGroup>
                    <br />
                    What is the highest level of education you have completed?
                    <RadioGroup
                        name="controlled-radio-buttons-group"
                        onChange={(e) =>
                            this.setState({ education: e.target.value })
                        }
                    >
                        {educationLabels.map((educationLevel, index) => (
                            <FormControlLabel
                                value={educationLevel}
                                key={index}
                                control={<StyledRadioButton />}
                                label={
                                    <Typography style={{ fontSize: "18px" }}>
                                        {educationLevel}
                                    </Typography>
                                }
                            />
                        ))}
                        <FormControlLabel
                            value={"Other: " + this.state.educationOther}
                            control={<StyledRadioButton />}
                            label={
                                <Typography style={{ fontSize: "18px" }}>
                                    <Grid item md={10}>
                                        <StyledTextField
                                            placeholder="Other"
                                            onChange={(e) =>
                                                this.setState({
                                                    educationOther:
                                                        e.target.value,
                                                })
                                            }
                                            InputProps={{
                                                style: { fontSize: 19 },
                                            }}
                                        />
                                    </Grid>
                                </Typography>
                            }
                        />
                    </RadioGroup>
                </Typography>
                <br />
                <StyledButton nextPage={this.continue} text="Next" />
            </Container>
        );
    }
}
