import { NextRequest, NextResponse } from "next/server"
import ValueService from "@/services/value-service/ValueService"

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { value: string } }
) => {
  const body = await req.json()

  await ValueService.updateOne({ id: Number(params.value), ...body })

  return NextResponse.json(body)
}
