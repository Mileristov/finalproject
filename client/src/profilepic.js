export default function ProfilePicture({
    profile_picture_url,
    onProfileClick,
    first_name,
    last_name,
}) {
    return (
        <img
            id="pictureHeader"
            src={profile_picture_url || "../default.jpg"}
            onClick={onProfileClick}
            alt={`${first_name} ${last_name}`}
        />
    );
}
