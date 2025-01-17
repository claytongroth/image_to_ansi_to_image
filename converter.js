// ASCII Art Text File Converter
const fs = require('fs');

// Read the input file
const convertAsciiArt = (inputPath, outputPath) => {
  try {
    // Read the input file
    const text = fs.readFileSync(inputPath, 'utf8');
    
    // Process the text:
    // 1. Split into lines
    // 2. Escape special characters
    // 3. Format for JavaScript
    const processedText = text
      .split('\n')
      .map(line => 
        line
          .replace(/\\/g, '\\\\')  // Escape backslashes
          .replace(/`/g, '\\`')    // Escape backticks
          .replace(/\$/g, '\\$')   // Escape dollar signs
      )
      .join('\\n');

    // Create the JavaScript module content
    const jsContent = `// Generated ASCII Art Module
const asciiArt = \`${processedText}\`;

export default asciiArt;
`;

    // Write to the output file
    fs.writeFileSync(outputPath, jsContent);
    console.log(`Converted successfully! Output written to ${outputPath}`);

  } catch (error) {
    console.error('Error:', error);
  }
};

// Example usage:
// If running directly
if (require.main === module) {
  const inputFile = process.argv[2];
  const outputFile = process.argv[3] || 'asciiArt.js';
  
  if (!inputFile) {
    console.log('Usage: node converter.js <input-file> [output-file]');
    process.exit(1);
  }
  
  convertAsciiArt(inputFile, outputFile);
}

module.exports = convertAsciiArt;