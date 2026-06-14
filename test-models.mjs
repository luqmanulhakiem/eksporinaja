import fs from 'fs';
const apiKey = fs.readFileSync('.env', 'utf8').match(/GEMINI_API_KEY=(.*)/)[1].trim();
async function list() {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
  const data = await response.json();
  const names = data.models.map(m => m.name);
  console.log(names.filter(n => n.includes('flash') || n.includes('pro')));
}
list();
