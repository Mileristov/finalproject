export default function avatar({ closeModal, onUpload }) {
    function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        console.log("file", event.target.file);
        formData.append("file", event.target[0].files[0]);
        fetch("/api/profile_picture", {
            method: "POST",
            body: formData,
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log("response", data);
                onUpload(data.url);
                // this.images.unshift(insertedImage);
            })
            .catch((error) => {
                console.log("ERROR", error);
            });
        // perform the fetch
        // on success, call onUpload with the right parameter
    }
    return (
        <div className="modal">
            <button className="close" onClick={closeModal}>
                &times;
            </button>
            <div className="modal-content">
                <h2>Upload profile picture</h2>
                <form onSubmit={onSubmit}>
                    <input type="file" required name="file" />
                    <button>Uploads</button>
                </form>
            </div>
        </div>
    );
}
