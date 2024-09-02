import antfu from '@antfu/eslint-config'

export default antfu({
  jsx: true,
  typescript: true,
  ignores: ['**/migrations', '**/ui'],
})
