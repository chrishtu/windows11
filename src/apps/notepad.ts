import Window from "../components/window/window";
import createElement from "../createElement";
import { IWindow } from "../interfaces/window";
import { getFileName, readFile } from "../utils";
import { IAppInfo } from "./appInfo";

const NotePad = (appInfo: IAppInfo, args?: any) => {
  const notepad = (win: IWindow) => {
    let notePadElem = createElement('div', {
      tabIndex: 0,
      contentEditable: true,
      className: 'w-full h-full',
      style: {
        borderTop: '1px solid var(--border-color)',
        outline: 0,
        padding: '5px',
        color: 'var(--primary-text-color)',
        font: '400 14px Consolas',
        overflow: 'auto',
        cursor: 'default'
      }
    })

    if (args) {
      readFile(args, text => {
        win.setTitle(getFileName(args) + ' - NotePad')
        notePadElem.innerText = text
      })
    }

    win.addEventListener('focus', () => {
      setTimeout(() => {
        notePadElem.focus()
      }, 0)
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
