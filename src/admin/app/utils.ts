const IMG_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.svg']

export const isImage = (file: any) => file && IMG_EXTENSIONS.includes(file.extension)
