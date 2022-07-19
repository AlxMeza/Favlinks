const bcrypt = require('bcryptjs');
const helpers = {};

helpers.encryptPassword = async (password) => {
    const hash = await bcrypt.genSalt(10);
    const encryptPassword = await bcrypt.hash(password, hash);
    return encryptPassword;
};

helpers.matchPassword = async (password, passwordHash) => {
    try{
        return await bcrypt.compare(password, passwordHash);
    }catch (e){
        console.error(e);
    }
};

module.exports = helpers;