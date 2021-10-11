interface wallpaerImageInfo {
  name: string
  path: string
  thumbnailPath: string
}

const wallpapers: Array<wallpaerImageInfo> = []

for (let index = 1; index <= 22; index++) {
  const name = 'IMG' + index + '.jpg'

  wallpapers.push({
    name,
    path: 'imgs/Wallpapers/' + name,
    thumbnailPath: 'imgs/Wallpapers/Thumbnails/' + name
  })
}

export default wallpapers
