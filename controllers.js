var app = angular.module('redditApp', []);

app.controller('RedditController', function($scope, $http){

  $scope.posts = [];

  function Post(author, title, date, description, image, score, comments) {
    this.author = author;
    this.title = title;
    this.date = date;
    this.description = description;
    this.image = image;
    this.comments = comments;
    this.score = score;
    this.upVote = function(){
      this.score++;
    };
    this.downVote = function(){
      this.score--;
    };
  }

  // function Comment() {
  //   votes = this.votes;
  //   author = this.author;
  //   description = this.description;
  //   date = this.date;
  // }

  if (!localStorage.getItem('posts')) {

    var response = $http.get('https://www.reddit.com/r/earthporn.json')
      .then(function successCallback(response){
        console.log(response);

        $scope.posts = [];

        var listings = response.data.data.children;
        var post;

        for (var i = 0; i < listings.length; i++) {
          post = new Post(listings[i].data.author, listings[i].data.title,  listings[i].data.created_utc, 'description', listings[i].data.thumbnail, listings[i].data.score, listings[i].data.num_comments);

          $scope.posts.push(post);
          localStorage.setItem('posts', JSON.stringify($scope.posts));
        }
      }, function errorCallback(response) {
        console.log(response, error);
      });
  } else {
    $scope.posts = localStorage.getItem('posts');
  }

  $scope.newPost = function(){

    var post = new Post(newPostForm.author.value, newPostForm.title.value, Date.now().value, newPostForm.description.value, newPostForm.image.value, 0, 0);

    $scope.posts = JSON.parse(localStorage.getItem('posts'));
    $scope.posts.push(post);
    localStorage.setItem('posts', JSON.stringify($scope.posts));
    $window.location.href = '/';
  };

  $scope.viewComments = function(){

  };

});
