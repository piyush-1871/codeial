{

    // method to submit the form data using ajax
    let createPost = async function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();


            $.ajax({
                type : 'post',
                url : '/posts/create',
                data : newPostForm.serialize(),
                success : function(data){
                    let newPost = await newPostDom(data.data.post);
                    $("#posts-list-container>ul").prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                },error : function(error){
                    console.log(error.responseText);

                }
            })
        });
    }

    // method to create the post in DOM

    let newPostDom = async function(post){
        return $(`
        
            <li id="post-${ post._id }">
                <div id="post-container">
                      <p>
                           ${post.content}

                           
                            <small class="delete">
                                 <a class="delete-post-button" href="/posts/destroy/${post._id }">X</a>
                            </small>
                            
                            <br>
                            <small>
                                ${post.user.name}
                            </small>
                      </p>
                </div>
                <div class="post-comments">
                     
                          <form action="/comments/create" method="post" id="post-${post._id }-comments-form">
                               <input type="text" name="content" placeholder="Type here to add comment..." required>
                               <input type="hidden" name="post"
                               value="${post._id}">
                               <button>Add Comment</button>
                          </form>
                     
                        <div class="post-comments-list">
                             <ul id="post-comments-${post._id}">
                                     
                             </ul>
                        </div>     
                </div>
    
            </li>
        
        
        `);
    }

    // method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){


            e.preventDefault();

            $.ajax({
                type : 'get',
                url : $(deleteLink).prop('href'),
                success : function(data){
                    $(`#post-${data.data.post_id}`).remove;
                },error : function(error){
                    console.log(error.responseText);
                }
            });

        });
    }


    createPost();
    

}