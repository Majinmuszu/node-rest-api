const express = require("express");
const { auth } = require("../helpers/auth.js");
const multer = require("multer");
const ctrlContacts = require("../controller/ctrlContacts.js");
const ctrlUsers = require("../controller/ctrlUsers.js");
const router = express.Router();
const storage = multer.diskStorage({
  destination: "tmp/",
  filename: (req, file, cb) => cb(null, file.originalname),
  limits: { fileSize: 1 * 1000000 },
});
const upload = multer({ storage });

/// CONTACTS ROUTES

router
  .get("/contacts", auth, ctrlContacts.getAll)
  .get("/contacts/:id", auth, ctrlContacts.getById)
  .post("/contacts", auth, ctrlContacts.addContact)
  .delete("/contacts/:id", auth, ctrlContacts.removeContactById)
  .put("/contacts/:id", auth, ctrlContacts.updateContact)
  .patch("/contacts/:id/favorite", auth, ctrlContacts.updateStatus);

//// USERS ROUTES

router
  .get("/users", ctrlUsers.getAllUsers)
  .post("/users/signup", ctrlUsers.registerUser)
  .post("/users/login", ctrlUsers.loginUser)
  .get("/users/logout", auth, ctrlUsers.logoutUser)
  .get("/users/current", auth, ctrlUsers.currentUser)
  .patch("/users", auth, ctrlUsers.updateUserSub)
  .patch(
    "/users/avatars",
    auth,
    upload.single("avatar"),
    ctrlUsers.updateAvatar
  )
  .get("/users/verify/:verificationToken", ctrlUsers.verifyUser)
  .post("/users/verify", ctrlUsers.resendVerificationMail)

module.exports = router;
