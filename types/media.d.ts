/** by default .js/jsx/.ts/.tsx and image files are known to typescript
 *  But files like .mp4s .webms and .pdfs need to be declared as below 
 *  for typescript to 'know' the extension
 */
declare module "*.mp4" {
  const src: string;
  export default src;
}

declare module "*.webm" {
  const src: string;
  export default src;
}

declare module "*.pdf" {
  const value: string;
  export default value;
}

declare module "*.png" {
  const value: string;
  export default value;
}