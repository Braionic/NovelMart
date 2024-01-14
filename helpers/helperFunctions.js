const { isValidObjectId } = require("mongoose");
const nodemailer = require('nodemailer')

const isIdValid = (userId) => {
  console.log({ msg: userId, msg2: "testing" });
  const isValid = isValidObjectId(userId);
  if (!isValid) {
    return isValid
  }
};

const sendEmail = (data, req, res) =>{
const transport = nodemailer.createTransport({
  host: 'smtp.titan.email',
    port: 465,
    secure: true,
    auth: {
        user: 'admin@fedalogistics.co.za',
        pass: 'Welcome2@'
    },
    tls : { rejectUnauthorized: false }
})
console.log(data, "here we are")

const mailOption = {
  from: data.from,
  to: data.to,
  subject: "Password Reset",
  html: data.resetUrl
}
transport.sendMail(mailOption, (err, data)=>{
  if(err){
    console.log(err, " this is the error from the email")
  }else{
    console.log(data, "this is from the email")
  }
})

}
module.exports = {isIdValid, sendEmail}