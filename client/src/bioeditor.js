import { Component } from "react";
export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
        };
        // bind things!
        this.onSubmit = this.onSubmit.bind(this);
        this.showEdit = this.showEdit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    cancelEdit() {
        this.setState({
            editing: false,
        });
    }

    showEdit() {
        this.setState({
            editing: true,
        });
    }

    onSubmit(event) {
        event.preventDefault();
        const newBio = event.target.bio.value;
        console.log("newBio", newBio);
        fetch("/api/users/bio", {
            method: "POST",
            body: JSON.stringify({ bio: newBio }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())

            .then((data) => {
                console.log("data", data);

                this.props.onBioUpdate(data.bio);
                this.setState({ editing: false });
            });
        // extract the bio as event.target.[textareaName].value
        // make the right HTTP call
        // call the function passed as a prop
    }
    render() {
        // If !this.props.bio then render "ADD BIO BUTTON"
        if (!this.props.bio && !this.state.editing) {
            return <button onClick={this.showEdit}>Add your Bio</button>;
        }
        // if this.state.isEditing then render render INPUT FIELD & SAVE BIO BUTTON
        if (this.state.editing) {
            return (
                <form onSubmit={this.onSubmit}>
                    <textarea
                        name="bio"
                        className="biotextarea"
                        defaultValue={this.props.bio}
                        onChange={this.handleChange}
                    ></textarea>
                    <button>Save</button>
                </form>
            );
        }
        // IF !this.state.isEditing && this.props.bio
        if (!this.state.editing && this.props.bio) {
            return (
                <>
                    <h3>
                        {" "}
                        <p>{this.props.first_name} Bio</p>
                    </h3>
                    <p className="bio">{this.props.bio}</p>
                    <button onClick={this.showEdit}>Edit Bio</button>
                </>
            );
        }
    }
}
