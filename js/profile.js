// Function: getUser()
// Description: Retrieves user information based on the 'profileId' and displays it on the profile page.
function getUser() {
  let id = 1845;
  axios.get(`https://tarmeezacademy.com/api/v1/users/${profileId}`)
  .then(response =>{
      let user = response.data.data;
      // Update the profile page with user information.
      let mainUserUsername = document.getElementById("mainUsername");
      let mainUserName = document.getElementById("mainName");
      let mainUserImg = document.getElementById("mainImg");
      let mainUserposts = document.getElementById("mainPosts");
      mainUserUsername.innerHTML += user.username;
      mainUserName.innerHTML = user.name;
      mainUserposts.innerHTML = user.posts_count;
      mainUserImg.src = user.profile_image;
  })
}

// Call the 'getUser()' function to fetch and display the user information.
getUser();


// Function: getPosts()
// Description: Retrieves and displays posts for the user based on the 'profileId'.
function getPosts() {
  let id = 1845;
  togelLodar(true);
  axios.get(`https://tarmeezacademy.com/api/v1/users/${profileId}/posts`)
      .then(response => {
          togelLodar(false);
          let postsContainer = document.getElementById('prifilePosts');
          let posts = response.data.data;
          postsContainer.innerHTML = "";  
          for (post of posts) {
              // Show or hide Edite Button based on user login status and post ownership.
              let user = getCurentUser();
              // post Content
              let content = `
              <!-- Start Post -->
              <div class="col-4 moob" >
                  <img src="${post.image}" class="profile-posts-images img-fluid mt-2 mb-2" onclick="postClicked(${post.id})">
              </div>
              <!-- End Post -->
              `;
              postsContainer.innerHTML += content;
          }
      })
}

// Call the 'getPosts()' function to fetch and display the user's posts.
getPosts();
