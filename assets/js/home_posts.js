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

                    new Noty({
                        theme : 'relax',
                        text : 'Post Published',
                        type : 'success',
                        layout : 'topRight',
                        timeOut : 1500
                    }).show();
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

                    new Noty ({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                },error : function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each

    let convertPostsToAjax = function(){
        $('posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button',self);
            deletePost(deleteButton);

            // get the post's by splittin the id attribute
            let postId = self.prop('id').split("-")[1];
            new PostComments(postId);
        });
    }

    createPost();
    

}