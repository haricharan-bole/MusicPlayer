import { AlbumModel } from "./album"

test("can be created", () => {
  const instance = AlbumModel.create({})

  expect(instance).toBeTruthy()
})
