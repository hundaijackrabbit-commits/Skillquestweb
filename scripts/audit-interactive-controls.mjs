import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const sourceRoot = path.join(process.cwd(), 'src');

function sourceFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(fullPath);
    return entry.name.endsWith('.tsx') ? [fullPath] : [];
  });
}

function tagName(node) {
  return node.tagName?.getText?.() ?? '';
}

function attributes(node) {
  return new Map(
    (node.attributes?.properties ?? [])
      .filter((property) => property.name?.getText)
      .map((property) => [property.name.getText(), property]),
  );
}

function stringAttribute(node, name) {
  const property = attributes(node).get(name);
  return property?.initializer && ts.isStringLiteral(property.initializer)
    ? property.initializer.text
    : null;
}

function hasActionableAncestor(node) {
  for (let parent = node.parent; parent; parent = parent.parent) {
    if (!ts.isJsxElement(parent)) continue;
    const opening = parent.openingElement;
    const name = tagName(opening);
    const attrs = attributes(opening);
    if (name === 'Link' && attrs.has('href')) return true;
    if (name === 'form' && (attrs.has('action') || attrs.has('onSubmit'))) return true;
  }
  return false;
}

const findings = [];

for (const filePath of sourceFiles(sourceRoot)) {
  const source = fs.readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

  function report(node, message) {
    const location = sourceFile.getLineAndCharacterOfPosition(node.getStart());
    findings.push(`${path.relative(process.cwd(), filePath)}:${location.line + 1} ${message}`);
  }

  function visit(node) {
    const opening = ts.isJsxElement(node)
      ? node.openingElement
      : ts.isJsxSelfClosingElement(node)
        ? node
        : null;

    if (opening) {
      const name = tagName(opening);
      const attrs = attributes(opening);

      if (name === 'Link') {
        if (!attrs.has('href')) report(opening, 'Link is missing href.');
        const href = stringAttribute(opening, 'href');
        if (href === '' || href === '#') report(opening, `Link uses placeholder href ${JSON.stringify(href)}.`);
      }

      if (name === 'Button' || name === 'button') {
        const type = stringAttribute(opening, 'type');
        const hasOwnAction = attrs.has('onClick') || attrs.has('formAction') || attrs.has('href');
        const isSubmit = type === 'submit';
        if (!hasOwnAction && !isSubmit && !hasActionableAncestor(node)) {
          report(opening, `<${name}> has no click handler, form action, or link destination.`);
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
}

console.log('Modern Skill Lab interactive-control audit');
console.log(`TSX files checked: ${sourceFiles(sourceRoot).length}`);
console.log(`Dead or placeholder controls: ${findings.length}`);

if (findings.length > 0) {
  console.log('\nFindings:');
  findings.forEach((finding) => console.log(`- ${finding}`));
  process.exitCode = 1;
}
