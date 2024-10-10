const express = require("express");
const app = express();

//Middle to parse JSON requests
app.use(express.json());

let users = [];

// Create account - Post
app.post("/create-account", (req, res) => {
  // Declaring the variables
  //req.body means it woulkd be entered in the body
  const { name, password } = req.body;

  // Now we declare what we have entered in the body to a new variable user
  const user = { name, password };

  // Created this other variable so that i can add the id.
  const newUser = {
    id: users.length + 1,
    name: user.name,
    password: user.password,
  };

  // Function to add the new user
  users.push(newUser);
  res.status(201).json(newUser);
});

// Sign In - Get
app.get("/sign-in/:id", (req, res) => {
  // Setting the variable user to hold a specific user
  const user = users.find((u) => u.id === parseInt(req.params.id));

  // We declare it and say request bedy because it would be entered dynamically
  const { name, password } = req.body;

  // If the user is found, return the user
  if (user) {
    // Check if the password is correct
    if (user.name === name && user.password === password) {
      res.status(200).json({ message: " Valid Credentials", user: user });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } else {
    // If the user is not found, return a 404 status code
    res.status(404).json({ message: "User not found" });
  }
});

// Change password - Put
app.put("/change-password/:id", (req, res) => {
  // We declare it and say request bedy because it would be entered dynamically
  const { password } = req.body;

  // find the user with that specific id
  const user = users.find((u) => u.id === parseInt(req.params.id));

  //Confirm if password has been succcessfully changed
  if (user) {
    user.password = password;
    res
      .status(200)
      .json({ message: "Password changed successfully", user: user });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Delete Account - Delete
app.delete("/delete-account/:id", (req, res) => {
  // Find the user with that specific id
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (user) {
    // Remove the user from the array
    users = users.filter((u) => u.id !== parseInt(req.params.id));
    res
      .status(200)
      .json({ message: "Account deleted successfully", user: user });
  } else {
    // If the user has already been deleter or cannot be found say this
    res.status(404).json({ message: "User not found" });
  }
});

//Specifiying teh porty you want it to run on
const PORT = 3000;

// Telling the program to listen for that port
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
