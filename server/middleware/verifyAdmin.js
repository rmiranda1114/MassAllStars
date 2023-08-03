function verifyAdmin (req, res, next) {
    if(!req?.admin) return res.sendStatus(401);
    if(req.admin) return res.sendStatus(401);
    next();
}

module.exports = verifyAdmin;