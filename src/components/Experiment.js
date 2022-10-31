import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import Consent from "./Consent";
import Instructions from "./Instructions";
import Trials from "./Trials";
import Debrief from "./Debrief";
import DemoSurvey from "./DemoSurvey";

export default class Experiment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subID: uuidv4(),
            step: 1,
            ratings: [],
            stimOrder: [],
        };
    }

    /* allows child components to make changes to Experiment's state */

    updateParentState = (stateToUpdate, newState) => {
        this.setState({
            [stateToUpdate]: newState,
        });
    };

    prevStep = () => {
        const { step } = this.state;
        this.setState({ step: step - 1 });
    };

    nextStep = () => {
        const { step } = this.state;
        this.setState({ step: step + 1 });
        window.scrollTo(0, 0);
    };

    render() {
        const { step } = this.state;

        switch (step) {
            case 1:
                return <Consent nextStep={this.nextStep} />;
            case 2:
                return (
                    <Instructions
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                    />
                );
            case 3:
                return (
                    <Trials
                        nextStep={this.nextStep}
                        updateParentState={this.updateParentState}
                    />
                );
            case 4:
                return (
                    <DemoSurvey
                        nextStep={this.nextStep}
                        updateParentState={this.updateParentState}
                    />
                );
            case 5:
                return <Debrief nextStep={this.nextStep} />;
            default:
        }
    }
}
