module.exports = [
  {
    type: 'input',
    name: 'filename',
    message: 'filename:',
    validate(value) {
      if (!value.length) {
        return 'Blog must have a filename.'
      }
      return true
    }
  }
]
