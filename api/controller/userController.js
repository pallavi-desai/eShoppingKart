/**

 @author    Rashmika Ibrahimpatnam => B00832190

 **/

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretOrKey = "secret";

//load the model
const User = require("../model/userModel");


//post request for register
const register = (req, res) => {
    User.findOne({ username: req.body.uname }).then(user => {
        if (user) {
            return res.json({ status: false, message: "Username already exists"});
        }
        else {
            const addUser = new User({
                firstname: req.body.fname,
                lastname: req.body.lname,
                username: req.body.uname,
                password: req.body.pass,
                date: req.body.dob
            });
            //encrypt the pwd
            bcrypt.genSalt(10, (error, salt) => {
                bcrypt.hash(addUser.password, salt, (error, encrypt) => {
                    addUser.password = encrypt;
                    addUser
                        .save()
                        .then(user => {
                            res.json({status: true, message: "Username registered"})
                        })
                        .catch(error => console.log(error));
                });
            });
        }
    });
}

//post request for login
const login = (req, res) => {
    const username = req.body.uname;
    const password = req.body.pass;

    // Find user by username
    User.findOne({ username: req.body.uname }).exec()
        .then(user => {
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // User matched
                        // Create JWT Payload

                        const payload = {
                            id: user.id,
                            name: user.username
                        };

                        // Sign token

                        jwt.sign(
                            payload,
                            secretOrKey,
                            {
                                expiresIn: 31556926
                            },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token,
                                    userid: user.id
                                });

                            }
                        );

                    }
                    else{
                        return res.json({ passwordincorrect: "Password incorrect" });
                    }

                })
        })
    .catch (error => {
    return res.json({ usernamenotfound: "Username not found" });
});
}

//get request for fetching a specific user
const getuser = (req, res) => {
    User.find({ username: req.params.username }).exec()
    .then(data => {
        res.json({ Status :"Success", data : data});
    })
    .catch(err => {
        console.log("Failure:" + err);
    })
}

//put request for editing the profile of a user
const editprofile = (req, res) => {

    User.find({ username: req.params.username }).exec()
    .then(profile => {
        if (profile.length === 0) {
            res.json({Status:"Success", message: "The user does not exist in the database" });
        } else {
            User.updateOne({ username:  req.params.username }, { $set: { firstname: req.body.firstname, lastname: req.body.lastname, address: req.body.address }}).exec()
                .then(data => {
                    res.json({Status:"Success", message: "User modified" });
                })
                .catch(err => {
                    console.log("Failure in modifying the data:" + err);
                })
        }
    })
    .catch(err => {
        console.log("Error in fetching the data:" + err);
    })
}
module.exports.login = login;
module.exports.register = register;
module.exports.getuser = getuser;
module.exports.editprofile = editprofile;
