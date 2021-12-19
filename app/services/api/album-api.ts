import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetAlbumsResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"

const API_PAGE_SIZE = 20

export class AlbumApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getAlbums(): Promise<GetAlbumsResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "http://api.napster.com/v2.2/albums/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4",
        { limit: API_PAGE_SIZE },
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const albums = response.data.albums

      return { kind: "ok", albums }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
