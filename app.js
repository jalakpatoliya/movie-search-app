var express = require("express");
var app =express();
var request = require("request");

app.get("/",function(req,res){
  res.render("search.ejs");
})

app.get("/results",function(req,res){
  var query = req.query.search;
  var url ="http://theapache64.xyz:8080/movie_db/search?keyword="+query;
  request(url,function(error,response,body){
    if (!error && response.statusCode == 200) {
      var parsedBody = JSON.parse(body);
      res.render("results.ejs",{movieDetails:parsedBody});
    }
  })

})

app.listen(3823,function(){
  console.log("movie search app started")
})
