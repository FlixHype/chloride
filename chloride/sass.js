import fs from 'fs';
import path from 'path';
import sass from 'node-sass';

const sourceDir = 'src';
const outputDir = 'src';

const scssFiles = fs.readdirSync(sourceDir).filter(file => file.endsWith('.scss'));

scssFiles.forEach(file => {
  const sourcePath = path.join(sourceDir, file);
  const outputFilename = file.replace('.scss', '.css');
  const outputPath = path.join(outputDir, outputFilename);

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
});