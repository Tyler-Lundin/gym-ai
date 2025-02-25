import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

interface ReqBody {
  username: string;
}

interface ResBody {
  message: string;
  status: "good" | "bad";
}

export async function POST(req: NextRequest): Promise<NextResponse<ResBody>> {
  const { username } = (await req.json()) as ReqBody;
  if (!username)
    return NextResponse.json({ message: "username required!", status: "bad" });

  const usernameSearch = await prisma.user.findFirst({ where: { username } });
  if (!usernameSearch)
    return NextResponse.json({
      message: "username available!",
      status: "good",
    });
  return NextResponse.json({ message: "username taken!", status: "bad" });
}
