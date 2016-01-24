var app = angular.module('redditApp', []);

app.controller('RedditController', function($scope, $http){

  function Post(image, score, title, author, date, comments) {
    this.image = image;
    this.score = score;
    this.title = title;
    this.author = author;
    this.date = date;
    this.comments = comments;
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

  $http.get('https://www.reddit.com/r/earthporn.json')
        .then(function successCallback(response){
          console.log(response);

          $scope.posts = [];

          var listings = response.data.data.children;
          var post;

          for (var i = 0; i < listings.length; i++) {
            post = new Post(listings[i].data.thumbnail, listings[i].data.score, listings[i].data.title, listings[i].data.author, listings[i].data.created_utc, listings[i].data.num_comments);

            $scope.posts.push(post);
          }
          console.log($scope.posts);
        }, function errorCallback(response) {
          console.log(response, error);
        });





  // $scope.comments = [
  //   {
  //     author: 'Billy Idol',
  //     date: 342343453452253,
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dolor elit, sodales in magna nec, tempor accumsan purus. Suspendisse potenti. Mauris sapien magna, luctus in hendrerit quis, pretium hendrerit eros.',
  //   }
  // ];
  //
  // $scope.posts = [
  //   {
  //     title: 'Look at this cute puppy!',
  //     author: 'Billy Idol',
  //     date: 342343453452253,
  //     image: './images/puppy.jpg',
  //     comments: $scope.comments.length,
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dolor elit, sodales in magna nec, tempor accumsan purus. Suspendisse potenti. Mauris sapien magna, luctus in hendrerit quis, pretium hendrerit eros.',
  //     votes: $scope.upvotes - $scope.downvotes
  //   }
  // ];


});

app.controller('newPostController', function($scope){

});
