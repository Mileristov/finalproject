import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./App";
fetch("/user/id.json")
    .then((res) => res.json())
    .then((data) => {
        console.log("data in start.js", data);
        if (!data.userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            ReactDOM.render(<App />, document.querySelector("main"));
        }
    })
    .catch((err) => console.log(err));
