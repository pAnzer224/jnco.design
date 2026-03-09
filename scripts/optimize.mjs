import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = './public/images';
const srcDir = './src';

// Convert Images
async function convertImages(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            await convertImages(fullPath);
        } else if (/\.(jpg|jpeg|png)$/i.test(fullPath)) {
            const outPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
            if (fullPath !== outPath) {
                console.log(`Converting ${fullPath}`);
                try {
                    await sharp(fullPath).webp({ quality: 80 }).toFile(outPath);
                    fs.unlinkSync(fullPath); // Delete original
                } catch (e) { console.error(e) }
            }
        }
    }
}

// Replace in JSX
function replaceExtensions(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory() && file !== 'node_modules') {
            replaceExtensions(fullPath);
        } else if (/\.(js|jsx)$/i.test(fullPath)) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const newContent = content.replace(/\.(jpg|jpeg|png)/gi, '.webp');
            if (content !== newContent) {
                console.log(`Updated refs in ${fullPath}`);
                fs.writeFileSync(fullPath, newContent, 'utf8');
            }
        }
    }
}

async function run() {
    await convertImages(publicDir);
    replaceExtensions(srcDir);
    console.log('Done!');
}
run();
