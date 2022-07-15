
// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX

class PostComments{
    // constructor to initialize the instance of class
    constructor(postId){
        this.postId = postId;
        this.PostContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);


        let self = this;
        // call for all the existing comments
        $(' .delete-comment-button',this.PostContainer).each(function(){
            self.deleteComment($(this));
        });
    }

    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();

            let self = this;

            $.ajax({
                type : 'post',
                url : '/comments/create',
                data : $(self).serialize(),
                success : function(data){
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-commets-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment-button',newComment));
                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topLeft',
                        timeout: 1500
                        
                    }).show();
                },error : function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    newCommentDom(comment){
        return $(`
        <li id="comment-${ comment._id}">
            <p>


                ${comment.content }
                
                  <small class="delete">
                       <a class="delete-comment-button" href="/comments/destroy/${ comment.id }">X</a>
                  </small>
                 
                <br>
                <small>
                     ${comment.user.name}
                </small>
            </p>
        </li>
        
        `);
    }


    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }  
            });
        });
    }
}