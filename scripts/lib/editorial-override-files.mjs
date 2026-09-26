export const editorialBatchFiles = [
  'skill-editorial-overrides-problem-project.json',
  'skill-editorial-overrides-decision-org-development.json',
  'skill-editorial-overrides-information-workflows.json',
  'skill-editorial-overrides-team-performance.json',
  'skill-editorial-overrides-strategic-planning.json',
];

export const editorialPatchFiles = [
  'skill-editorial-overrides-decision-org-polish.json',
  'skill-editorial-overrides-information-workflow-careers.json',
];

const editorialBatchSlugTargets = {
  'skill-editorial-overrides-team-performance.json': {
    'team-building-1': 'team-building',
    'performance-management-1': 'performance-management',
  },
  'skill-editorial-overrides-strategic-planning.json': {
    'strategic-planning-1': 'strategic-planning',
  },
};

export function resolveEditorialBatchSlug(batchFile, slug) {
  return editorialBatchSlugTargets[batchFile]?.[slug] ?? slug;
}
