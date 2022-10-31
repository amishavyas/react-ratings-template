import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";
import { CustomSlider, StyledButton, StyledValueLabel } from "../StyledElements";

/* 
C-ToM RAs -- TODO: 
(1) Modify the Trials component to stop the participant from continuing if they have not touched the slider 
(2) Before the next component shows up (DemoSurvey), send stimOrder to the parent (Experiment) 
*/

class Trials extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stimOrder: [1, 2, 3, 4, 5],
            currStim: "",
            currSliderValue: 0,
            sliderMoved: false,
            trial: 0,
            responses: [],
        };
    }

    continue = (e) => {
        e.preventDefault();
        this.nextTrial();

        const { trial, stimOrder } = this.state;
        if (trial === stimOrder.length - 1) {
            this.props.nextStep();
        }
    };

    nextTrial = () => {
        const { trial } = this.state;
        this.recordSliderValue();
        this.setState({ trial: trial + 1 }, () => this.setCurrentStim());
        this.resetSlider();
    };

    setCurrentStim = () => {
        const { stimOrder, trial } = this.state;
        this.setState({ currStim: stimOrder[trial] });
    };

    recordSliderValue = () => {
        const { trial, currStim, currSliderValue, responses } = this.state;
        const newResponses = {
            ...responses,
            [trial]: { stim: currStim, value: currSliderValue },
        };
        this.setState({ responses: newResponses });
        return newResponses;
    };

    resetSlider = () => {
        this.setState({ currSliderValue: 0, sliderMoved: false });
    };

    componentDidMount() {
        this.setCurrentStim();
    }

    componentWillUnmount() {
        this.props.updateParentState("ratings", this.recordSliderValue());
    }

    render() {
        const { currStim } = this.state;

        return (
            <div>
                <Grid container justifyContent="center">
                    <Grid item md={10}>
                        <Typography
                            style={{
                                fontSize: "33px",
                                color: "rgb(33,37,40)",
                                padding: "3%",
                            }}
                            align="center"
                        >
                            {currStim}
                        </Typography>
                    </Grid>

                    <Grid item md={10}>
                        <CustomSlider
                            value={this.state.currSliderValue}
                            valueLabelDisplay="auto"
                            ValueLabelComponent={StyledValueLabel}
                            onChange={(_, value) =>
                                this.setState({
                                    currSliderValue: value,
                                    sliderMoved: true,
                                })
                            }
                            min={-50}
                            max={50}
                        />
                        <Typography
                            style={{
                                color: "rgb(33,37,40)",
                                textAlign: "left",
                                fontSize: "30px",
                                paddingTop: "1%",
                            }}
                            component="h4"
                            variant="h5"
                        >
                            <strong>
                                <span style={{ float: "left" }}>
                                    Very negative
                                </span>
                                <span style={{ float: "right" }}>
                                    Very positive
                                </span>
                            </strong>
                        </Typography>
                    </Grid>
                </Grid>

                <StyledButton nextPage={this.continue} text="Next" />
            </div>
        );
    }
}

export default Trials;
