const Contact = require("./schemas/contact");

const getAllContacts = () => Contact.find();
const getContactById = (id) => Contact.findById(id);
const createContact = ({ name, email, phone }) =>
  Contact.create({ name, email, phone });
const removeContact = (id) => Contact.findByIdAndRemove(id);
const updateContact = ({ id, name, email, phone, favorite }) =>
  Contact.findByIdAndUpdate(id, { name, email, phone, favorite });

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  removeContact,
  updateContact,
};