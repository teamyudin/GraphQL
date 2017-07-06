## Getting started
Install Redis: https://redis.io/download

```sh
git clone https://github.com/teamyudin/GraphQL
cd GraphQL
npm install
npm run start
```
Then open [http://localhost:3000/graphiql](http://localhost:3000/graphql)
For UI, open [[http://localhost:3001](http://localhost:3001)]

When you paste this on the left side of the page:

```
{
  author {
    firstName
    lastName
    posts{
      title
      views
    }
  }
  getFortuneCookie
}
```

and hit the play button, you should see something like this:

```json
{
  "data": {
    "author": {
      "firstName": "Maurine",
      "lastName": "Rau",
      "posts": [
        {
          "title": "A post by Maurine",
          "views": 1
        }
      ]
    },
    "getFortuneCookie": "As you go through life, make this your goal, watch the doughnut and not the hole."
  }
}
```  
