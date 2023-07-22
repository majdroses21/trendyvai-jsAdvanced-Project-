// This is the current page and last page variables used for infinite scroll pagination
let currentPage = 1;
let lastPage = 1;

//===== INFINITE SCROLL =======//
// Event listener for scrolling to trigger infinite scroll pagination
window.addEventListener("scroll", function(){
  // Check if the end of the page is reached
  const endOfPage = window.innerHeight + window.pageYOffset >= document.body.scrollHeight;
  
  // Debugging: Output current window position and document height
  console.log(window.innerHeight, window.pageYOffset, document.body.scrollHeight)
  
  // If the end of the page is reached and there are more pages to load
  if(endOfPage && currentPage < lastPage) {
    currentPage = currentPage + 1;
    getPosts(false, currentPage); // Fetch posts for the next page
  }
});
//=====// INFINITE SCROLL //=======//

// Function to get the user information from localStorage and return the user info
function getCurentUser() {
  let user = null;
  const storgUser = localStorage.getItem('user');
  
  // Parse the user data from localStorage
  if (storgUser != null) {
    user = JSON.parse(storgUser);
  }
  return user;
}

// Function to check if the user is logged in, and if not, redirect to the index.html page
function notLoged() {
  const token = localStorage.getItem("token");
  
  // If the user token is not found in localStorage, redirect to index.html
  if (token == null) {
    window.location.href = "index.html";
  } 
}
notLoged(); // Call the notLoged function to enforce the login requirement

// The rest of the code seems to be using the functions defined above and calling the getPosts function for the initial page load.
