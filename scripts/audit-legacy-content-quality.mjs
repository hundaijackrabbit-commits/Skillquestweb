import fs from 'node:fs';
import path from 'node:path';

const file = path.join(process.cwd(), 'src/data/skills-1000plus.json');
const skills = JSON.parse(fs.readFileSync(file, 'utf8'));

const patterns = {
  templatedShortDefinition: [
    /professional competency in .+ for solving complex technical challenges and driving innovation/i,
    /professional competency in .+ to optimize human capital and organizational effectiveness/i,
    /strategic expertise in .+ to drive business growth and competitive advantage/i,
    /proficiency in .+ to drive revenue growth and market success/i,
    /proficiency in .+ to leverage technology effectively in professional environments/i,
    /understanding and application of .+ in the context of ai-powered business environments/i,
    /the capability to .+ successfully across teams, departments, and organizational boundaries/i,
  ],
  genericDevelopment: [
    /^learn .+ fundamentals$/i,
    /^practice basic .+ techniques$/i,
    /^learn fundamental .+ concepts and principles$/i,
    /^practice .+ in low-risk environments$/i,
    /^study best practices and industry standards$/i,
    /^seek mentorship from experienced practitioners$/i,
    /^apply .+ skills in real professional projects$/i,
    /^lead initiatives requiring .+ expertise$/i,
    /^mentor junior colleagues in .+$/i,
    /^contribute to process improvements and innovations$/i,
    /^develop organizational standards for .+$/i,
    /^train teams in advanced .+ techniques$/i,
    /^drive strategic initiatives leveraging .+$/i,
    /^innovate new approaches and methodologies$/i,
    /^apply .+ in projects$/i,
    /^lead .+ initiatives$/i,
    /^develop .+ strategy$/i,
    /^train others in .+$/i,
  ],
  genericMistake: [
    /^underestimating .+ complexity$/i,
    /^underestimating the complexity of .+$/i,
    /^insufficient practice$/i,
    /^insufficient practice and hands-on application$/i,
    /^lack of feedback$/i,
    /^not seeking feedback during skill development$/i,
    /^not adapting to context$/i,
    /^applying skills without considering organizational context$/i,
  ],
  placeholderTool: [
    /^professional software$/i,
    /^collaboration tools$/i,
    /^development tools$/i,
    /^analytics platforms$/i,
    /^cloud services$/i,
    /^databases$/i,
    /^industry-standard software$/i,
  ],
};

const matchesAny = (value, regexes) => regexes.some((regex) => regex.test(String(value || '').trim()));
const listMatches = (values, regexes) => Array.isArray(values) ? values.filter((value) => matchesAny(value, regexes)) : [];

const findings = [];
const counts = { templatedShortDefinition: 0, genericDevelopment: 0, genericMistake: 0, placeholderTool: 0, affectedRecords: 0 };

for (const skill of skills) {
  const development = [
    ...(skill.beginnerActions || []),
    ...(skill.intermediateActions || []),
    ...(skill.advancedActions || []),
  ];
  const record = {
    slug: skill.slug,
    name: skill.name,
    category: skill.category,
    templatedShortDefinition: matchesAny(skill.shortDefinition, patterns.templatedShortDefinition),
    genericDevelopment: listMatches(development, patterns.genericDevelopment),
    genericMistake: listMatches(skill.commonMistakes, patterns.genericMistake),
    placeholderTool: listMatches(skill.tools, patterns.placeholderTool),
  };

  const affected = record.templatedShortDefinition || record.genericDevelopment.length || record.genericMistake.length || record.placeholderTool.length;
  if (!affected) continue;

  counts.affectedRecords += 1;
  if (record.templatedShortDefinition) counts.templatedShortDefinition += 1;
  if (record.genericDevelopment.length) counts.genericDevelopment += 1;
  if (record.genericMistake.length) counts.genericMistake += 1;
  if (record.placeholderTool.length) counts.placeholderTool += 1;
  findings.push(record);
}

console.log(`[legacy-quality] audited ${skills.length} skill records`);
console.log(`[legacy-quality] affected records: ${counts.affectedRecords}`);
console.log(`[legacy-quality] templated short definitions: ${counts.templatedShortDefinition}`);
console.log(`[legacy-quality] generic development ladders: ${counts.genericDevelopment}`);
console.log(`[legacy-quality] generic mistake lists: ${counts.genericMistake}`);
console.log(`[legacy-quality] placeholder tool lists: ${counts.placeholderTool}`);

const byCategory = findings.reduce((acc, item) => {
  acc[item.category] = (acc[item.category] || 0) + 1;
  return acc;
}, {});
console.log('[legacy-quality] affected by category:', JSON.stringify(byCategory, null, 2));

if (process.argv.includes('--details')) {
  console.log(JSON.stringify(findings, null, 2));
}
