const data = require("./data/app/images.json");
const https = require("https");
const fs = require("fs");
const path = require("path");

const dataRegex = /^data:.+\/(.+);base64,(.*)$/;

const rootURI = "https://botc.app";
const destDir = path.join(__dirname, "images");

data.forEach((uri, i) => {
  if (uri.startsWith("/assets")) {
    const dest = path.join(destDir, path.basename(uri));
    const file = fs.createWriteStream(dest);
    https.get(path.join(rootURI, uri), function (response) {
      response.pipe(file);
      // after download completed close filestream
      file.on("finish", () => {
        file.close();
        console.log("Download Completed");
      });
    });
  }
  if (uri.startsWith("data:")) {
    const [_, ext, data] = data_url.match(dataRegex);
    const buffer = Buffer.from(data, "base64");
    fs.writeFileSync(path.join(destDir, `data_${i}.${ext}`), buffer);
    console.log("Encoding Complete");
  }
});
