const fs = require('fs');
const path = require('path');

class AnsiToHtml {
    parseAnsiColor(code) {
        code = parseInt(code);
        if (code < 16) {
            const basicColors = [
                '#000000', '#800000', '#008000', '#808000', '#000080', '#800080', '#008080', '#c0c0c0',
                '#808080', '#ff0000', '#00ff00', '#ffff00', '#0000ff', '#ff00ff', '#00ffff', '#ffffff'
            ];
            return basicColors[code] || '#000000';
        } else if (code >= 16 && code <= 231) {
            const r = Math.floor((code - 16) / 36) * 51;
            const g = Math.floor(((code - 16) % 36) / 6) * 51;
            const b = ((code - 16) % 6) * 51;
            return `rgb(${r}, ${g}, ${b})`;
        } else if (code >= 232 && code <= 255) {
            const gray = (code - 232) * 10 + 8;
            return `rgb(${gray}, ${gray}, ${gray})`;
        }
        return '#000000';
    }

    parseAnsiSequences(text) {
        const segments = [];
        const regex = /\x1b\[([0-9;]*)m([^\x1b]*)/g;
        let currentFg = null;
        let currentBg = null;
        let match;

        while ((match = regex.exec(text)) !== null) {
            const [_, codes, content] = match;
            const codeParts = codes.split(';');

            for (let i = 0; i < codeParts.length; i++) {
                if (codeParts[i] === '38' && codeParts[i + 1] === '5') {
                    currentFg = this.parseAnsiColor(codeParts[i + 2]);
                    i += 2;
                } else if (codeParts[i] === '48' && codeParts[i + 1] === '5') {
                    currentBg = this.parseAnsiColor(codeParts[i + 2]);
                    i += 2;
                } else if (codeParts[i] === '0') {
                    currentFg = null;
                    currentBg = null;
                }
            }

            if (content) {
                segments.push({
                    content,
                    style: {
                        color: currentFg,
                        backgroundColor: currentBg
                    }
                });
            }
        }

        return segments;
    }

    renderLine(line) {
        const segments = this.parseAnsiSequences(line);
        return segments.map(segment => {
            const styles = [];
            if (segment.style.color) styles.push(`color: ${segment.style.color}`);
            if (segment.style.backgroundColor) styles.push(`background-color: ${segment.style.backgroundColor}`);
            styles.push('display: inline-block');
            styles.push('height: 1em');
            styles.push('line-height: 1');
            
            return `<span style="${styles.join('; ')}">${segment.content}</span>`;
        }).join('');
    }

    generateHtml(art) {
        // Trim any leading/trailing whitespace from the entire input
        art = art.trim();
        
        // Split into lines and filter out empty lines at the start/end
        const lines = art.split('\n');
        
        // Join the lines without any whitespace between them
        const linesHtml = lines.map(line => 
            `<div class="leading-none" style="height: 1em; overflow: hidden;">${this.renderLine(line)}</div>`
        ).join('');

        // Add style tag to remove body margin and padding
        return `<style>body { margin: 0; padding: 0; }</style><pre class="ansi-content unselectable m-0 p-0 leading-none" style="display: block; margin: 0; padding: 0;">${linesHtml}</pre>`;
    }

    convertFile(inputFile, outputFile) {
        try {
            // Read file and remove any BOM and normalize line endings
            const art = fs.readFileSync(inputFile, 'utf8')
                .replace(/^\uFEFF/, '') // Remove BOM if present
                .replace(/\r\n/g, '\n') // Normalize line endings
                .replace(/\r/g, '\n');
            
            const html = this.generateHtml(art);
            
            // Write file without any additional whitespace
            fs.writeFileSync(outputFile, html.trim());
            return true;
        } catch (error) {
            console.error('Error converting file:', error);
            return false;
        }
    }
}

const filePath = process.argv[2];
if (!filePath) {
    console.error('Please provide an input file path');
    process.exit(1);
}

const converter = new AnsiToHtml();

const parsedPath = path.parse(filePath);
const outputPath = path.join(
    parsedPath.dir,
    `${parsedPath.name}_HTML${parsedPath.ext === '.txt' ? '.html' : parsedPath.ext}`
);

converter.convertFile(filePath, outputPath);
console.log(`Converted ${filePath} to ${outputPath}`);