const express = require("express");
const { auth } = require("../helpers/auth.js");
const router = express.Router();
const ctrlContacts = require("../controller/ctrlContacts.js");
const ctrlUsers = require("../controller/ctrlUsers.js");

router.get("/contacts", auth, ctrlContacts.getAll);
router.get("/contacts/:id", auth, ctrlContacts.getById);
router.post("/contacts", auth, ctrlContacts.addContact);
router.delete("/contacts/:id", auth, ctrlContacts.removeContactById);
router.put("/contacts/:id", auth, ctrlContacts.updateContact);
router.patch("/contacts/:id/favorite", auth, ctrlContacts.updateStatus);

router.post("/users/signup", ctrlUsers.registerUser);
router.get("/users", ctrlUsers.getAllUsers);
router.post("/users/login", ctrlUsers.loginUser);
router.get("/users/logout", auth, ctrlUsers.logoutUser)
router.get("/users/current", auth, ctrlUsers.currentUser)

module.exports = router;
