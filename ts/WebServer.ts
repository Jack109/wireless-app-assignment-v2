import { Task } from "./Task";

export const API = (operation: ApiOption) => `http://192.168.0.9:5000/api/${operation}`;

export type ApiOption = "signup" | "login" | "get_session_id" | "task";

export interface UserDetail {
  email: string;
  password: string;
}

async function register(userDetail: UserDetail) {
  const response = await(await postData("signup", userDetail)).json();
  if (response.error) {
    throw new Error(response.error);
  }
}

async function login(userDetail: UserDetail): string {
  const sessionId = await (await fetch(API("get_session_id"))).json();
  const response = await (await postData("login", {...userDetail, session_id: sessionId})).json();
  if (response.error) {
    throw new Error(response.error);
  }
  return sessionId;
}

async function upload(sessionId: string, tasks: Task[]) {
  await postData("task", {session_id: sessionId, tasks: tasks});
}

async function postData<T>(api: ApiOption, body: T): Promise<any> {
  return await fetch(API(api), {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export const WebServer = {
  register: register,
  login: login,
  upload: upload,
};
