import { Component } from "react";

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            ...
        };
    }
    onInput(event) {
        // one handler to rule them all!
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    onSubmitStepOne(event) {
        event.preventDefault();
        fetch('/api/password', {
            method: 'POST',
            body: JSON.stringify({ email: this.state.email }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log('status', response.status);
            return response.json();
        }).then(data => {
            console.log('data', data)
        });
        // use the fetch operation we used to implement the server!
        // if anything goes wrong, update the error message
        // otherwise, increment the step
    }
    onSubmitStepTwo(event) {
        event.preventDefault();
        // see above
    }
    renderStepOne() {
        return (
            <form onSubmit={this.onSubmitStepOne}>
                <h3>Step 1</h3>
                <input
                    name="email"
                    type="email"
                    required
                    placeholder="Email"
                    onInput={this.onInput}
                />
                <button>Send verification code</button>
            </form>
        );
    }
    renderStepTwo() {
        return (
            <form onSubmit={this.onSubmitStepTwo}>...</form>
        );
    }
    renderStepThree() {
        return ...
    }
    renderStep() {
        /*eslint indent: [2, 4, {"SwitchCase": 1}]*/
        switch (this.state.step) {
            case 1:
                return this.renderStepOne();
            case 2:
                return this.renderStepTwo();
            case 3:
                return this.renderStepThree();
        }
    }
    render() {
        return (
            <div className="password-reset">
                <h2>Password reset</h2>
                {this.renderStep()}
                <p>{this.state.error}</p>
            </div>
        );
    }
}

export default ResetPassword;