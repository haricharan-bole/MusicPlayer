import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetAlbumsResult, GetArtistNames } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"

const API_PAGE_SIZE = 20

export class AlbumApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getAlbums(offset: number): Promise<GetAlbumsResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "http://api.napster.com/v2.2/albums/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4",
        { limit: API_PAGE_SIZE, offset: offset },
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

  async getArtistNames(artistIDs: string): Promise<GetArtistNames> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        `http://api.napster.com/v2.2/artists/${artistIDs}?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4`,
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const artistNames = []

      response.data.artists.forEach((artist) => {
        artistNames.push(artist.name)
      })

      return { kind: "ok", artistNames }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
