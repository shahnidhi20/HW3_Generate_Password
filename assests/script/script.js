// Assignment code here
function generatePassword() {
  var randomPass = "";
  //ask the user the length of the password.
  var passMaxLength = prompt(
    "Please enter the length of password betwen 8 to 128"
  );

  // validate the lenght of the password to be between 8 to 128.
  // if not then prompt the user to enter it again between 8 to 128
  passMaxLength = validateLength(passMaxLength);

  if (passMaxLength === 0 || passMaxLength < 8 || passMaxLength > 129) {
    alert("Please start over again");
    return randomPass;
  }

  var isLowercase = confirm("Password has lowercase letters?");
  var isUpperCase = confirm("Password has uppercase letters?");
  var isNumeric = confirm("Password has numbers?");
  var isSpecial = confirm("Password has special characters?");

  console.log(
    `Selections made by User: UpperCase Letters ${isUpperCase}, LowerCase Letters ${isLowercase}, Numbers ${isNumeric}, Special Charac ${isSpecial} `
  );

  if (validateChoices(isLowercase, isUpperCase, isNumeric, isSpecial)) {
    randomPass = getRandomPassword(
      passMaxLength,
      isLowercase,
      isNumeric,
      isSpecial,
      isUpperCase
    );
  } else {
    //if no selections made by user then cannot generate the password
    return randomPass;
  }

  return randomPass;
}

//Validated the selections made by the user
function validateChoices(isLowercase, isUpperCase, isNumeric, isSpecial) {
  if (!isLowercase && !isUpperCase && !isNumeric && !isSpecial) {
    alert("No Selection criteria defined. Please start over again");
    return false; //if no selections made by user then cannot generate the password
  } else {
    return true;
  }
}
//validates the password length should be greater then 0 and between 8 to 128 characters
function validateLength(passMaxLength) {
  if (passMaxLength == 0 || passMaxLength < 8 || passMaxLength > 129) {
    alert("Password length must be between 8 to 128");
    passMaxLength = prompt(
      "Please enter the length of password betwen 8 to 128"
    );
  }

  return passMaxLength;
}

/* 
based on the selections/choices made by user this method with 
find the random characters and create the string of lenght defined by user
*/
function getRandomPassword(
  maxLength,
  isLowercase,
  isNumeric,
  isSpecial,
  isUpperCase
) {
  let passwordgenerated = "";
  //special characters
  let specialChar = isSpecial ? "!#$%&'()*+,-./:;<=>?@[\\]^_`{|}~" : "";
  //numbers
  let numbers = isNumeric ? "1234567890" : "";
  //lowercase letters
  let lowercaseChar = isLowercase ? "abcdefghijklmnopqrstuvwxyz" : "";
  //uppercase letters
  let uppercaseChar = isUpperCase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "";

  //choices will be joined and convert to an array
  var passwordChoices = lowercaseChar + numbers + specialChar + uppercaseChar;
  passwordChoices = passwordChoices.split("");
  console.log("Choices " + passwordChoices);

  for (var j = 0; j < maxLength; j++) {
    //get the random index from the password choices
    var index = Math.floor(Math.random() * passwordChoices.length);
    //retrieves the char placed at that index.
    passwordgenerated += passwordChoices[index];
  }
  return passwordgenerated;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Get references to the #copyClipboard element
var copyBtn = document.querySelector("#copyClipboard");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

//copies the generated password to the clipboard
function copytoClipboard() {
  var passwordText = document.querySelector("#password");
  //checks if browser supports navigator
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(passwordText.value)
      .then(() => alert("copied to clipboard"));
  } else {
    document.execCommand(passwordText.value);
  }
}

// Add event listener to generate and Copy button
generateBtn.addEventListener("click", writePassword);
copyBtn.addEventListener("click", copytoClipboard);
