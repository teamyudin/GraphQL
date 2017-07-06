import { Author, Post, client, FortuneCookie } from './connectors'

const resolvers = {
  Query: {
    author(_, args){
      return Author.find({where: args})
    },
    getFortuneCookie(){
      return FortuneCookie.getOne();
    }
  },
  Author: {
    posts(author){
      return author.getPosts();
    }
  },
  Post: {
    author(post){
      return post.getAuthor();
    },
    views(post) {
      return client.getAsync('postId' + post.id)
      .then( (r) => {return r});
    }
  }
}

export default resolvers;
