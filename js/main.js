// Get one Post Function
// This function retrieves parameters from the URL.
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("postId");
const profileId = urlParams.get("profileId");

// Get the current user information from localStorage and display it on the page.
let user = getCurentUser();
document.getElementById("slidUsername").innerHTML = user.name;
document.getElementById("navImgSlid").setAttribute("src", user.profile_image);
document.getElementById("navImg").setAttribute("src", user.profile_image);


// Function: getCurentUser()
// Description: Retrieves the user information from localStorage and returns the user info.
function getCurentUser() {
    let user = null;
    const storgUser = localStorage.getItem('user');
    if (storgUser != null) {
        user = JSON.parse(storgUser);
    }
    return user;
}


// Function: showSuccessAlert(custemMessage, typ)
// Description: Shows an alert with custom message and type (success or danger).
function showSuccessAlert(custemMessage, typ) {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    const alert = (message, type) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('');

        alertPlaceholder.append(wrapper);
    };
    alert(custemMessage, typ);

    // todo: fix hide/show alert problem
}


// Function: postClicked(postId)
// Description: Takes the user to the post details page based on the postId.
function postClicked(postId) {
    window.location = `postDetels.html?postId=${postId}`;
}


// Function: goUserprofile(profileId)
// Description: Takes the user to the profile page based on the profileId.
function goUserprofile(profileId) {
    window.location.href = `profile.html?profileId=${profileId}`;
}


// Function: goMyProfile()
// Description: Takes the user to their own profile page.
function goMyProfile() {
    const user = getCurentUser();
    const userId = user.id;
    window.location = `profile.html?profileId=${userId}`;
}


// Function: togelLodar(shwo = true)
// Description: Toggles the visibility of the loader element.
function togelLodar(shwo = true) {
    let loader = document.getElementById("loader");

    if (shwo) {
        loader.style.visibility = "visible";
    } else {
        loader.style.visibility = "hidden";
    }
}


// Function: copyURL()
// Description: Copies the current page URL to the clipboard.
function copyURL() {
    // Get the href link
    var url = document.location.href;

    // Create a temporary element to copy the URL
    var tempInput = document.createElement('input');
    tempInput.value = url;
    document.body.appendChild(tempInput);

    // Select the text in the temporary element
    tempInput.select();

    try {
        // Copy the text
        var successful = document.execCommand('copy');
        var message = successful ? 'Copied Successfully' : 'Copy failed';
        alert(message);
    } catch (err) {
        console.log(err);
        alert('Some Error in Copying!');
    }

    // Delete the temporary element
    document.body.removeChild(tempInput);
}
