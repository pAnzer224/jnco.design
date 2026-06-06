const fs = require('fs');
const path = require('path');

const filePath = path.resolve('..', 'jnco.pipeline', 'src', 'components', 'SoundboardSidebar.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// The problematic line is around line 49
// Let's replace the whole className assignment with the correct one
const correctClassName = 'className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ${isActive ? "bg-accent text-white shadow-[0_0_15px_rgba(230,59,46,0.5)] scale-95" : "bg-primary/90 text-dark/60 hover:bg-primary hover:scale-105"}`}';

// Regex to match the className attribute starting with className={\...
content = content.replace(/className=\{\\?s?pect-square[^>]+/, correctClassName);
// If it failed to match with regex, try a more brute-force approach:
content = content.replace(/className=\{\\[\s\S]*?hover:scale-105'\s*\}\\?\`?\}/, correctClassName);
// And if it contains \\} it was from powershell replacement
content = content.replace(/className=\{\\spect-square[\s\S]*?hover:scale-105'\n\s*\}\\\}/, correctClassName);
// Another brute force
content = content.replace(/className=\{`aspect-square[\s\S]*?hover:scale-105'\s*\}\\\}/, correctClassName);

// Let's just find "className=" and replace up to ">"
// since it's the only button in that file
const parts = content.split('<button');
if (parts.length > 1) {
  const buttonPart = parts[1];
  const endOfButtonOpening = buttonPart.indexOf('>');
  if (endOfButtonOpening !== -1) {
    const buttonOpening = buttonPart.substring(0, endOfButtonOpening);
    // Replace the className entirely
    const newButtonOpening = buttonOpening.replace(/className=\{[\s\S]*?\}/, correctClassName);
    parts[1] = newButtonOpening + buttonPart.substring(endOfButtonOpening);
    content = parts.join('<button');
  }
}

// Add labels to the icons
if (!content.includes('item.label')) {
  content = content.replace(
    /<Icon size=\{24\} weight=\{isActive \? "fill" : "duotone"\} \/>/g,
    '<Icon size={24} weight={isActive ? "fill" : "duotone"} />\n              <span className="text-[10px] font-mono mt-1 tracking-wider">{item.label}</span>'
  );
}

fs.writeFileSync(filePath, content);
console.log('Fixed SoundboardSidebar.jsx');

// Now let's improve contrast across all components
const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
};

const srcDir = path.resolve('..', 'jnco.pipeline', 'src');
const jsxFiles = walk(srcDir);

jsxFiles.forEach(file => {
  let fileContent = fs.readFileSync(file, 'utf8');
  let original = fileContent;
  
  // Replace low contrast text colors
  fileContent = fileContent.replace(/text-dark\/20/g, 'text-dark/60');
  fileContent = fileContent.replace(/text-dark\/30/g, 'text-dark/70');
  fileContent = fileContent.replace(/text-dark\/40/g, 'text-dark/80');
  
  fileContent = fileContent.replace(/text-primary\/20/g, 'text-primary/60');
  fileContent = fileContent.replace(/text-primary\/30/g, 'text-primary/70');
  fileContent = fileContent.replace(/text-primary\/40/g, 'text-primary/80');
  
  // Make borders slightly more visible
  fileContent = fileContent.replace(/border-dark\/5/g, 'border-dark/15');
  fileContent = fileContent.replace(/border-dark\/10/g, 'border-dark/20');
  
  if (original !== fileContent) {
    fs.writeFileSync(file, fileContent);
    console.log(`Improved contrast in ${file}`);
  }
});
