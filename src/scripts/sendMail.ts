// npx ts-node --project tsconfig.scripts.json -r tsconfig-paths/register ./src/scripts/sendMail.ts

import formData from "form-data";
import Mailgun from "mailgun.js";
import dotenv from "dotenv";
dotenv.config();

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API || "key-yourkeyhere",
});

console.log(`process.env.MAILGUN_API = ${process.env.MAILGUN_API}`);

// mg.domains
//   .get("lootbox.fans")
//   .then((domains) => console.log(domains)) // logs array of domains
//   .catch((err) => console.error(err)); // logs any error

mg.messages
  .create("lootbox.fans", {
    from: "Superlore AI <support@lootbox.fans>",
    to: ["kangzeroo@gmail.com"],
    subject: "TikToks about Korean BBQ",
    text: `I haven’t heard back from you. Yesterday I sent you a TikTok that went viral featuring NYC Korean BBQ restuarants. 

    Did you get a chance to watch it? If you did, please reply to this email so I know you got it.
    
    If you didn’t get it, let me know by replying to this email and I’ll re-send you as soon as possible.`,
  })
  .then((msg) => console.log(msg)) // logs response data
  .catch((err) => console.log(err)); // logs any error
