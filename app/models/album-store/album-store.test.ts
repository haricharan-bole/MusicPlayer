import { AlbumModel } from "./album-store"

test("can be created", () => {
  const instance = AlbumModel.create({})

  expect(instance).toBeTruthy()
})
