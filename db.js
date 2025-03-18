//Example use:
//curl -X POST -H "Content-Type:application/json"
// http://localhost:3000/messages -d '{"text":"Hi again, World"}'

// -H === Header
// -d === Data

let users = {
  1: {
    id: "1",
    username: "Robin Wieruch",
  },
  2: {
    id: "2",
    username: "Dave Davids",
  },
};

let messages = {
  1: {
    id: "1",
    text: "Hello World",
    userId: "1",
  },
  2: {
    id: "2",
    text: "By World",
    userId: "2",
  },
};

module.exports = { users, messages };
