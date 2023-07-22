// Function to create a new post or update an existing one
creatClick = () => {
    // Get the post ID and check if it's a new post or an update
    let postId = document.getElementById("postHid").value;
    let isCreate = postId == null || postId == "";

    // Get the post title, body, and image from the input fields
    let title = document.getElementById("titleInp").value;
    let body = document.getElementById("postContent").value;
    let img = document.getElementById("imgInp").files[0];

    // Create a FormData object to send the data as multipart/form-data
    let formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("image", img);

    // Get the user token from local storage
    const token = localStorage.getItem("token");

    // Set the API URL and headers
    const url = ``; // Empty URL placeholder (seems like an error)
    const headers = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
    };

    if (isCreate) {
        // If it's a new post, send a POST request to create the post
        const url = 'https://tarmeezacademy.com/api/v1/posts';
        axios.post(url, formData, { headers: headers })
            .then(resp => {
                // Success callback
                const modal = document.getElementById("creatModal");
                const modalinstance = bootstrap.Modal.getInstance(modal);
                modalinstance.hide();

                showSuccessAlert("New Post has been Created", "success");
                getPosts(false, currentPage);
            }).catch(error => {
                // Error callback
                let message = error.response.data.message
                console.log(error);
                showSuccessAlert(message, "danger");
            });
    } else {
        // If it's an existing post, send a POST request to update the post
        const url = `https://tarmeezacademy.com/api/v1/posts/${postId}`;
        formData.append("_method", "put");
        axios.post(url, formData, { headers: headers })
            .then(resp => {
                // Success callback
                const modal = document.getElementById("creatModal");
                const modalinstance = bootstrap.Modal.getInstance(modal);
                modalinstance.hide();

                showSuccessAlert("New Post has been Created", "success");
                getPosts(false, currentPage);
            }).catch(error => {
                // Error callback
                let message = error.response.data.message
                console.log(error);
                showSuccessAlert(message, "danger");
            });
    }
};

/****************************************************************************************************** */

// Function to handle the click on the Edit button (Three Dots button)
function editePostBtnClicked(postObject) {
    // Parse the postObject and retrieve the post data
    let postH = JSON.parse(decodeURIComponent(postObject));
    console.log(postH);

    // Fill the edit modal with the post data
    document.getElementById("postHid").value = postH.id;
    let Creat = document.getElementById("creatModal");
    document.getElementById("CreatModalLabel").innerHTML = "Edit post";
    document.getElementById("postModalSubmitEdit").innerHTML = "update";
    document.getElementById("titleInp").value = postH.title;
    document.getElementById("postContent").value = postH.body;

    // Show the edit modal
    let postModal = new bootstrap.Modal(Creat, {});
    postModal.toggle();
}

// Function to handle the click on the Delete button (Three Dots button)
function deletPostBtnClicked(postObject) {
    // Parse the postObject and retrieve the post data
    let postH = JSON.parse(decodeURIComponent(postObject));
    console.log(postH);

    // Set the post ID to the delete modal
    delId = document.getElementById("deletId").value = postH.id;

    // Show the delete modal
    let delet = document.getElementById("deletModal");
    let postModal = new bootstrap.Modal(delet, {});
    postModal.toggle();
}

// Function to confirm the deletion of a post
function comfirmDeletPostModal() {
    console.log(delId);

    // Get the user token from local storage
    const token = localStorage.getItem("token");

    // Set the headers
    const headers = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
    };

    // Set the delete URL
    const url = `https://tarmeezacademy.com/api/v1/posts/${delId}`;

    // Send a DELETE request to delete the post
    axios.delete(url, { headers: headers })
        .then(resp => {
            // Success callback
            showSuccessAlert("The Post Has Been Deleted", "success");
            getPosts();
        }).catch(error => {
            // Error callback
            let message = error.response.data.message
            console.log(error);
            showSuccessAlert(message, "danger");
        });
}

// Function to handle the click on the "Add" button
function addBtnClicked() {
    // Clear the post ID and input fields
    document.getElementById("postHid").value = "";
    let Creat = document.getElementById("creatModal");
    document.getElementById("CreatModalLabel").innerHTML = "Creat A New Post";
    document.getElementById("postModalSubmitEdit").innerHTML = "Post";
    document.getElementById("titleInp").value = "";
    document.getElementById("postContent").value = "";

    // Show the create modal
    let postModal = new bootstrap.Modal(Creat, {});
    postModal.toggle();
}

// This comment was provided by the user but isn't attached to a specific function.
// It seems like a comment to be placed somewhere in the HTML code.
// ​<button class='btn btn-secondary' style='float: right' onclick="editePostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')">edit</button>
