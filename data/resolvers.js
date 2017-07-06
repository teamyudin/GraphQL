import { Author, Post, client } from './connectors'

const resolvers = {
  Query: {
    author(_, args){
      return Author.find({where: args})
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
      return client.get('postId' + post.id);
    }
  }
}

export default resolvers;
