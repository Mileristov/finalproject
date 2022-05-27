import { Component } from "react";
import { Link } from "react-router-dom";

export default class Registration extends Component {
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
        fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((res) => res.json())
            .then((register) => {
                if (!register.success) {
                    this.setState({ error: true });
                } else {
                    location.reload();
                }
            })
            .catch((err) => {
                this.setState({ error: true });
                console.log(err);
            });
    }

    render() {
        return (
            <>
                <h1>Registration Component</h1>
                {this.state.error && <p>Oops, something went wrong!</p>}
                <form onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.handleChange}
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                    />
                    <input
                        onChange={this.handleChange}
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                    />
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

                    <Link to="/login">Already a member? Click to sign in!</Link>
                </form>
            </>
        );
    }
}
