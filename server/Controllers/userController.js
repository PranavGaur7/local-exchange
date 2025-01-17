const userModel = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const kartModel = require('../Models/kartModel');
const messageModel = require('../Models/messageModel')
module.exports.register = async function register(req, res) {
    try {
        let { username, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        const user = await userModel.create({ username, email, password })
        if (user) {
            let uid = user._id
            const kart = await kartModel.create({
                user:uid
            })
            console.log(kart);
            let token = jwt.sign({ payload: uid }, process.env.JWT_KEY);
            res.status(200).json({
                msg: "userCreated",
                user: user,
                auth:token
            })
        }
    }
    catch (err) {
        return res.json(err);
    }

}

module.exports.isLoggedIn = async function isLoggedIn(req, res) {
    try {
        const token = req.body.auth;
        const uid = jwt.verify(token, process.env.JWT_KEY).payload;
        const user = await userModel.findOne({ _id: uid });
        if (user) {
            res.json({ user: user, logged: true })
        }
        else {
            res.json({ logged: false })
        }
    } catch (error) {
        return res.json({ err: error })
    }
}
module.exports.getUser = async function getUser(req, res) {
    try {
        const token = req.header('auth-token');
        const user = await userModel.findOne({ _id:token });
        if (user) {
            return res.json({ user: user})
        }
        else {
            res.status(404).json({ msg:"user not found" })
        }
    } catch (error) {
        return res.json({ err: error })
    }
}
module.exports.profile = async function profile(req, res) {
    try {
        const token = req.header('auth-token');
        const uid = jwt.verify(token, process.env.JWT_KEY).payload;
        let user = await userModel.findOne({ _id: uid });
        if (user) {
            res.json({
                isLoggedIn:true,
                user: user
            })
        }
        else{
            res.json({
                isLoggedIn:false
            })
        }
    }
    catch (err) {
        console.log(err);
        return res.json({ error: err })
    }

}
module.exports.login = async function login(req, res) {
    try {
        let { username, password } = req.body;
        const user = await userModel.findOne({ username })
        if (user) {
            let confirm = await bcrypt.compare(password, user.password);
            if (confirm) {
                let uid = user._id
                let token = jwt.sign({ payload: uid }, process.env.JWT_KEY);
                
                res.json({
                    isLoggedIn:true,
                    user: user,
                    auth:token
                })
            }
            else {
                res.status(401).json("invalid password")
            }
        }
        else {
            res.status(404).json({ msg: "user Not fount" })
        }
    }
    catch (err) {
        return res.json(err);
    }
}

module.exports.addContact = async function addContact(req, res) {
    const { id1, id2, name1, name2, product, productName , role1, role2 } = req.body;
    console.log(productName);
    
    try {
        const user1 = await userModel.findOne({ _id: id1 });
        if (!user1) return res.status(404).json({ message: "User 1 not found" });
        let back = false;
        user1.contacts.map((item)=>{
            if(item.id==id2 && item.product==product) {
                back = true
            }
        })
        if(back) return res.json({message:"contact already exists"})
        const user2 = await userModel.findOne({ _id: id2 });
        if (!user2) return res.status(404).json({ message: "User 2 not found" });

        user1.contacts.push({ id: id2, name: name2, product, productName, role: role2 });
        user2.contacts.push({ id: id1, name: name1, product, productName, role: role1 });
 
        await user1.save();
        await user2.save();

        return res.json({ message: "Contact added successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Error saving user", error: err.message });
    }
}

module.exports.getContacts = async function getContacts(req,res){
    try {
        const {_id} = req.body;
        const user = await userModel.findOne({_id});
        if(!user) return res.status(404).json({message:"user not found"});
        return res.json(user.contacts);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching contacts", error: err.message });
    }
}

module.exports.addMessage = async function addMessage(req, res) {
    try {
        const { from, to, message } = req.body;
        const data = await messageModel.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        })
        
        if(data) return res.json({
            msg:"message added successfully",
            data:data
        })
        else return res.json({
            msg:"cannot add message successfully",
        })
    } catch (error) {
        return res.json(error);
    }
}

module.exports.getAllMesssage = async function getAllMesssage(req, res) {
    const {from,to} = req.body;
    
    const messages = await messageModel.find({
        users:{
            $all:[from,to],
        },
    }).sort({updatedAt:1});
    const projectMessages = messages.map((msg)=>{
        return{
            fromSelf: msg.sender.toString() === from,
            message: msg.message.text,
            time: msg.createdAt.toLocaleTimeString().replace(/:\d+\s/, ' '),
        };
    });
    res.json(projectMessages)
}
// module.exports.getAllUsers = async function getAllUsers(req, res) {
//     try {
//         const token = req.cookies.login;
//         const uid = jwt.verify(token, process.env.JWT_KEY).payload;
//         const allUser = await userModel.find({ _id: { $ne: uid } }).select([
//             "email", "username", "avatarImage", "_id"
//         ]);
//         let UserWithMessage = await Promise.all(allUser.map(async (user) => {
//             const msg = await messageModel.find({
//                 users: { $all: [user._id.toString(), uid] },
//                 sender: user._id
//             }).sort({ updatedAt: -1 }).limit(1);
        
//             let txt;
//             if(msg[0]){
//                 txt = msg[0].message.text;
//             }
//             else{
//                 txt = "my Last chat with me"
//             }
        
//             return {
//                 email: user.email,
//                 username: user.username,
//                 avatarImage: user.avatarImage,
//                 _id: user._id,
//                 message: txt
//             };
//         }));
//         return res.json(UserWithMessage)
//     } catch (error) {
//         return res.json({ err: error })
//     }
// }