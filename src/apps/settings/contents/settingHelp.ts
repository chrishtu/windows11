import createElement from "../../../createElement";
import { SettingNavCallback } from "./system/settingNav";

interface SettingHelpItem {
  text: string
  name: string
  desc: string
  onClick?: SettingNavCallback
}

interface SettingHelpOptions {
  relates?: Array<SettingHelpItem>
  actions?: Array<SettingHelpItem>
}

export function SettingHelp(options?: SettingHelpOptions) {
  if (!options) return null

  return createElement('div', {
    className: 'setting-help flex-shrink-0'
  },
    [
      options.relates &&
      createElement('div', {
        className: 'setting-system-help-items'
      },
        options.relates.map(item => {
          return createElement('div', {
            className: 'setting-system-help-item',
            onclick: item.onClick?.bind(null, item.name)
          },
            [
              createElement('div', {
                className: 'setting-system-help-item-label'
              }, item.text),
              createElement('div', {
                className: 'setting-system-help-item-content'
              }, item.desc)
            ]
          )
        }),
      ),
      options.actions &&
      createElement('div', {
        className: 'setting-system-help-actions'
      },
        [
          createElement('div', {
            className: 'setting-system-help-item-label'
          }, 'Have a question?'),
          createElement('div', {
            className: 'setting-system-help-actions-list'
          },
            options.actions.map(item => {
              return createElement('div', {
                onclick: item.onClick?.bind(null, item.name),
                className: 'setting-system-help-item-link'
              }, item.text)
            })
          )
        ]
      )
    ]
  )
}
