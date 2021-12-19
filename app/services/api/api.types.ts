import { GeneralApiProblem } from "./api-problem"
import { Character } from "../../models/character/character"
import { Album, Track } from "../../models"

export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem

export type GetAlbumsResult = { kind: "ok"; albums: Album[] } | GeneralApiProblem
export type GetAlbumResult = { kind: "ok"; album: Album } | GeneralApiProblem

export type GetTracksResult = { kind: "ok"; tracks: Track[] } | GeneralApiProblem
export type GetTrackResult = { kind: "ok"; track: Track } | GeneralApiProblem

export type GetArtistNames = { kind: "ok"; artistNames: string[] } | GeneralApiProblem
