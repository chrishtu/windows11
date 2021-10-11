const iconColor = () => 'var(--window-icon-color)'

export const windowIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
<path
  d="M 3 3 L 11 3 L 11 11 L 3 11 L 3 3 z M 11 13 L 11 21 L 3 21 V 13 L 11 13 z M 13 3 L 21 3 V 11 L 13 11 V 3 z M 21 13 L 21 21 L 13 21 L 13 13 L 21 13 z" />
</svg>
`

export const settingIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${iconColor()}"><path d="M12 16c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.084 0 2 .916 2 2s-.916 2-2 2-2-.916-2-2 .916-2 2-2z"></path><path d="m2.845 16.136 1 1.73c.531.917 1.809 1.261 2.73.73l.529-.306A8.1 8.1 0 0 0 9 19.402V20c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-.598a8.132 8.132 0 0 0 1.896-1.111l.529.306c.923.53 2.198.188 2.731-.731l.999-1.729a2.001 2.001 0 0 0-.731-2.732l-.505-.292a7.718 7.718 0 0 0 0-2.224l.505-.292a2.002 2.002 0 0 0 .731-2.732l-.999-1.729c-.531-.92-1.808-1.265-2.731-.732l-.529.306A8.1 8.1 0 0 0 15 4.598V4c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2v.598a8.132 8.132 0 0 0-1.896 1.111l-.529-.306c-.924-.531-2.2-.187-2.731.732l-.999 1.729a2.001 2.001 0 0 0 .731 2.732l.505.292a7.683 7.683 0 0 0 0 2.223l-.505.292a2.003 2.003 0 0 0-.731 2.733zm3.326-2.758A5.703 5.703 0 0 1 6 12c0-.462.058-.926.17-1.378a.999.999 0 0 0-.47-1.108l-1.123-.65.998-1.729 1.145.662a.997.997 0 0 0 1.188-.142 6.071 6.071 0 0 1 2.384-1.399A1 1 0 0 0 11 5.3V4h2v1.3a1 1 0 0 0 .708.956 6.083 6.083 0 0 1 2.384 1.399.999.999 0 0 0 1.188.142l1.144-.661 1 1.729-1.124.649a1 1 0 0 0-.47 1.108c.112.452.17.916.17 1.378 0 .461-.058.925-.171 1.378a1 1 0 0 0 .471 1.108l1.123.649-.998 1.729-1.145-.661a.996.996 0 0 0-1.188.142 6.071 6.071 0 0 1-2.384 1.399A1 1 0 0 0 13 18.7l.002 1.3H11v-1.3a1 1 0 0 0-.708-.956 6.083 6.083 0 0 1-2.384-1.399.992.992 0 0 0-1.188-.141l-1.144.662-1-1.729 1.124-.651a1 1 0 0 0 .471-1.108z"></path></svg>
`

export const explorerIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${iconColor()}"><path d="M20 5h-9.586L8.707 3.293A.997.997 0 0 0 8 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z"></path></svg>
`

export const wifiIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="${iconColor()}" fill="none" stroke-linecap="round">
  <circle cx="12" cy="17" r="1" style="fill: ${iconColor()}" />
  <path d="M9.172 14a4 4 0 0 1 5.656 0" />
  <path d="M6.343 12a8 8 0 0 1 11.314 0" />
  <path d="M3.515 9.5c4.686 -4.687 12.284 -4.687 17 0" />
</svg>
`
export const volumeIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke="${iconColor()}">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M15 8a5 5 0 0 1 0 8" />
  <path d="M17.7 5a9 9 0 0 1 0 14" />
  <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
</svg>
`
export const volumeIcon2 = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="${iconColor()}"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
`

export const batteryIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1" fill="none" stroke-linejoin="round">
<rect x="5.5" y="7.5" width="14" height="9" stroke="${iconColor()}"/>
<rect x="7" y="9" width="11" height="6" fill="${iconColor()}"/>
<rect x="19.5" y="10" width="1.5" height="4" fill="${iconColor()}"/>
</svg>
`

export const actionCenterIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1" fill="none"
 stroke="${iconColor()}">
<path d="M4.5 4.5L20.5 4.5L20.5 17.5L15.5 17.5L12.5 20.5L9.5 17.5L4.5 17.5L4.5 4.5z" />
</svg>
`

export const closeIcon = `
<svg aria-hidden="true" version="1.1" width="10" height="10">
<path d="M 0,0 0,0.7 4.3,5 0,9.3 0,10 0.7,10 5,5.7 9.3,10 10,10 10,9.3 5.7,5 10,0.7 10,0 9.3,0 5,4.3 0.7,0 Z"></path>
</svg>
`
export const powerIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1" fill="none" stroke="${iconColor()}" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<path d="M7 6a7.75 7.75 0 1 0 10 0" />
<line x1="12" y1="4" x2="12" y2="12" />
</svg>
`

export const lockIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="${iconColor()}" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<rect x="5" y="11" width="14" height="10" rx="2" />
<circle cx="12" cy="16" r="1" />
<path d="M8 11v-4a4 4 0 0 1 8 0v4" />
</svg>
`

