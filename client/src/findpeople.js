import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let abort = false;
        if (search) {
            fetch(`/api/userss/${search}`)
                .then((res) => res.json())
                .then((userData) => {
                    if (!abort) {
                        setUsers(userData);
                    }
                })
                .catch((err) => console.log(err));
            () => (abort = true);
        } else {
            setUsers(false);
        }
    }, [search]);

    function handleClick() {
        setUsers(false);
    }
    console.log(search);
    return (
        <>
            <div className="user-search">
                <h2>Find Your People</h2>
                <input
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search users"
                />
                {users && (
                    <div className="results">
                        {users.map((user) => {
                            return (
                                <Link
                                    to={`/user/${user.id}`}
                                    key={user.id}
                                    className="search-results"
                                    onClick={handleClick}
                                >
                                    <img
                                        className="founduserprofilepic"
                                        src={user.profile_picture_url}
                                    />
                                    <p>
                                        {user.first_name} {user.last_name}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}
