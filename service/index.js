const Contact = require("./schemas/contact");
const User = require("./schemas/user");

/// Contacts

const getAllContacts = () => Contact.find();
const getContactById = (id) => Contact.findById(id);
const createContact = ({ name, email, phone }) =>
  Contact.create({ name, email, phone });
const removeContact = (id) => Contact.findByIdAndRemove(id);
const updateContact = ({ id, name, email, phone, favorite }) =>
  Contact.findByIdAndUpdate(id, { name, email, phone, favorite });
const getFavContacts = (favorite) => Contact.find({ favorite });

///Users

const getAllUsers = () => User.find();
const getUser = (email) => User.findOne({ email });
const updateUserSubscription = (email, subscription) =>
  User.findOneAndUpdate({ email }, { subscription });

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  removeContact,
  updateContact,
  getUser,
  getAllUsers,
  updateUserSubscription,
  getFavContacts,
};
