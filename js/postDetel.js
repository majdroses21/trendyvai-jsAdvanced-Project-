function getPost() {
    togelLodar(true);
    axios.get(`https://tarmeezacademy.com/api/v1/posts/${id}`)
        .then(response => {
            togelLodar(false);
            let post = response.data.data;

            //Comments 
            //get The Comments For Curnt Post Clecked
            let comments = post.comments;
            let CommentContent = ``;
            for (uComment of comments) {
                CommentContent += `
                <!-- Comment -->
                <hr>
               <div class="comment">
                  <div class="comment-avatar">
                    <img src="${uComment.author.profile_image}" alt="User Avatar" onclick="goUserprofile(${uComment.author.id})">
                  </div>
                  <div class="comment-content">
                    <div class="comment-bubble">
                      <h4 class="comment-author"> ${uComment.author.name} </h4>
                      <p class="comment-text"> ${uComment.body} </p>
                    </div>
                    <span class="comment-date"> ${uComment.author.created_at}</span>
                  </div>
                </div>
                
               <!--// Comment // -->
                `;
            }

            //  Shwo Author Post Name
            let usersPost = document.getElementById("userPost");
            usersPost.innerHTML += post.author.name;
            // if The post Dont have a title Shwo empty String
            let PostTitle = ""
            if (post.title != null) {
                PostTitle = post.title;
            }

            //show || hide Edite Button 
            // if the Post not For The Loged User = Don't Show The Edite & Delete Btn
            let user = getCurentUser();
            let isMyPost = user != null && post.author.id == user.id
            let editButtonContent = ``
            let deletButtonContent = ``
            if (isMyPost) {
                editButtonContent = `<button class="dotDet" onclick="editePostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')"> Edite </button> <hr>`
                deletButtonContent = `<button class="dotDet" style="color: #dc3545 !important;" onclick="deletPostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')"> Delet</button> <hr>`
            }



            // The html Post Cods
            let PostContent = `
            <!-- Start Post -->
                    <div class="card shadow ">
                        <div class="card-header">
                        <span onclick="goUserprofile(${post.author.id})">
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
                            <div class="d-flex justify-content-evenly ">
                                <div style="cursor: pointer;">
                                    <i class="bi bi-balloon-heart"></i>
                                    <span class="me-2"> Love</span>
                                </div>
                                <div style="cursor: pointer;">
                                    <i class="bi bi-chat-fill"></i>
                                    <span> (${post.comments_count})comments </span>
                                </div>
                                <div style="cursor: pointer;">
                                    <i class="bi bi-rocket-takeoff"></i>
                                    <span>Share</span>
                                </div>
                            </div>
                            <div id="commemtsContainerContent">
                                ${CommentContent}
                            </div>
                            <hr>
                            <div class="comment-input mb-2" id="tkhidding">
                                <textarea placeholder="Add a comment..." id="textOfComment"   dir="auto"></textarea>
                                <button class="post-button " style="top: 30px;" onclick="postCommentClick()">Post</button>
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
                                                                                            
                                              <button class="dotDet"> Share</button>
                                              <hr>
                                              <button class="dotDet" onclick="copyURL()"> Copy Link </button>
                                              <hr>
                                              <button class="dotDet" type="button" id="cancel"> Cancel</button>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <!-- Dots Model End=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- -->
`;

            // Add the cods to The loop
            let postContainet = document.getElementById("postCnt");
            postContainet.innerHTML += PostContent;


            // Show the Modal when Clecked on 3 dots in header of The post
            let dot = document.querySelector("#dotsBtn");
            let modal = document.getElementById("dotsModal");
            let cancel = document.getElementById("cancel");

            dot.addEventListener("click", () => {
                modal.classList.toggle("visually-hidden");
            })
            cancel.addEventListener("click", () => {
                modal.classList.toggle("visually-hidden");
            })

            const token = localStorage.getItem("token");
            if (token == null) {
                let sled = document.querySelector(".slideBar");
                let Anav = document.querySelector(".abov-nav");
                let Bnav = document.querySelector(".bootom-nav");
                sled.style.display = "none";
                Anav.style.display = "none";
                Bnav.style.display = "none";

                tkhidding.classList.add("visually-hidden")
            }






        })
}

getPost();


function postCommentClick() {
    let commentText = document.getElementById("textOfComment").value;
    params = {
        "body": commentText
    }
    let token = localStorage.getItem("token");
    url = `https://tarmeezacademy.com/api/v1/posts/${id}/comments`

    axios.post(url, params, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(response => {
            console.log(response.data);
            let postContaint = document.getElementById("postCnt");
            postContaint.innerHTML = "";
            getPost();
        })
        .catch(error => {
            const errorMessage = error.response.data.message
            // alert(errorMessage);
            showSuccessAlert(errorMessage, "danger")
            // todo: fix The Alert
        })
}

