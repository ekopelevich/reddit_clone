var app = angular.module('redditApp', ['angularMoment', 'ngAnimate']);

app.controller('RedditController', function($scope, $http){

  $scope.posts = [];

  function Comment(commentAuthor, commentBody, date, score) {
    this.commentAuthor = commentAuthor;
    this.commentBody = commentBody;
    this.date = date;
    this.score = score;
    this.upVote = function(){
      this.score++;
    };
    this.downVote = function(){
      this.score--;
    };
  }

  function Post(author, title, description, date, image, score, commentsNum) {
    this.author = author;
    this.title = title;
    this.description = description;
    this.date = date;
    this.image = image;
    this.comments = [];
    this.score = score;
    this.comments_num = commentsNum;
    this.upVote = function(){
      this.score++;
    };
    this.downVote = function(){
      this.score--;
    };

    this.viewComments = function(){
      console.log(this.comments);
    };

    this.newComment = function(commentAuthor, commentBody){
      var comment = new Comment(commentAuthor, commentBody, Date.now()/1000, 0);
      this.comments.push(comment);
    };
  }

  var response = $http.get('https://www.reddit.com/r/earthporn.json')
    .then(function successCallback(response){

      $scope.posts = [];

      var listings = response.data.data.children;
      var post;

      for (var i = 0; i < listings.length; i++) {
        post = new Post(listings[i].data.author, listings[i].data.title, 'description', listings[i].data.created_utc, listings[i].data.thumbnail, listings[i].data.score, listings[i].data.num_comments);

        $scope.posts.push(post);
        localStorage.setItem('posts', JSON.stringify($scope.posts));
      }
    }, function errorCallback(response) {
      console.error(response);
    });

  $scope.newPost = function(){
    console.log('valid!');
    var post = new Post($scope.author, $scope.title, $scope.description, Date.now()/1000, $scope.image, 0, 0);
    $scope.posts.push(post);
    console.log($scope.newPostForm);
    $scope.newPostForm.resetForm();
  };
});
