// const express = require("express");
// const router = express.Router();
const passport = require("passport");

// router.post("/register_login", (req, res, next) => {
//     passport.authenticate("local", function(err, user, info) {
//         if (err) {
//             return res.status(400).json({ errors: err });
//         }
//         if (!user) {
//             return res.status(400).json({ errors: "No user found" });
//         }
//         req.logIn(user, function(err) {
//             if (err) {
//                 return res.status(400).json({ errors: err });
//             }
//             return res.status(200).json({ success: `logged in ${user.id}` });
//         });
//     })(req, res, next);
// });

// module.exports = router;



module.exports = function(app) {
    app.post("/register_login", (req, res, next) => {
        passport.authenticate("local", function(err, user, info) {
            if (err) {
                return res.status(400).json({ errors: err });
            }
            if (!user) {
                return res.status(400).json({ errors: "No user found" });
            }
            req.logIn(user, function(err) {
                if (err) {
                    return res.status(400).json({ errors: err });
                }
                return res.status(200).json({ success: `logged in ${user.id}` });
            });
        })(req, res, next);
    });


    app.get('/login', function(req, res) {
        // res.render('login', {
        //     title: 'Express Login'
        // });
        res.send("/login")
    });

    app.get('/', function(req, res) {
            // Cookies that have not been signed
            console.log('Cookies: ', req.cookies)

            // Cookies that have been signed
            console.log('Signed Cookies: ', req.signedCookies)
            res.cookie('cokkieName', 1000, { maxAge: 900000, httpOnly: true })

            console.log('cookie have created successfully');
            res.send("/")
        })
        //other routes..
}