import "jquery";

declare module "jquery" {
  interface JQuery<TElement = HTMLElement> {
    summernote(...args: unknown[]): JQuery<TElement>;
  }
}

declare module "summernote/dist/summernote-lite.js" {
  const summernote: unknown;
  export default summernote;
}