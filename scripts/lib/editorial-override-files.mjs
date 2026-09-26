export const editorialBatchFiles = [
  'skill-editorial-overrides-problem-project.json',
  'skill-editorial-overrides-decision-org-development.json',
  'skill-editorial-overrides-information-workflows.json',
  'skill-editorial-overrides-team-performance.json',
  'skill-editorial-overrides-strategic-planning.json',
  'skill-editorial-overrides-change-management.json',
  'skill-editorial-overrides-innovation-management.json',
];

export const editorialPatchFiles = [
  'skill-editorial-overrides-decision-org-polish.json',
  'skill-editorial-overrides-information-workflow-careers.json',
  'skill-editorial-overrides-reviewed-metadata-polish.json',
];

const editorialBatchSlugTargets = {
  'skill-editorial-overrides-team-performance.json': {
    'team-building-1': 'team-building',
    'performance-management-1': 'performance-management',
  },
  'skill-editorial-overrides-strategic-planning.json': {
    'strategic-planning-1': 'strategic-planning',
  },
  'skill-editorial-overrides-change-management.json': {
    'change-management-2': 'change-management',
  },
  'skill-editorial-overrides-innovation-management.json': {
    'innovation-management-1': 'innovation-management',
  },
};

export function resolveEditorialBatchSlug(batchFile, slug) {
  return editorialBatchSlugTargets[batchFile]?.[slug] ?? slug;
}
