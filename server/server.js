import express from "express";
import dotenv from "dotenv";
import { envs, Client } from "stytch";
import cors from "cors";
dotenv.config();

const app = express();

const client = new Client({
  project_id: process.env.PROJECT_ID,
  secret: process.env.SECRET,
  env: envs.test,
});

const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

app.post(`/register`, async (req, res) => {
  const { email, password } = req.body;

  try {
    const resp = await client.passwords.create({
      email,
      password,
      session_duration_minutes: 60,
    });

    res.json({
      success: true,
      message: "User created successfully",
      token: resp.session_token,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.error_message,
      error,
    });
  }
});

app.post(`/login`, async (req, res) => {
  const { email, password } = req.body;

  try {
    const resp = await client.passwords.authenticate({
      email,
      password,
      session_duration_minutes: 60,
    });

    res.json({
      success: true,
      message: "User logged in successfully",
      token: resp.session_token,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.error_message,
      error,
    });
  }
});

app.post(`/authenticate`, async (req, res) => {
  const { session_token } = req.body;

  try {
    const resp = await client.sessions.authenticate({
      session_token,
    });

    res.json({
      success: true,
      message: "Authenticated",
      token: resp.session_token,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.error_message,
      error,
    });
  }
});

app.post(`/logout`, async (req, res) => {
  const { session_token } = req.body;

  try {
    const resp = await client.sessions.revoke({
      session_token,
    });

    res.json({
      success: true,
      message: "Logout",
      token: resp.session_token,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.error_message,
      error,
    });
  }
});

app.listen(port, () => console.log(`server started on port ${port}`));


