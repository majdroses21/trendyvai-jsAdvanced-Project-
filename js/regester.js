// Function: regesterClick()
// Description: Handles the user registration process when the user clicks the register button.
function regesterClick() {
    // Get the user input values from the registration form.
    let name = document.getElementById("nameInp").value;
    let usr = document.getElementById("usrInp").value;
    let psw = document.getElementById("paswInp").value;
    let profImg = document.getElementById("profImg").files[0];
    // Create a new FormData object to send the user data along with the profile image.
    let formData = new FormData();
    formData.append("name", name);
    formData.append("username", usr);
    formData.append("password", psw);
    formData.append("image", profImg); // takad 

    // Set the appropriate headers for the form data.
    let headers = {
        "Content-Type": "multipart/form-data"
    }

    // Define the URL for the registration API endpoint.
    const url = 'https://tarmeezacademy.com/api/v1/register';

    // Send a POST request to register the user with the provided data.
    axios.post(url, formData, { headers: headers })
        .then(resp => {
            // Handle the successful registration response.
            console.log(resp.data);
            // Save the user token and information to localStorage.
            localStorage.setItem("token", resp.data.token);
            localStorage.setItem("user", JSON.stringify(resp.data.user));

            // Display a success alert and redirect the user to the home page.
            showSuccessAlert("Welcome! You are a new registered user!");
            window.location.href = "home.html";
        })
        .catch(error => {
            // Handle any errors that occurred during the registration process.
            let message = error.response.data.message;
            console.log(error);
            // Display an error alert with the error message.
            showSuccessAlert(message, "danger");
        });
}
