const IMG_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.svg']

export const isImage = file => file && IMG_EXTENSIONS.includes(file.extension)
