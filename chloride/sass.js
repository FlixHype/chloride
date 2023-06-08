import fs from 'node:fs';
import path from 'node:path';
import sass from 'node-sass';

const sourceDirectory = 'src';
const outputDirectory = 'src';

const scssFiles = fs.readdirSync(sourceDirectory).filter(file => file.endsWith('.scss'));

for (const file of scssFiles) {
  const sourcePath = path.join(sourceDirectory, file);
  const outputFilename = file.replace('.scss', '.css');
  const outputPath = path.join(outputDirectory, outputFilename);

  sass.render({
    file: sourcePath,
    outFile: outputPath,
    sourceMap: true,
    outputStyle: 'compressed'
  }, (error, result) => {
    if (error) {
      console.error(`Error compiling ${sourcePath}: ${error.message}`);
    } else {
      fs.writeFileSync(outputPath, result.css);
      fs.writeFileSync(`${outputPath}.map`, result.map);
    }
  });
}