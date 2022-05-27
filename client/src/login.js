import { Component } from "react";
import { Link } from "react-router-dom";

export default class login extends Component {
    constructor() {
        super();
        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log(this.state)
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("USER TRIED TO SUBMIT");
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((res) => res.json())
            .then((result) => {
                if (!result.success) {
                    this.setState({ error: true });
                } else {
                    location.reload();
                }
                // if something goes wrong => render an error
                // if all goes to plan, refresh the page
            })
            .catch((err) => {
                console.log("err", err);
                // if something goes wrong => render an error
            });
    }

    render() {
        return (
            <>
                <h1>Login Component</h1>
                {this.state.error && <p>Oops, something went wrong!</p>}
                <form onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.handleChange}
                        type="email"
                        name="email"
                        placeholder="Email Address"
                    />
                    <input
                        onChange={this.handleChange}
                        type="password"
                        name="password"
                        placeholder="Password"
                    />
                    <button>Submit</button>

                    <Link to="/">Not a member yet? Sign up here!</Link>
                </form>
            </>
        );
    }
}
