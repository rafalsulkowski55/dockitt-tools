declare module "*.css";

declare module "libheif-js/wasm-bundle" {
  interface HeifImage {
    get_width(): number;
    get_height(): number;
    display(
      imageData: ImageData,
      callback: (displayData: ImageData | null) => void
    ): void;
  }
  const libheif: {
    HeifDecoder: new () => {
      decode(data: Uint8Array): HeifImage[];
    };
  };
  export default libheif;
}
