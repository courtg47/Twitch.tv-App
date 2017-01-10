$(document).ready(function() {
  
  //ajax call running FreeCodeCamp's twitch.tv stream
  $.ajax({
    type: "GET",
    url: "https://api.twitch.tv/kraken/streams/freecodecamp",
    headers: {
      'Client-ID': "owpawazpipb536s3z1pjphwfxvvnuum"
    },
    //FreeCodeCamp streaming status and updating the screen with status
    success: function(data1) {
      if(data1.stream === null) {
        $("#fcc-status").html("Free Code Camp is Offline!");
      } else {
        $("#fcc-status").html("Free Code Camp is Online!");
      }
    }  
  });
 
  //ajax call using twitch.tv api to get freecodecamp follows
   $.ajax({
    type: "GET",
    url: "https://api.twitch.tv/kraken/users/freecodecamp/follows/channels/",
    headers: {
      "Client-ID": "owpawazpipb536s3z1pjphwfxvvnuum"
    },
     //looping through data and storing name, logo, and status into variables
    success: function(data2) {
      for (var i=0; i<data2.follows.length; i++) { 
        var name = data2.follows[i].channel.display_name;
        var logo = data2.follows[i].channel.logo;
        var status = data2.follows[i].channel.status;
        //if no logo, will use placeholder logo
        if (logo == null) {
          logo = "http://res.cloudinary.com/lqiwcxzks/image/upload/v1481085719/logo-placeholder_hbtgt3.jpg";
        } 
        if (status == null) {
          status = "No status update at the moment!";
        }
        //add name, logo, and status into divs on the screen
        $("#follower-info").prepend("<div class='row info'>" + "<div class='col-md-4'>" + "<img src='" + logo + "' class='logo-size'>" + "</div>"+"<div class='col-md-4 words'>" + name + "</div>" + "<div class='col-md-4 words'>" + status + "</div></div>");      
        
  }
  }
});
  
  //users who no longer have accounts
  var deleted =["brunofin","comster404"];
  
  //looping through deleted users
  for(var i = 0; i < deleted.length; i++) {
    $.ajax({
      type: "GET",
      url: "https://api.twitch.tv/kraken/streams/"+deleted[i],
      headers:{
        "Client-ID": "owpawazpipb536s3z1pjphwfxvvnuum"
      },
      success: function(data3) {
        //placeholder 404 logo for deleted users
        var logoError = "http://res.cloudinary.com/lqiwcxzks/image/upload/v1481085440/Free-404-Error-Page_k4qena.jpg";
        var nameError = "Not Found";
        var statusError = "Oops! Looks like we're not here.";
        
        //adding deleted user info on screen into divs
        $("#follower-info").prepend("<div class='row info'>" + "<div class='col-md-4'>" + "<img src='" + logoError + "'class='logo-size'>" + "</div>" + "<div class='col-md-4 words'>" + nameError + "</div>" + "<div class='col-md-4 words'>" + statusError + "</div></div>");      
      }
    });
  }
  
});