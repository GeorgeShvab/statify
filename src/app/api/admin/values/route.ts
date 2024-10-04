import { NextRequest, NextResponse } from "next/server"
import ValueService from "@/services/value-service/ValueService"

export const POST = async (req: NextRequest) => {
  const body = await req.json()

  await ValueService.create(body)

  return NextResponse.json({})
}
