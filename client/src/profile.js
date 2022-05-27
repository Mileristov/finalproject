import ProfilePicture from "./profilepic";
import BioEditor from "./bioeditor";

// this is a functional one!
export default function Profile({
    // props:
    first_name,
    last_name,
    bio,
    profile_picture_url,
    onProfileClick,
    onBioUpdate,
}) {
    return (
        <div className="profilePage">
            <main>
                <h1>{first_name}</h1>
                <div className="avatar">
                    <ProfilePicture
                        profile_picture_url={profile_picture_url}
                        onProfileClick={onProfileClick}
                    />
                </div>

                <div>
                    <BioEditor
                        first_name={first_name}
                        last_name={last_name}
                        bio={bio}
                        onBioUpdate={onBioUpdate}
                    ></BioEditor>
                </div>
            </main>
        </div>
    );
}
