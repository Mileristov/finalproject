import { useParams, useHistory } from "react-router";
import { useState, useEffect } from "react";

export default function OtherProfile() {
    const { otherUserId } = useParams();
    const [err, setErr] = useState("");
    const history = useHistory();
    const [user, setUser] = useState({});

    // console.log("history:", history);
    useEffect(() => {
        let abort = false;
        // console.log("otherProfile just rendered for the first time :D");
        // console.log(
        //     "the if of user we want to request information for is:",
        //     otherUserId
        // );
        // console.log("typeof otherUserId", typeof otherUserId);
        // #2nd is make a request to fetch this data from the server
        // this fetch should probably go to sth like /api/otherUser/500
        fetch(`/api/user/${+otherUserId}`)
            .then((res) => res.json())
            .then((data) => {
                // console.log("DATA other profile", data);
                if (!abort) {
                    setUser(data);
                }
            })
            .catch((err) => {
                console.log("OTHERPROFILE err", err);
                setErr(err);
            });

        // #3.c the server tells us this is our own profile
        if (otherUserId === user.id) {
            // console.log("OWN profile, redirecting");
            history.push("/");
        }

        return () => {
            abort = true;
        };
    }, [otherUserId]);
    return (
        <>
            <div className="other-profile-container">
                <h2>
                    {user.first_name} {user.last_name}
                </h2>
                <div className="other-profile-bio">
                    <img src={user.profile_picture_url} alt={user.first_name} />

                    <p>{user.bio}</p>
                    {err && <h2>could not find user</h2>}
                </div>
            </div>
        </>
    );
}
