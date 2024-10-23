import fs from "fs";
import https from "https";
import path from "path";
import { fileURLToPath } from "url";
import { z } from "zod";

import imageData from "../data/images.json" with { type: "json" };

const assetRootURL = "https://botc.app";
const assetRootDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../assets",
);

const assetRegex = /(?<=^\/assets\/)(?<name>.*?)-.{8}\.(?<ext>.*$)/;
// const dataBlobRgx = /^data:.+\/(.+);base64,(.*)$/;

const ImageDataSchema = z.array(z.string());
const imageList = ImageDataSchema.parse(imageData);

const {
  assets,
  data: _data,
  other: _other,
} = Object.groupBy(imageList, (image) => {
  if (image.startsWith("/assets/")) return "assets";
  if (image.startsWith("data:")) return "data";
  return "other";
});

if (assets) {
  assets.forEach((asset) => {
    const matches = assetRegex.exec(asset);
    if (!matches?.groups) return;
    const { name, ext } = matches.groups;
    const fileName = `${name}.${ext}`;
    const filePath = path.join(assetRootDir, fileName);
    const writeFile = fs.createWriteStream(filePath);
    https.get(path.join(assetRootURL, asset), (response) => {
      response.pipe(writeFile);
      writeFile.on("finish", () => {
        writeFile.close();
        console.log("Download Completed");
      });
    });
  });
}

// const foo = ImageDataSchema.parse(imageData).reduce((acc,curr,idx)=>{
//   const assetMatches = assetRegex.exec(curr)
//   if (assetMatches){
//     // const []
//   }
//   assetMatches
//   if (curr.startsWith("/assets")){
//     // curr.match(assetRegex)
// assetRegex.exec(curr)
//   }
// },{ })

// images.forEach((image, idx)=>{
//   if (image.startsWith("/assets")){
//     const assetPath = path.join(assetRootDir, path.basename(image))
//   }
// })
// if (uri.startsWith("data:")) {
//   const [_, ext, data] = data_url.match(dataRegex);
//   const buffer = Buffer.from(data, "base64");
//   fs.writeFileSync(path.join(destDir, `data_${i}.${ext}`), buffer);
//   console.log("Encoding Complete");
// }
