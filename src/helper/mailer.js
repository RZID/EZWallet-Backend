const mailjet = require("node-mailjet").connect(
  `${process.env.TOKEN_MAIL_1}`,
  `${process.env.TOKEN_MAIL_2}`
);
module.exports = {
  register: (mail, username, secret) => {
    const mailer = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.FROM_MAIL,
            Name: "Admin EZWallet",
          },
          To: [
            {
              Email: mail,
              Name: username,
            },
          ],
          Subject: "Verify your account! - ",
          HTMLPart: `<h4>Hello, ${username}!</h4><p>To verify your account, please click : </p><p><a href="${process.env.FRONTEND_PATH}/activate/${secret}/${mail}">This Link</a></p>`,
          CustomID: "AppGettingStartedTest",
        },
      ],
    });
    return new Promise((resolve, reject) => {
      mailer
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
