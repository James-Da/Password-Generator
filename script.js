// Selecting DOM elements
const lengthSlider = document.querySelector(".pass-length input");
const generateBtn = document.querySelector(".generate-btn");
const copyIcon = document.querySelector(".input-box span");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const options = document.querySelectorAll(".option input");

// Defining character options for password generation
const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()",
};

// Function for generating a random password based on selected options
const generatePassword = () => {
  let staticPassword = ""; // The password will consist of these characters
  let randomPassword = ""; // The final password generated

  let excludeDuplicate = false; // Whether to exclude duplicate characters

  const passLength = lengthSlider.value; // Get the length of the password from the slider

  // Loop through each option (lowercase, uppercase, numbers, symbols)
  options.forEach((option) => {
    if (option.checked) {
      // If the option is checked
      if (option.id !== "exc-dupicate" && option.id !== "spaces") {
        // If the option is not for excluding duplicates or spaces
        staticPassword += characters[option.id]; // Add the characters for the selected option to the static password
      } else if (option.id === "spaces") {
        // If the option is for including spaces
        staticPassword += ` ${staticPassword} `; // Add a space to the static password
      } else {
        // If the option is for excluding duplicates
        excludeDuplicate = true; // Set excludeDuplicate to true
      }
    }
  });

  // Loop through each character in the password and add a random character from the static password
  for (let i = 0; i < passLength; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];

    // If excluding duplicates, only add the character if it's not already in the password or if it's a space
    if (excludeDuplicate) {
      !randomPassword.includes(randomChar) || randomChar == " "
        ? (randomPassword += randomChar)
        : i--;
    } else {
      // Otherwise, just add the random character
      randomPassword += randomChar;
    }
  }
  passwordInput.value = randomPassword; // Set the value of the password input to the generated password
};

// Function for updating the password indicator based on the length of the password
const updatePassIndicator = () => {
  // Set the indicator ID based on the length of the password
  passIndicator.id =
    lengthSlider.value <= 8
      ? "weak"
      : lengthSlider.value <= 16
      ? "medium"
      : "strong";
};

// Function for updating the slider and generating a new password
const updateSlider = () => {
  document.querySelector(".pass-length span").innerText = lengthSlider.value; // Set the value of the length indicator
  generatePassword(); // Generate a new password
  updatePassIndicator(); // Update the password indicator
};

// Function for copying the password to the clipboard
const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value); // Copy the password to the clipboard
  copyIcon.innerText = "Check"; // Set the text of the copy icon to "Check"

  // Set the text of the copy icon back to "copy_all" after a delay
  setTimeout(() => {
    copyIcon.innerText = "copy_all";
  }, 1300);
};

// Add event listeners to the slider, generate button, copy button, and option checkboxes
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
copyIcon.addEventListener("click", copyPassword);
options.forEach((option) => {
  option.addEventListener("change", generatePassword);
});
