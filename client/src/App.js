import { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Avatar from "./avatar.js";
import ProfilePicture from "./profilepic.js";
import Profile from "./profile.js";
import FindPeople from "./findpeople.js";
import OtherProfile from "./otherprofile.js";
import Logout from "./logout.js";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            // the first three entries will come from the server
            first_name: "",
            last_name: "",
            profile_picture_url: "",
            bio: "",
            id: "",
            showModal: false,
            showUserSearch: false,
        };
        this.onProfileClick = this.onProfileClick.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.onBioUpdate = this.onBioUpdate.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.changeUserSearch = this.changeUserSearch.bind(this);
    }
    componentDidMount() {
        fetch("/api/users/me")
            .then((response) => response.json())
            .then((data) =>
                this.setState({
                    // this can be this.setState(data) of course
                    id: data.id,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    profile_picture_url: data.profile_picture_url,
                    bio: data.bio,
                    userId: data.userId,
                })
            );
    }

    closeModal() {
        console.log("CLICK ON CLOSE");
        this.setState({ showModal: false });
    }

    onBioUpdate(newBio) {
        console.log("New Bio Updated", newBio);
        this.setState({ bio: newBio });
    }

    onProfileClick() {
        this.setState({
            showModal: true,
        });
    }

    onUpload(new_profile_url) {
        this.setState({ profile_picture_url: new_profile_url });
        this.setState({ showModal: false });
    }

    changeUserSearch() {
        this.setState((prevState) => ({
            showUserSearch: !prevState.showUserSearch,
        }));
    }

    render() {
        console.log("state", this.state);
        return (
            <div className="app">
                <BrowserRouter>
                    <header>
                        <div id="logout">
                            <Route>
                                <Logout />
                            </Route>
                        </div>
                    </header>
                    <header className="header">
                        <Link to="/">
                            <img id="logo" src="home.png" alt="LOGO" />
                        </Link>
                    </header>
                    <div className="searchbar">
                        <FindPeople />
                    </div>

                    <div>
                        <Route path="/user/:otherUserId">
                            <OtherProfile />
                        </Route>
                    </div>

                    <Route exact path="/">
                        <Profile
                            first_name={this.state.first_name}
                            last_name={this.state.last_name}
                            profile_picture_url={this.state.profile_picture_url}
                            bio={this.state.bio}
                            onUpload={this.onUpload}
                            closeModal={this.closeModal}
                            onProfileClick={this.onProfileClick}
                            onBioUpdate={this.onBioUpdate}
                            userId={this.state.userId}
                        />
                    </Route>
                </BrowserRouter>

                <footer>Whatever 2022</footer>

                {this.state.showModal && (
                    <Avatar
                        closeModal={this.closeModal}
                        onUpload={this.onUpload}
                    />
                )}
            </div>
        );
    }
}
