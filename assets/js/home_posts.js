{

    //method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    //console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);  /*prepend is a function in j query*/
                    deletePost($(' .delete-post-button', newPost));
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    // method to create a post in DOM 

    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
            <p>
            /*<% if (locals.user && locals.user.id == post.user.id){ %>*/
                <small>        
                    <a class="delete-post-button" href="/posts/destroy/${ post._id }">X</a>
                </small>
                //<% } %>

            //<%= post.content %>
            ${ post.content }
            <br>
            <small>
                //<%= post.user.name %>
                ${ post.user.name }
            </small>
            </p>
            <div class="post-comments">
                
                //<% if (locals.user){ %>
                    <form action="/comments/create" method="POST">
                        <input type="text" name="content" placeholder="Type Here to add comment..." required>
                        <input type="hidden" name="post" value="${ post._id }" >
                        <input type="submit" value="Add Comment">

                    </form>

                //<% } %>

                <div class="post-comments-list">
                    <ul id="poast-comments-${ post._id }">
                        /*<% for (comment of post.comments){%>

                            <%- include('_comment') -%>
                        <%} %>*/
                    </ul>
                </div>
            </div>
        </li>`)
    }

    // method to delete a post from DOM  
    let  deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }



    

    createPost();
}

