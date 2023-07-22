// Function for user logout
function logOut() {
    // Remove the user token and user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  
    // Show a success alert to notify the user about successful logout
    showSuccessAlert("You have been logged out", "success");
  
    // Redirect the user to the "index.html" page after logging out
    window.location.href = "index.html";
  }
  