import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "./avatar";

export default function RecentUsers() {
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        fetch("/api/recentusers")
            .then((res) => res.json())
            .then((data) => {
                setUserData(data);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <>
            <div className="recent-users">
                {userData.map((user) => {
                    return (
                        <Link
                            to={`/user/${user.id}`}
                            key={user.id}
                            className="recent-user"
                        >
                            <Avatar
                                profile_picture_url={user.profile_picture_url}
                                key={user.id}
                            />
                        </Link>
                    );
                })}
            </div>
        </>
    );
}
