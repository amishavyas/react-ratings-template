import React, { useState } from "react";
import Consent from "./Consent";
import DemoSurvey from "./DemoSurvey";
import Ratings from "./Ratings";
import Debrief from "./Debrief";

function Experiment() {
    const [page, setPage] = useState(1);
    const [responses, setResponses] = useState([]);
    const stimOrder = ["dominant", "bossy", "trustworthy", "happy"];
    const [demoData, setDemoData] = useState({
        age: "",
        education: "",
        gender: "",
        sex: "",
        ethnicity: "",
        race: [],
    });

    const nextPage = () => setPage(page + 1);

    const conditionalComponent = () => {
        switch (page) {
            case 1:
                return <Consent nextPage={nextPage} />;
            case 2:
                return (
                    <Ratings
                        nextPage={nextPage}
                        stimOrder={stimOrder}
                        responses={responses}
                        setResponses={setResponses}
                    />
                );
            case 3:
                return (
                    <DemoSurvey
                        nextPage={nextPage}
                        demoData={demoData}
                        setDemoData={setDemoData}
                    />
                );
            case 4:
                return <Debrief />;
            default:
        }
    };

    return <div>{conditionalComponent()}</div>;
}

export default Experiment;
