const spicedPg = require("spiced-pg");

const dbUrl =
    process.env.DATABASE_URL ||
    "postgres:postgres:kalendar123@localhost:5432/socialnetwork";

const db = spicedPg(dbUrl);

const bcrypt = require("bcryptjs");

function hashPassword(password) {
    return bcrypt.genSalt().then((salt) => {
        return bcrypt.hash(password, salt);
    });
}

module.exports.updateUserBio = (bio, userId) => {
    const query = `
        UPDATE users 
        SET bio=$1
        WHERE id=$2
        RETURNING *;
        `;
    const params = [bio, userId];
    return db.query(query, params);
};

module.exports.updatePicture = (url, userId) => {
    const query = `
        UPDATE users 
        SET profile_picture_url=$2
        WHERE id=$1
        RETURNING *;
        `;
    const params = [url, userId];
    return db.query(query, params);
};

module.exports.createUser = (first_name, last_name, email, password) => {
    return hashPassword(password).then((passwordhash) => {
        const query = `
        INSERT INTO users (first_name, last_name, email, password_hash)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
        const params = [first_name, last_name, email, passwordhash];
        return db.query(query, params);
    });
};

module.exports.loginUser = (first_name, last_name) => {
    const query = `
        SELECT id, email, password_hash
        FROM users
        WHERE email = $1;
        `;
    const params = [first_name, last_name];
    return db.query(query, params);
};

module.exports.password = (email) => {
    const query = `
        SELECT email
        FROM users
        WHERE email = $1;
        `;
    const params = [email];
    return db.query(query, params);
};

module.exports.getUser = (userId) => {
    return db
        .query(`SELECT * FROM users WHERE id = $1`, [userId])
        .then((result) => {
            return result.rows[0];
        });
};

module.exports.getUsersByName = (users, userId) => {
    return db
        .query(
            `
            SELECT first_name, last_name, profile_picture_url, id
            FROM users
            WHERE first_name ILIKE $1 AND id != $2
            LIMIT 3 
            `,
            [users + "%", userId]
        )
        .then((result) => result.rows)
        .catch((err) => console.log(err));
};

module.exports.getUsersByName = (users, userId) => {
    console.log(users, userId);
    return db
        .query(
            `
            SELECT first_name, last_name, profile_picture_url, id
            FROM users
            WHERE first_name ILIKE $1 AND id != $2
            LIMIT 5 
            `,
            [users + "%", userId]
        )
        .then((result) => result.rows)
        .catch((err) => console.log(err));
};

module.exports.getRecentUsers = (userId) => {
    return db
        .query(
            `
            SELECT first_name, last_name, profile_picture_url, id
            FROM users
            WHERE id != $1
            ORDER BY created
            DESC
            LIMIT 4
            `,
            [userId]
        )
        .then((result) => result.rows);
};
