interface FileMappingInfo {
  icon?: string
  iconType?: string
  appName: string
}

interface IFileMapping {
  [key: string]: FileMappingInfo
}

function getFileIcon(name: string) {
  return `imgs/icons/${name}`
}

export const FileMapping: IFileMapping = {
  '.jpg': { icon: getFileIcon('Pictures file.png'), appName: 'photos' },
  '.png': { icon: getFileIcon('Pictures file.png'), appName: 'photos' },
  '.mp3': { icon: getFileIcon('Audio file.png'), appName: 'photos' },
  '.aac': { icon: getFileIcon('Audio file.png'), appName: 'photos' },
  '.ogg': { icon: getFileIcon('Audio file.png'), appName: 'photos' },
  '.mp4': { icon: getFileIcon('Videos file.png'), appName: 'photos' },
  '.mkv': { icon: getFileIcon('Videos file.png'), appName: 'photos' },
  '.webm': { icon: getFileIcon('Videos file.png'), appName: 'photos' },
  '.txt': { icon: getFileIcon('Notes.png'), appName: 'notepad' },
}
