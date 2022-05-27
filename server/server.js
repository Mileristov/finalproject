const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./database/db");
const cookieSession = require("cookie-session");
const multer = require("multer");
const uidSafe = require("uid-safe");
const s3 = require("./s3");

const { Server } = require("http");
const server = Server(app);

app.use(compression());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(
    cookieSession({
        secret: "whatever",
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "uploads"));
    },

    filename: (req, file, callback) => {
        uidSafe(24).then((randomId) => {
            const fileName = `${randomId}${path.extname(file.originalname)}`;
            callback(null, fileName);
        });
    },
});

const uploader = multer({ storage });

app.get("/user/id.json", function (req, res) {
    res.json({
        userId: req.session.userId,
    });
});

app.get("/api/user/:otherUserId", async (req, res) => {
    // console.log("OTHER Users bio req body:", req.params);
    // console.log("USERS UserId:", req.session);
    const { otherUserId } = req.params;
    const { userId } = req.session;
    const user = await db.getUser(otherUserId);
    console.log("Otheruser ID await:", otherUserId, userId);
    res.json(user);
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.json({ success: true });
});

app.post(
    "/api/profile_picture",
    uploader.single("file"),
    s3.upload,
    (req, res) => {
        if (req.file) {
            const url = `https://s3.amazonaws.com/spicedling/${req.file.filename}`;
            console.log("url", url);
            db.updatePicture(req.session.userId, url)
                .then((insertedImage) => {
                    console.log("INSERTED IMAGE", insertedImage.rows[0]);
                    res.json({ url });
                })
                .catch((error) => {
                    console.log("error with picture ", error);
                    res.json({ success: false });
                });
        } else {
            res.json({ success: false });
        }
    }
);

app.get("/api/users/me", (req, res) => {
    const { userId } = req.session;
    db.getUser(userId).then((data) => {
        res.json(data);
    });
});

app.get("/welcome", (req, res) => {
    if (!req.session.userId) {
        res.redirect("/");
    }
});

app.post("/api/users/bio", (req, res) => {
    const { bio } = req.body;
    db.updateUserBio(bio, req.session.userId)
        .then(() => {
            res.json({
                success: true,
                bio: bio,
            });
        })
        .catch((error) => {
            console.log("error in bioEditor", error);
            res.json({ error: true });
        });
});

app.post("/register", (req, res) => {
    let { first_name, last_name, email, password } = req.body;

    db.createUser(first_name, last_name, email, password)
        .then(({ rows }) => {
            req.session.userId = rows[0].id;
            res.json({ success: true });
        })
        .catch((error) => {
            res.json({ success: false });
            console.log("error", error);
        });
});

app.post("/login", (req, res) => {
    db.loginUser(req.body)
        .then((user) => {
            req.session.user_id = user.id;
            console.log("rows: ", user);
        })
        .catch((error) => {
            res.json({ success: false });
            console.log("error", error);
        });
});

app.get("/api/userss/:search", (req, res) => {
    console.log(req.session);
    const { search } = req.params;
    db.getUsersByName(search, req.session.userId)
        .then((rows) => res.json(rows))
        .catch((err) => console.log(err));
});

// GET for recent users
app.get("/api/recentusers", (req, res) => {
    db.getRecentUsers(req.session.id)
        .then((rows) => res.json(rows))
        .catch((err) => console.log(err));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
