// Function to get posts from the API
function getPosts(relod = true, page = 1) {
  togelLodar(true); // Show loading spinner

  // API call to fetch posts
  axios.get(`https://tarmeezacademy.com/api/v1/posts?limit=5&page=${page}`)
    .then(response => {
      togelLodar(false); // Hide loading spinner
      lastPage = response.data.meta.last_page; // Store the last page number

      let postsContainer = document.getElementById('posts'); // Get the container to display posts
     
      let posts = response.data.data; // Extract the posts data from the response

      for (post of posts) {

        // Check if the post belongs to the current user for edit and delete options
        let user = getCurentUser();
        let isMyPost = user != null && post.author.id == user.id;
        let editButtonContent = ``;
        let deletButtonContent = ``;
        if (isMyPost) {
          editButtonContent = `<button class="dotDet" onclick="editePostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')"> Edit </button> <hr>`;
          deletButtonContent = `<button class="dotDet" style="color: #dc3545 !important;" onclick="deletPostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')"> Delete</button> <hr>`;
        }

        let PostTitle = "";
        if (post.title != null) {
          PostTitle = post.title;
        }
        // Post Content

        let content = `
        <!-- Start Post -->
                    
        <div class="card shadow mt-2 mb-2">
            <div class="card-header">
                <span onclick="goUserprofile(${post.author.id})" style="cursor: pointer;" >
                <img src="${post.author.profile_image}" style="width: 40px; height: 40px;" class="img-fluid rounded-circle">
                <span> @${post.author.username}</span>
                </span>
              <button style="all: unset; cursor: pointer;" class="btn float-end mt-2 " id="dotsBtn"><i class="bi bi-three-dots"></i> </button>
            </div>
            <div class="card-body">
            <h6 class="" style="color: rgb(139, 139, 139);"> ${post.created_at}</h6>
              <img src="${post.image}" class="card-img">
              <h5 class="mt-3"> ${PostTitle} </h5>
              <p>
                ${post.body}
              </p>
              <hr>
              <span id="postTags${post.id}">
                   
              </span>
                
              <hr>
              <div class="d-flex justify-content-evenly">
              <div style="cursor: pointer;">
                  <i class="bi bi-balloon-heart"></i> 
                  <span class="me-2"> Love</span>
              </div>
              <div style="cursor: pointer;"  onclick="postClicked(${post.id})">
                  <i class="bi bi-chat-fill"></i>
                  <span> (${post.comments_count}) comments </span> 
              </div>
              <div style="cursor: pointer;">
                  <i class="bi bi-rocket-takeoff"></i>
                  <span>Share</span>
              </div>
            </div>
            </div>
          </div>
        <!-- End Post -->
        <!-- Dots Model Start =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-->
        <div class="Dots-modal visually-hidden" id="dotsModal">
                      <div class="modal-dialog">
                <div class="modal-content">
                              <div class="modal-body text-center">
                                    ${deletButtonContent}
                                  
                                     ${editButtonContent}
                                  
                                  <button class="dotDet" onclick="postClicked(${post.id})"> Go to The Post</button>
                                  <hr>
                                  <button class="dotDet"> Share</button>
                                  <hr>
                                  <button class="dotDet" type="button" id="cancel"> Cancel</button>
                              </div>
                          </div>
                      </div>
                  </div>
                  <!-- Dots Model End=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- -->
`;

        postsContainer.innerHTML += content; // Append the post content to the container
        document.getElementById(`postTags${post.id}`).innerHTML = ""; // Clear previous tag content

        if (relod == true) {
          postsContainer.innerHTML = ""; // Clear the container if reload is true
        }

        // Loop through post tags and add them to the post
        for (tag of post.tags) {
          console.log(tag.name); // Log the tag name to the console (optional)

          let tagsContent = `
            <button class="btn btn-sm rounded-5 m-1" style="background-color:gray; color: #fff;"> # ${tag.name}</button>
            `;
          document.getElementById(`postTags${post.id}`).innerHTML += tagsContent;
        }

        // Event listeners for the dots button and cancel button
        let dot = document.querySelectorAll("#dotsBtn");
        let modal = document.getElementById("dotsModal");
        let cancel = document.getElementById("cancel");

        dot.forEach(item => {
          item.addEventListener("click", () => {
            modal.classList.toggle("visually-hidden");
          });
        });

        cancel.addEventListener("click", () => {
          modal.classList.toggle("visually-hidden");
        });
      }
    });
}

// Call the function to get posts
getPosts(false, currentPage);
