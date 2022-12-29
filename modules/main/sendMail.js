import nodemailer from "nodemailer";
import fs from "fs";
import * as dotenv from "dotenv";

dotenv.config();

export const sendMail = async (jobArray, timeout) => {
  //get the values from the .env file
  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;
  const name = process.env.NAME;
  const phone = process.env.PHONE;
  const facebook = process.env.FACEBOOK;
  const linkedin = process.env.LINKEDIN;
  const twitter = process.env.TWITTER;
  const profilePic = process.env.PROFILE_PIC;
  const skills = ["Websites", "Scraping", "Shopify", "Apps", "SEO", "Emails"];
  const emailTitleLine1 = "Happy Holidays!";
  const emailTitleLine2 = "Add me to your roster for 2023!";

  //await timeout to avoid spamming the email server
  await new Promise((resolve) => setTimeout(resolve, timeout * 2 + 1000));

  //email body message
  const message =
    "I'm a software developer who offers a range of services customized to meet the specific needs of your business. From creating a professional website to data scraping";
  //use the email.html file as a template for the email
  const template = fs.readFileSync("./email.html", "utf8");

  console.log("Nodemailer initialized 🏃‍♂️");
  //setTimeout to know when the emails are begining to be sent
  setTimeout(() => {
    console.log("Sending emails 📧");
  }, timeout * 2 + 1000);
  const transporter = nodemailer.createTransport({
    //login to your email account
    service: "gmail",
    auth: {
      user: `${email}`,
      pass: `${password}`,
    },
  });

  for (let i = 0; i < jobArray.length; i++) {
    //set timeout to avoid spamming the email server
    await new Promise((resolve) => setTimeout(resolve, timeout * 2 + 1000));

    if (
      jobArray[i].email !== null &&
      jobArray[i].email !== undefined &&
      jobArray[i].email.includes("@") &&
      !jobArray[i].email.includes("www.") &&
      !jobArray[i].email.includes("http")
    ) {

      //replace the placeholders in the email.html file with the job information
      const updatedTemplate = template
        .replace("{{emailTitleLine1}}", emailTitleLine1)
        .replace("{{emailTitleLine2}}", emailTitleLine2)
        .replace("{{name}}", name)
        .replace("{{name2}}", name)
        .replace("{{phone}}", phone)
        .replace("{{email}}", email)
        .replace("{{jobTitle}}", jobArray[i].jobTitle)
        .replace("{{business}}", jobArray[i].business)
        .replace("{{business2}}", jobArray[i].business)
        .replace("{{business3}}", jobArray[i].business)
        .replace("{{message}}", message)
        .replace("{{facebook}}", facebook)
        .replace("{{linkedin}}", linkedin)
        .replace("{{twitter}}", twitter)
        .replace("{{profilePic}}", profilePic)
        .replace("{{skills1}}", skills[0])
        .replace("{{skills2}}", skills[1])
        .replace("{{skills3}}", skills[2])
        .replace("{{skills4}}", skills[3])
        .replace("{{skills5}}", skills[4])
        .replace("{{skills6}}", skills[5]);

      const mailOptions = {
        from: `${name}`,
        to: `${jobArray[i].email}`,
        subject:
          "" +
          jobArray[i].jobTitle +
          " job position at " +
          jobArray[i].business +
          "",
        //use the index.html file as the email body and replace the placeholders with the job information
        html: updatedTemplate,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log(
            `Sent 📧 ${i} of ${jobArray.length} to ${jobArray[i].email}`
          );   
        }
      });
    } else {
      console.log('Email is invalid');
      //remove the job from the array
      jobArray.splice(i, 1);
      //decrement the index to avoid skipping a job
      i--;
    }
  }
};
