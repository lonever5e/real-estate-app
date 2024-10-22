import authRoute from "./routes/auth.route.js";
import chatRoute from "./routes/chat.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import messageRoute from "./routes/message.route.js";
import postRoute from "./routes/post.route.js";
import { spawn } from "child_process";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// console.log(process.env.CLIENT_URL)
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute); 
app.use("/api/test", testRoute);  
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);


app.post("/api/chatbot", (req, res) => {
  const { message } = req.body;  // The message sent by the user

  const pythonProcess = spawn('python', ['./scripts/chatbot.py', message]);

  let chatbotResponse = '';  // To capture the response from the Python script

  pythonProcess.stdout.on('data', (data) => {
    // Send response back to client
    // res.json({ response: data.toString() });
    chatbotResponse += data.toString();  // Accumulate the response
  });


  pythonProcess.stderr.on('data', (data) => {
    // Log error
    console.error(`Error: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    if (code === 0) {
      // Send the HTML response to the client
      res.setHeader('Content-Type', 'text/html');
      res.send(chatbotResponse);  // Send the HTML content directly
    } else {
      res.status(500).json({ error: "Chatbot failed to respond." });
    }
    console.log(`Python process exited with code ${code}`);
  });
});


app.listen(8800, () => {
  console.log("Server is running!");
});
