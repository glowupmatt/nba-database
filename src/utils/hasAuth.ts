import { NextResponse } from "next/server";
const DATA_API_KEY = process.env.DATA_API_KEY as string;

export function noAuth(request: Request) {
  const auth = request.headers.get("data_api_key");
  return !auth || auth !== DATA_API_KEY;
}
