import { TrackModel } from "./track-store"

test("can be created", () => {
  const instance = TrackModel.create({})

  expect(instance).toBeTruthy()
})
