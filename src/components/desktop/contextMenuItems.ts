import { AppInfo } from "../../apps/appInfo";
import { startProcess } from "../../proceduce";
import { appStore } from "../../store";
import { ITemplate } from "../contextMenu/interfaces";

interface IDesktopContextMenuItemsEvents {
  onShowDesktopIconsClick(): void
}

export function getDesktopContextMenuItems(events: IDesktopContextMenuItemsEvents): ITemplate[] {
  const { showDesktopIcons } = appStore.getState('showDesktopIcons')

  return [
    {
      text: 'View', children: [
        { text: 'Large Icons', value: 'large-icons' },
        { text: 'Medium Icons', value: 'medium-icons', checked: true },
        { text: 'Small Icons', value: 'small-icons' },
        { divider: true },
        { text: 'Auto arrange icons' },
        { text: 'Align icons to grid', checked: true },
        { divider: true },
        {
          text: 'Show desktop icons', checked: showDesktopIcons, onClick: events.onShowDesktopIconsClick
        },
      ]
    },
    {
      text: 'Sort by', children: [
        { text: 'Name' },
        { text: 'Size' },
        { text: 'Item type' },
        { text: 'Date Modified' }
      ]
    },
    { text: 'Refresh' },
    { divider: true },
    { text: 'Paste', disabled: true },
    { text: 'Paste shortcut', disabled: true },
    { divider: true },
    {
      text: 'New', children: [
        { text: 'Folder', icon: 'imgs/icons/Folder.png', iconType: 'image' },
        { text: 'Shortcut', iconType: 'image', icon: 'imgs/icons/Emblems/1010.png' },
        { divider: true },
        { text: 'Bitmap Image' },
        { text: 'Rich Text Document' },
        { text: 'Text Document', icon: 'imgs/icons/Notes.png', iconType: 'image' },
      ],
      emphasis: true
    },
    { divider: true },
    {
      icon: 'imgs/icons/Desktop.png',
      iconType: 'image',
      text: 'Display settings', onClick: () => {
        startProcess({
          ...AppInfo.settings, type: 'app', args: 'system/display'
        })
      }
    },
    {
      icon: 'imgs/icons/Personalization.png',
      iconType: 'image',
      text: 'Personalize', onClick: () => {
        startProcess({
          ...AppInfo.settings, type: 'app', args: 'personalization'
        })
      }
    }
  ]
}
