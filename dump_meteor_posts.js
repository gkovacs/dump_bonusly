// Generated by LiveScript 1.3.1
(function(){
  var execSync, MongoClient, asyncblock, fs, yamlfile, getPosts;
  execSync = require('child_process').execSync;
  MongoClient = require('mongodb').MongoClient;
  asyncblock = require('asyncblock');
  fs = require('fs');
  yamlfile = require('yamlfile');
  getPosts = function(mongo_url, callback){
    return MongoClient.connect(mongo_url, function(err, db){
      return db.collection('posts').find().toArray(function(err2, results){
        return callback(null, results);
      });
    });
  };
  asyncblock(function(flow){
    var output, i$, ref$, len$;
    output = [];
    for (i$ = 0, len$ = (ref$ = [2, 3, 4, 5, 6, 7, 8, 9, 10]).length; i$ < len$; ++i$) {
      (fn$.call(this, ref$[i$]));
    }
    yamlfile.writeFileSync('meteor_posts.yaml', output);
    return console.log('done');
    function fn$(weeknum){
      var meteor_url, mongo_url, posts, i$, len$, post;
      meteor_url = "crowdresearch" + weeknum + "s.meteor.com";
      mongo_url = execSync("meteor mongo --url " + meteor_url).toString('utf-8').trim();
      console.log(mongo_url);
      posts = flow.sync(getPosts(mongo_url, flow.callback()));
      for (i$ = 0, len$ = posts.length; i$ < len$; ++i$) {
        post = posts[i$];
        output.push(post);
      }
    }
  });
}).call(this);
