import { Bookmark, Indicator } from "@prisma/client"
import { PageableParams, PageableResult } from "@/types/general.types"

export type BookmarkActionParams = Pick<Bookmark, "indicatorId" | "client"> &
  Partial<Pick<Bookmark, "countryId">>

export interface GetBookmarsByUserParams extends PageableParams {
  client: string
}

export type GetByUserResult = PageableResult<
  (Pick<Indicator, "id" | "label" | "description" | "source"> & {
    countryName?: string
    countryId?: string
  })[]
>

export interface BookmarkServiceInterface {
  createOne: (params: BookmarkActionParams) => Promise<Bookmark>
  deleteOne: (id: number) => Promise<void>
  getByUser: (params: GetBookmarsByUserParams) => Promise<GetByUserResult>
  getOne: (params: BookmarkActionParams) => Promise<Bookmark | null>
}
