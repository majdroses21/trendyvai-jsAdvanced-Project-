// Function for user login
function log() {
    // Get the username and password input values from the HTML form
    let usr = document.getElementById("usern").value;
    let psw = document.getElementById("pass").value;
  
    // Create a parameter object with the username and password
    let params = {
      "username": usr,
      "password": psw
    };
  
    // API URL for login
    const url = 'https://tarmeezacademy.com/api/v1/login';
  
    // Make a POST request to the API with the login credentials
    axios.post(url, params)
      .then(resp => {
        console.log(resp.data.user); // Log the response data (optional)
        
        // Store the token in localStorage
        localStorage.setItem("token", resp.data.token);
        localStorage.setItem("user", JSON.stringify(resp.data.user));
        // Show a success alert for successful login
        showSuccessAlert("Login success!", "success");
  
        // Redirect to the home.html page after successful login
        window.location.href = "home.html";
      }).catch(error => {
        let message = error.response.data.message; // Get the error message from the response
        console.log(error); // Log the error (optional)
  
        // Show an error alert with the error message
        showSuccessAlert(message, "danger");
      });
  }
  