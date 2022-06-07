import createElement from "../../../../../createElement"
import wallpapers, { IWallpaerImageInfo } from "../../../../../data/wallpapers"
import { getState, setState } from "../../../../../store"

export default function RecentImages(onChange?: (item: IWallpaerImageInfo) => void) {
  let element: HTMLElement,
    recentImageListElem: HTMLElement,
    imageItemElems = []

  let { recentImages } = getState('recentImages')

  if (!recentImages) {
    recentImages = [
      wallpapers[15], wallpapers[9], wallpapers[21], wallpapers[13], wallpapers[19]
    ]
  }

  function onclick(target: HTMLElement, item: IWallpaerImageInfo) {
    recentImageListElem.insertBefore(target, recentImageListElem.firstChild)

    const currentImage = recentImages.find((t: IWallpaerImageInfo) => t.path === item.path)

    if (currentImage) {
      recentImages.splice(recentImages.indexOf(currentImage), 1)
      recentImages.unshift(item)
      setState({ recentImages })
    }

    onChange && onChange(item)
  }

  element = createElement('div', {
    className: 'settings-recent-images-container'
  },
    [
      createElement('div', {
        className: 'settings-recent-images-header'
      }, 'Recent Images'),
      recentImageListElem = createElement('div', {
        className: 'settings-recent-images flex flex-wrap'
      },
        recentImages.map((image: IWallpaerImageInfo, index: number) => {
          let elem = createElement('div', {
            key: index,
            className: 'settings-recent-image',
            onclick: (e: MouseEvent) => {
              onclick(e.currentTarget as HTMLElement, image)
            }
          },
            createElement('div', {
              className: 'settings-recent-image-inner',
              style: {
                backgroundImage: `url(${image.thumbnailPath})`
              }
            })
          )

          imageItemElems.push({ id: image.path, element: elem })

          return elem
        }
        )
      )
    ]
  )

  return element
}
