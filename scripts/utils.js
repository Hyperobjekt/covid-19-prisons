const fs = require("fs");

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

exports.slugify = slugify;

exports.validStatePages = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
].map(slugify);

exports.writeFile = function (data, outputFile) {
  const filePieces = outputFile.split("/");
  const outputFileName = filePieces.pop();
  const outputFileDir = filePieces.join("/");
  // make dir if needed
  return fs.promises
    .mkdir(outputFileDir, { recursive: true })
    .then(() => {
      // write file
      return new Promise((resolve, reject) => {
        fs.writeFile(outputFile, data, (err) => {
          if (err) return reject(err);
          console.info("wrote transformed data to: " + outputFile);
          return resolve(outputFile);
        });
      });
    })
    .catch((error) => {
      console.error("caught exception : ", error.message);
      return error;
    });
};
