/// <reference types="next" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL?: string
    }
  }
}

declare module '*.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

export {}
