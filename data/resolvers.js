const resolvers = {
  Query: {
    author(_, args){
      return {id: 1, firstName: "Hey", lastName: "You"}
    }
  },
  Author: {
    posts(author){
      return [{id: 111, title: "123", text: "good"}];
    }
  },
  Post: {
    author(post){
      return {id: 1, firstName: "Hey", lastName: "You"};
    }
  }  
}

export default resolvers;
