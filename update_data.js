const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src/lib/data.ts');
let content = fs.readFileSync(dataPath, 'utf8');

// Replace configuration: 'X BHK', with configuration: 'X BHK', maxOccupancy: X + 1,
content = content.replace(/configuration:\s*'(\d)\s*BHK',/g, (match, p1) => {
  return `${match}\n    maxOccupancy: ${parseInt(p1) + 1},`;
});

// For PG or Room, set default 2
content = content.replace(/configuration:\s*'Room',/g, `configuration: 'Room',\n    maxOccupancy: 2,`);
content = content.replace(/configuration:\s*'PG',/g, `configuration: 'PG',\n    maxOccupancy: 2,`);

fs.writeFileSync(dataPath, content);
console.log('Added maxOccupancy to properties');
