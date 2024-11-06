import UserModel from "../models/User.js";



export const generateAccountNumber = async () => {
    let accountNumber;
    let existingUser;

    do {
        accountNumber = Math.floor(100000000000 + Math.random() * 900000000000).toString();
        existingUser = await UserModel.findOne({ accountNumber });

    } while (existingUser);

    return accountNumber;
};