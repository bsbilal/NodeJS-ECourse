const jwt = require("jsonwebtoken");


function studentAuth(req, res, next) {
    const tokenWithBearer = req.header("Authorization");

    if (!tokenWithBearer) return res.status(401).send("Access Denied");

    const bearer = tokenWithBearer.split(' ');
    if (bearer[0] !== "Bearer") res.status(400).send("Invalid Token");
    const token = bearer[1];

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log("StudentToken", JSON.stringify(verified.roles[0].role.name));
        if (verified.roles[0].role.name === 'Student' || 'Teacher' || 'Admin') {
            req.user = verified;

        } else {
            res.status(400).send("Invalid Token");
        }
        next();

    } catch (error) {
        res.status(400).send("Invalid Token");
    }
}

function teacherAuth(req, res, next) {
    const tokenWithBearer = req.header("Authorization");

    if (!tokenWithBearer) return res.status(401).send("Access Denied");

    const bearer = tokenWithBearer.split(' ');
    if (bearer[0] !== "Bearer") res.status(400).send("Invalid Token");
    const token = bearer[1];

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log("StudentToken", JSON.stringify(verified.roles[0].role.name));
        if (verified.roles[0].role.name === 'Student' || 'Admin') {
            req.user = verified;

        } else {
            res.status(400).send("Invalid Token");
        }
        next();

    } catch (error) {
        res.status(400).send("Invalid Token");
    }
}

function adminAuth(req, res, next) {
    const tokenWithBearer = req.header("Authorization");

    if (!tokenWithBearer) return res.status(401).send("Access Denied");

    const bearer = tokenWithBearer.split(' ');
    if (bearer[0] !== "Bearer") res.status(400).send("Invalid Token");
    const token = bearer[1];

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log("StudentToken", JSON.stringify(verified.roles[0].role.name));
        if (verified.roles[0].role.name === 'Admin') {
            req.user = verified;

        } else {
            res.status(400).send("Invalid Token");
        }
        next();

    } catch (error) {
        res.status(400).send("Invalid Token");
    }
}


module.exports = {
    studentAuth,
    teacherAuth,
    adminAuth
}