const express = require("express");
const router = express.Router();
const ctrlContacts = require("../controller/ctrlContacts.js");
const ctrlUsers = require("../controller/ctrlUsers.js");

router.get("/contacts", ctrlContacts.getAll);
router.get("/contacts/:id", ctrlContacts.getById);
router.post("/contacts", ctrlContacts.addContact);
router.delete("/contacts/:id", ctrlContacts.removeContactById);
router.put("/contacts/:id", ctrlContacts.updateContact);
router.patch("/contacts/:id/favorite", ctrlContacts.updateStatus);

router.post("/users/signup", ctrlUsers.registerUser);
router.get("/users", ctrlUsers.getAllUsers);
router.post("/users/login", ctrlUsers.loginUser);

module.exports = router;
