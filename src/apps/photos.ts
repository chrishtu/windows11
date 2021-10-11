import { taskbarHeight } from "../components/constant";
import Window from "../components/window/window";
import createElement from "../createElement";
import { IWindow } from "../interfaces/window";
import { getFileName } from "../utils";
import { IAppInfo } from "./appInfo";

interface VideoInfo {
  width: number
  height: number
  ratio: number,
  duration: number
}

type getVideoInfoCallback = (data: VideoInfo) => void

function getVideoInfo(src: string, cb: getVideoInfoCallback) {
  const video = document.createElement('video')

  video.onloadedmetadata = () => {
    cb({
      width: video.videoWidth,
      height: video.videoHeight,
      ratio: video.videoWidth / video.videoHeight,
      duration: video.duration
    })
  }

  video.src = src
}

const videos = [
  'Drone Shot of a Church Tower.mp4',
  'The Church of a Mountain Valley Town.mp4',
  'Clouds Over Rocky Mountains.mp4',
  'newyork city at night.mp4',
  'Area Of NewYork City At Night.mp4'
]

const Photos = (appInfo: IAppInfo, _args?: any) => {

  const photos = (win: IWindow) => {
    let vid = videos[Math.floor(Math.random() * videos.length)]

    if (_args) {
      vid = getFileName(_args)
    }

    let videoElem: HTMLVideoElement,
      videoOverlay: HTMLDivElement

    win.setTitle(vid)
    win.element.style.setProperty('--titlebar-text-color', '#fff')
    win.element.style.setProperty('--window-button-icon-color', '#fff')

    win.addEventListener('focus', () => {
      setTimeout(() => {
        videoElem.focus()
      }, 0)
    })

    win.addEventListener('ontitlebarshow', () => {
      videoOverlay.classList.remove('hide')
      videoOverlay.classList.add('show')
    })

    win.addEventListener('ontitlebarhide', () => {
      videoOverlay.classList.remove('show')
      videoOverlay.classList.add('hide')
    })

    win.addEventListener('fullscreen', (isFullScreen: boolean) => {
      videoElem.style.objectFit = isFullScreen ? 'contain' : 'cover'
    })

    win.addEventListener('secondInstance', (args: string) => {
      if (!win.isVisible()) {
        win.show()
      }

      win.focus()

      if (args) {
        videoElem.src = args
        videoElem.play()
        win.setTitle(getFileName(args))
      }
    })

    getVideoInfo(`videos/${vid}`, (videoInfo: VideoInfo) => {
      let size = {
        width: videoInfo.width,
        height: videoInfo.height
      }

      const screenWidth = window.innerWidth
      const screenHeight = window.innerHeight

      if (size.width > screenWidth) {
        size.width = Math.round(screenWidth * 80 / 100)
        size.height = Math.round(size.width / videoInfo.ratio)
      }

      if (size.height > ((screenHeight - taskbarHeight) * 90 / 100)) {
        size.height = Math.round((screenHeight - taskbarHeight) * 80 / 100)
        size.width = Math.round(size.height * videoInfo.ratio)
      }

      win.setSize(size)
      win.makeCenter()

      videoElem.play()
    })

    function onplay() {
      win.setAutoHideTitleBar(true)
    }

    function onpause() {
      win.setAutoHideTitleBar(false)
    }

    function onended() {
      win.setAutoHideTitleBar(false)
    }

    return createElement('div', {
      className: 'app-photos w-full h-full'
    },
      [
        videoElem = createElement('video', {
          className: 'w-full h-full',
          src: `videos/${vid}`,
          controls: true,
          style: {
            objectFit: 'cover'
          },
          onended,
          onplay,
          onpause
        }),
        videoOverlay = createElement('div', {
          className: 'video-overlays'
        },
          [
            createElement('div', {
              className: 'video-overlay video-overlay-top'
            }),
            createElement('div', {
              className: 'video-overlay video-overlay-bottom'
            }),
            createElement('button', {
              onclick: win.toggleFullscreen,
              className: 'absolute',
              style: {
                left: '40px',
                top: '40px',
                zIndex: 1
              }
            }, 'Toggle fullscreen')
          ]
        )
      ]
    )
  }

  Window({
    args: _args,
    name: appInfo.name,
    title: appInfo.productName,
    top: 100,
    left: 100,
    width: 450,
    height: 300,
    fluidContent: true,
    keepAspectRatio: true,
    disableMaximize: true,
    singleInstance: true,
    center: true,
    autoHideTitleBar: true,
    content: photos
  })
}

export default Photos
