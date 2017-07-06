import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';
import Redis from 'redis'

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

//views in Redis

var redis = require("redis"),
    client = redis.createClient();

//const mongo = Mongoose.connect('mongodb://localhost/views');

//const ViewSchema = Mongoose.Schema({
//  postId: Number,
//  views: Number
//});

//const View = Mongoose.model('views', ViewSchema);

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

        // return View.update(
        //   {postId: post.id},
        //   {views: casual.integer(0, 100)},
        //   {upsert: true});
      } );
    } );
  });
});

const Author = db.models.author;
const Post = db.models.post;

export { Author, Post, client};
