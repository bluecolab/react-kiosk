// For some reason this is necessaty to import pdf files in typescript. Dont ask - V
declare module "*.pdf" {
    const value: string;
    export default value;
  }
  