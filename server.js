// server/server.js

const express = require("express");
const nodemailer = require('nodemailer');
const app = express();
const PORT = 8082;
const cors = require('cors')
const dbConnection = require("./db/connection")
const contactModel = require("./modal/contact.modal")
const signupModal = require("./modal/signup.modal")
const userdataModal = require("./modal/user.modal")
const bcrypt = require("bcryptjs");
// const { v4: uuidv4 } = require('uuid');
const {createSecretToken}= require("./SecretToken")


// app.use(express.json())


app.use(cors());

dbConnection();
app.use(express.json())

app.get("/", (req, res) => {
  res.json({
    message: "Hello from server! Ammad"
  });
});
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


// GET API
    // GET endpoint to fetch contact information
    app.get('/contactus', async (req, res) => {
      try {
        // Fetch all contact information from the database
        const contacts = await contactModel.find();

        res.status(200).json(contacts);
      } catch (error) {
        console.error('Error fetching contact information:', error);
        res.status(500).json({
          error: 'Internal Server Error'
        });
      }
    });

//post method for contact us
app.post('/contactus', async (req, res) => {
  try {
    const {
      name,
      email,
      message
    } = req.body;
    console.log(req.body, "Body")
    // Create a new ContactUs instance
    const newContact = new contactModel({
      name,
      email,
      message,
    });
    // Save the new contact to the database
    const savedContact = await newContact.save();
    console.log(savedContact, "Ammad")
    res.status(201).json(savedContact);
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});

//post method for Userdata
app.post('/userdata', async (req, res) => {
  console.log("response",req)
  try {
    const {
      title,
      email,
      username,
      firstname,
      lastname,
      num,
    } = req.body;
    console.log(req.body, "Body")
    // Create a new Userdata instance
    const newUser = new userdataModal({
      title,
      email,
      username,
      firstname,
      lastname,
      num,
    });
    // Save the new contact to the database
    const savedUser = await newUser.save();
    console.log(savedUser, "Ammad")
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error creating User:', error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});


// get the user info data
app.get('/userdata/:id', async (req, res) => {
  try {
    // Fetch all contact information from the database
    // Extract the user ID from the request parameters
    const { id } = req.params;

    // Use findById to fetch the user by ID
    const user = await userdataModal.findById(id);

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching userdata information:', error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});

app.get('/userdata', async (req, res) => {
  try {
    // Fetch all contact information from the database
    // Extract the user ID from the request parameters

    // Use findById to fetch the user by ID
    const user = await userdataModal.find();

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching userdata information:', error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});

// edit and update function
app.put('/modal/:id', async (req, res) => {
  try {
    // Fetch all contact information from the database
    // Extract the user ID from the request parameters
    const  id  = req.params.id;
    console.log("Received ID:", id);
    const updated_data = req.body;
    console.log("updated_data",updated_data)

    // Use findById to fetch the user by ID
    const userdata = await userdataModal.findByIdAndUpdate(id, updated_data, { new: true });

    res.status(200).json(userdata);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});


app.delete('/userdata/:id', async (req, res) => {
  try {
    // Fetch all contact information from the database
    // Extract the user ID from the request parameters
    const  id  = req.params.id;
    console.log("Received ID:", id);
    // const updated_data = req.body;
    // console.log("updated_data",updated_data)

    // Use findById to fetch the user by ID
    const userdata = await userdataModal.findByIdAndDelete(id, { new: true });

    res.status(200).json(userdata);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});

//post method for signup-page
app.post('/signup', async (req, res) => {
  try {
    const {
      username,
      email,
      password
    } = req.body;
    console.log(req.body, "Body")

    // diblicate email from DB checker
    const existingUser = await signupModal.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });

    }
    // Create a new signup instance
    const newSignup = new signupModal({
      username,
      email,
      password,
    });

    // Save the new signup to the database
    const savedSignup = await newSignup.save();
    console.log(savedSignup, "Ammad")
    res.status(201).json(savedSignup);
  } catch (error) {
    console.error('Error creating signup:', error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});

// get the sign up data
app.get('/profile/:id', async (req, res) => {
  try {
    // Fetch all contact information from the database
    // Extract the user ID from the request parameters
    const { id } = req.params;

    // Use findById to fetch the user by ID
    const user = await signupModal.findById(id);

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching contact information:', error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});

// update the user data which is coming from DB
app.put('/profile/:id', async (req, res) => {
  try {
    // Fetch all contact information from the database
    // Extract the user ID from the request parameters
    const { id } = req.params;
    const updated_data = req.body;
    console.log("updated_data",updated_data)

    // Use findById to fetch the user by ID
    const userdata = await signupModal.findByIdAndUpdate(id, updated_data, { new: true });

    res.status(200).json(userdata);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});






//post method for login-page
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if( !email || !password){
      return res.json({message:'All fields are required'})
    }
    const user = await signupModal.findOne({ email });
    if(!user){
      return res.json({message:'Incorrect  email' })
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.json({message:'Incorrect password ' })
    }
     const token = createSecretToken(user._id);
     res.cookie("token", token, {
       withCredentials: true,
       httpOnly: false,
     });
     res.status(201).json({ message: "User logged in successfully", "token":token,user: user, success: true });
    //  next()
  } catch (error) {
    console.error(error);
  }
});


const sendPasswordResetEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ammad.baber10@gmail.com', // replace with your Gmail email
      pass: 'Aammad@100', // replace with your Gmail password
    },
  });

  const mailOptions = {
    from: 'ammad.baber10@gmail.com',
    to: email,
    subject: 'Password Reset',
    text: `Click the following link to reset your password: http://localhost:3000/reset-password/${token}`,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', result);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  // Check if the user exists in your database
  console.log("fhdjhdjfbdjhfbdjbfkdfbndfknd");

  const user = await signupModal.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  else{
    
  }

  // Generate a unique token for the user (you may want to add expiration)
  const token = createSecretToken({ userId: user._id }, 'your-secret-key');

  // const token = createSecretToken(user._id);

  // Send the password reset link to the user's email
  // You need to implement the email sending logic

  sendPasswordResetEmail(email, token);

  res.status(200).json({ message: 'Password reset email sent' });
});


app.get("/dashboard",async(req,res)=>{
  try{
const users=await userdataModal.countDocuments();
res.json({users})

  }
  catch(err){
    console.log(err)
  }
})
