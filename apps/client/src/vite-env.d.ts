/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLERK_PUBLISHABLE_KEY: string
  readonly VITE_PUBLIC_PATH: string
  readonly VITE_API_HOST: string
  readonly VITE_API_WS_HOST: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
