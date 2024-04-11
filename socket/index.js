const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
  // console.log(users);
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
  // console.log(users);
};

const getUser = (userId) => {
  console.log("from getUser function: ", users);
  console.log(userId);
  let user;
  for (let i = 0; i < users.length; i++) {
    if (users[i].userId === userId) {
      console.log(true);
      user = users[i];
      return user;
    } else {
      console.log(users[i]);
    }
  }
};

io.on("connection", (socket) => {
  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    // console.log("addUser event recieved on socket server");
    addUser(userId, socket.id);
    // console.log(users);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    // console.log("sendMessage event recieved on socket server");
    console.log("sendMessages event: ", senderId, receiverId, text);
    const user = getUser(receiverId);
    // console.log(user);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
