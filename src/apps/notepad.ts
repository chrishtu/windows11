import Window from "../components/window/window";
import createElement from "../createElement";
import { IWindow } from "../interfaces/window";
import { getFileName, readFile } from "../utils";
import { IAppInfo } from "./appInfo";

const NotePad = (appInfo: IAppInfo, args?: any) => {
  const notepad = (win: IWindow) => {
    let notePadElem = createElement('textarea', {
      tabIndex: 0,
      className: 'w-full h-full scrollable scroll-y',
      style: {
        border: 0,
        borderTop: '1px solid var(--border-color)',
        outline: 0,
        padding: '5px',
        color: 'var(--primary-text-color)',
        backgroundColor: 'transparent',
        font: '400 14px Consolas',
        cursor: 'default',
        resize: 'none'
      }
    })

    if (args) {
      readFile(args, text => {
        win.setTitle(getFileName(args) + ' - NotePad')
        notePadElem.value = text
      })
    }

    win.addEventListener('focus', () => {
      notePadElem.focus()
    })

    return notePadElem
  }

  Window({
    args,
    icon: appInfo.icon,
    name: appInfo.name,
    title: appInfo.productName,
    top: 100,
    left: 100,
    width: 600,
    height: 400,
    content: notepad
  })
}

export default NotePad
