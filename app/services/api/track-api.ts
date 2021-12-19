import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import { GetTracksResult } from "."

export class TrackApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getTracks(albumId: string): Promise<GetTracksResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        `https://api.napster.com/v2.2/albums/${albumId}/tracks?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4`,
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const tracks = response.data.tracks

      return { kind: "ok", tracks }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
