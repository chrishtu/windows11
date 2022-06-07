import FileButton from "../../../../../components/controls/FileButton"
import Select, { ISelect } from "../../../../../components/controls/Select"
import desktop from "../../../../../components/desktop/desktop"
import createElement from "../../../../../createElement"
import { IWallpaerImageInfo } from "../../../../../data/wallpapers"
// import wallpapers from "../../../../../data/wallpapers"
import { getState, setState } from "../../../../../store"
import { getFileName } from "../../../../../utils"
import { getImageThumbnail } from "../../../../../utils/common"
import { getThumbnailFromImage } from "../../../common"
import { SettingGroup } from "../../../settingGroup"
import { ISettingNavItem, SettingNavItem, SettingNavRow } from "../../system/settingNav"
import RecentImages from "./recentImages"
import ScreenPreview from "./screenPreview"

export default function Background() {
  const { backgroundImage } = getState('backgroundImage')
  const thumbnailImage = getThumbnailFromImage(backgroundImage.path)
  const screenPreview = ScreenPreview({ backgroundImage: thumbnailImage })

  let backgroundSelect: ISelect,
    backgroundSettingNav: ISettingNavItem

  backgroundSelect = Select({
    options: [
      { id: 'solid', text: 'Solid Color', value: 'solid' },
      { id: 'slideshow', text: 'Slideshow', value: 'slideshow' },
      { id: 'picture', text: 'Picture', value: 'picture' }
    ],
    value: 'picture',
    onChange: (item) => {

      backgroundSettingNav.setContent(getContent(item.value))
    }
  })

  function choosePhoto(e: KeyboardEvent) {
    const input = e.target as HTMLInputElement
    const file = input.files[0]
    if (!file) return

    const src = URL.createObjectURL(file)

    const imageInfo: IWallpaerImageInfo = {
      name: getFileName(src),
      path: src,
      thumbnailPath: src
    }
    desktop.setBackgroundImage(imageInfo, true)

    getImageThumbnail(src, res => {
      screenPreview.changeBackground(res)
    })
  }

  function getImageContent() {
    const { backgroundImageStyle } = getState('backgroundImageStyle')

    return [
      SettingNavRow({
        contentLeft: RecentImages(changeBackGround)
      }),
      SettingNavRow({
        contentLeft: 'Choose a photo',
        contentRight: FileButton({
          accept: 'image/png, image/jpeg',
          children: 'Choose a photo',
          onChange: choosePhoto
        }),
        itemsCenter: true
      }),
      SettingNavRow({
        contentLeft: 'Choose a fit for your desktop image',
        contentRight: Select({
          options: [
            { id: 'fill', text: 'Fill', value: 'fill' },
            { id: 'fit', text: 'Fit', value: 'fit' },
            { id: 'stretch', text: 'Stretch', value: 'stretch' },
            { id: 'center', text: 'Center', value: 'center' },
            { id: 'tile', text: 'Tile', value: 'tile' },
            { id: 'span', text: 'Span', value: 'span' }
          ],
          value: backgroundImageStyle,
          onChange: (item) => {
            screenPreview.setBackgroundStyle(item.value)
            desktop.setBackgroundStyle(item.value)
            setState({ backgroundImageStyle: item.value })
          }
        }).element,
        itemsCenter: true
      }),
    ]
  }

  function getContent(value: string) {
    switch (value) {
      case 'solid':
        return SettingNavRow({
          contentLeft: 'Solid Color',
        })
      case 'slideshow':
        return SettingNavRow({
          contentLeft: 'Slideshow',
        })
      case 'picture':
        return getImageContent()
    }
    return ''
  }

  backgroundSettingNav = SettingNavItem(
    {
      name: 'background',
      text: 'Personalize your Background',
      icon: '',
      desc: 'A picture background applies to your current desktop. Solid color or slideshow background apply to all your desktops.',
      path: 'background',
      control: backgroundSelect.element,
      expanded: true,
      content: getImageContent()
    }
  )

  let element = createElement('div', {
    className: 'setting-system flex flex-wrap'
  },
    [
      createElement('div', {
        className: 'w-full background-selector'
      },
        [
          screenPreview.element,
          backgroundSettingNav.element,
          SettingGroup('Related Settings', [
            {
              name: 'contras theme',
              text: 'Contrast Theme',
              icon: '',
              desc: 'Color themes for low vision light sensitvity',
              path: 'contras theme',
            }
          ])
        ]
      )
    ]
  )

  function changeBackGround(image: IWallpaerImageInfo) {
    screenPreview.changeBackground(getThumbnailFromImage(image.path))
    desktop.setBackgroundImage(image)
  }

  return {
    element,
    dispose: () => { }
  }
}
