declare module "summernote/dist/summernote-lite.js" {
  const summernote: unknown;
  export default summernote;
}

declare global {
  interface JQuery<TElement = HTMLElement> {
    summernote(...args: unknown[]): JQuery<TElement>;
  }
}