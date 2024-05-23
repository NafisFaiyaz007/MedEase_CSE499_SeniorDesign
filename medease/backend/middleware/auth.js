const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        // return res.json({valid: false, message: "Token not found"});
        if (renewToken(req, res)) {
            next();
        }

    } else {
        jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.json({ valid: false, message: "Invalid Token" });
            } else {
                req.userId = decoded.userId;
                next();
            }
        })
    }
}
const renewToken = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    let exist = false;
    if (!refreshToken) {
        return res.json({ valid: false, message: "Token not found" });
    } else {
        jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.json({ valid: false, message: "Invalid Token" });
            } else {
                req.userId = decoded.userId;
                const accessToken = jwt.sign({ "userId": user[0].id, "name": user[0].name }, process.env.JWT_SECRET_KEY, {
                    expiresIn: '1h',
                });
                res.cookie("accessToken", accessToken, { maxAge: 60000 });
                exist = true;
            }
        })
    }
    return exist;
}