import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';
import Redis from 'redis'
import rp from 'request-promise'

const db = new Sequelize('blog', null, null, {
  dialect: 'sqlite',
  storage: './blog.sqlite'
});

const AuthorModel = db.define('author', {
  firstName: {type: Sequelize.STRING},
  lastName: {type: Sequelize.STRING},
});

const PostModel = db.define('post', {
  title: {type: Sequelize.STRING},
  text: {type: Sequelize.STRING},
});

AuthorModel.hasMany(PostModel);
PostModel.belongsTo(AuthorModel);

//views count in Redis
var redis = require("redis"),
    client = redis.createClient();

casual.seed(123);

db.sync({force: true}).then(() => {
  _.times(10, () => {
    return AuthorModel.create({
      firstName: casual.first_name,
      lastName: casual.last_name
    }).then( (author) => {
      return author.createPost({
        title: 'A post by ${author.firstName}',
        text: casual.sentences(3)
      }).then( (post) => {
        client.set("postId" + post.id, post.id, redis.print);
      } );
    } );
  });
});

const Author = db.models.author;
const Post = db.models.post;

const FortuneCookie = {
  getOne(){
    return rp('http://fortunecookieapi.herokuapp.com/v1/fortunes')
    .then( (res) => JSON.parse(res))
    .then( (res) => {
      //console.log(casual.integer(0, res.length));
      var message = res[casual.integer(0, res.length)].message;
      return message;
    });
  }
};

export { Author, Post, client, FortuneCookie};
