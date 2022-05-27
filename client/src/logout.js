import { Component } from "react";

export default class Logout extends Component {
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(e) {
        e.preventDefault();
        console.log("did submit LOGOUT");
        fetch("/logout").then(location.replace("/"));
    }
    render() {
        return (
            <>
                <a className="active" onClick={this.onSubmit}>
                    Logout
                </a>
            </>
        );
    }
}