export const rotateIcon = `
 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5"  stroke="${iconColor()}" fill="none" stroke-linecap="round" stroke-linejoin="round">
 <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
 <path d="M19.95 11a8 8 0 1 0 -.5 4m.5 5v-5h-5" />
</svg>
`

export const chevronUpIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1" stroke="${iconColor()}" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<polyline points="6 15 12 9 18 15" />
</svg>
`

export const chevronRightIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="${iconColor()}" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<polyline points="9 6 15 12 9 18" />
</svg>
 `

export const chevronLeftIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="${iconColor()}" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <polyline points="15 6 9 12 15 18" />
</svg>
 `

export const bluetoothIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1" stroke="${iconColor()}" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<polyline points="7 8 17 16 12 20 12 4 17 8 7 16" />
</svg>
`

export const airplaneModeIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1" stroke="${iconColor()}" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2 -7h-4l-2 2h-3l2 -4l-2 -4h3l2 2h4l-2 -7h3z" />
</svg>
`

export const moonIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1" stroke="${iconColor()}" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
</svg>
`

export const brightDownIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1" stroke="${iconColor()}" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<circle cx="12" cy="12" r="3" />
<line x1="12" y1="5" x2="12" y2="5.01" />
<line x1="17" y1="7" x2="17" y2="7.01" />
<line x1="19" y1="12" x2="19" y2="12.01" />
<line x1="17" y1="17" x2="17" y2="17.01" />
<line x1="12" y1="19" x2="12" y2="19.01" />
<line x1="7" y1="17" x2="7" y2="17.01" />
<line x1="5" y1="12" x2="5" y2="12.01" />
<line x1="7" y1="7" x2="7" y2="7.01" />
</svg>
`

export const cameraIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1" stroke="${iconColor()}" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
<circle cx="12" cy="13" r="3" />
</svg>
`

export const checkIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1" stroke="${iconColor()}" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<path d="M5 12l5 5l10 -10" />
</svg>
`

export const codeIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1" stroke="${iconColor()}" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<polyline points="7 8 3 12 7 16" />
<polyline points="17 8 21 12 17 16" />
<line x1="14" y1="4" x2="10" y2="20" />
</svg>
`

export const cloudIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1" stroke="${iconColor()}" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-12" />
</svg>
`

export const promptIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1" stroke="${iconColor()}" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<polyline points="5 7 10 12 5 17" />
<line x1="13" y1="17" x2="19" y2="17" />
</svg>
`

export const searchIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1" stroke="${iconColor()}" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<circle cx="10" cy="10" r="7" />
<line x1="21" y1="21" x2="15" y2="15" />
</svg>
`

export const locationIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1" stroke="${iconColor()}" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<circle cx="12" cy="12" r="4" style="fill: ${iconColor()}"/>
<circle cx="12" cy="12" r="9"/>
</svg>
`

export const darkThemeIcon = `
<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" class="no-stroke">
  <circle cx="12" cy="12" r="9" fill="#000" />
  <circle cx="12" cy="12" r="8" fill="#fff" />
  <path d="M12 21A2 2 1 0 1 12 3" fill="#000" />
</svg>
`

export const sunIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${iconColor()}"
  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="3"></circle>
  <line x1="12" y1="1" x2="12" y2="5"></line>
  <line x1="12" y1="19" x2="12" y2="23"></line>
  <line x1="4" y1="4" x2="7" y2="7"></line>
  <line x1="17" y1="17" x2="20" y2="20"></line>
  <line x1="1" y1="12" x2="5" y2="12"></line>
  <line x1="19" y1="12" x2="23" y2="12"></line>
  <line x1="4" y1="20" x2="7" y2="17"></line>
  <line x1="17" y1="7" x2="20" y2="4"></line>
</svg>
`

export const nightLightIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${iconColor()}"
stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
<circle cx="12" cy="12" r="5"></circle>
<circle cx="10" cy="11" r="2" fill="${iconColor()}"></circle>
<line x1="12" y1="1" x2="12" y2="3"></line>
<line x1="12" y1="21" x2="12" y2="23"></line>
<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
<line x1="1" y1="12" x2="3" y2="12"></line>
<line x1="21" y1="12" x2="23" y2="12"></line>
<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
</svg>
`
export const castIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
stroke="${iconColor()}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
<path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6">
</path>
<line x1="2" y1="20" x2="2.01" y2="20"></line>
</svg>
`

export const projectIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5">
<g fill="none" stroke="${iconColor()}">
  <path d="M7 6l0 -3l14 0l0 8l-7 0" />
  <rect x="3" y="8" width="9" height="6" />
</g>
<path d="M3 16l-2 4l14 0l-2.5 -4z" fill="${iconColor()}" />
<path d="M6 18l-0.5 1l5 0l-0.5 -1z" fill="var(--black-white)" />
</svg>
`

export const transparencyIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke="${iconColor()}">
<rect x="3" y="3" width="18" height="18" />
<line x1="6" x2="10" y1="10" y2="6" />
<line x1="6" x2="18" y1="18" y2="6" />
<line x1="14" x2="18" y1="18" y2="14" />
</svg>
`
