// Regression tests for local progress preservation and additive cloud reconciliation.
// Run with Node 24: node --test scripts/learning-progress.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getLearningProfile,
  recordLearningActivity,
  mergeLearningActivitiesFromCloud,
} from '../src/lib/learning-progress.ts';

const storage = new Map();
let denyWrites = false;
let denyReads = false;
let dispatched = 0;
globalThis.window = {
  localStorage: {
    getItem(key) {
      if (denyReads) throw new Error('Browser storage blocked');
      return storage.get(key) ?? null;
    },
    setItem(key, value) {
      if (denyWrites) throw new Error('Browser quota exceeded');
      storage.set(key, value);
    },
    removeItem(key) { storage.delete(key); },
  },
  dispatchEvent() { dispatched += 1; },
};
globalThis.CustomEvent = class CustomEvent {
  constructor(type, options) { this.type = type; this.detail = options?.detail; }
};

const accountA = 'member-a';
const accountB = 'member-b';
const keyFor = (id) => `msl_learning_profile_v1:${id}`;
const cloud = (id, xp, completedAt = '2026-11-17T12:00:00.000Z') => ({
  id, kind: 'knowledge-check', skillSlug: 'communication', xp, completedAt,
});

function reset() {
  storage.clear();
  denyReads = false;
  denyWrites = false;
  dispatched = 0;
}

test('unreadable data is not erased', () => {
  reset();
  const corrupted = '{unexpected unfinished JSON';
  storage.set(keyFor(accountA), corrupted);
  assert.equal(getLearningProfile(accountA).activities.length, 0);
  assert.equal(storage.get(keyFor(accountA)), corrupted);
  denyReads = true;
  assert.equal(getLearningProfile(accountA).activities.length, 0);
  denyReads = false;
  assert.equal(storage.get(keyFor(accountA)), corrupted);
});

test('local completions retain their existing identity and cannot award XP twice', () => {
  reset();
  recordLearningActivity({ id: 'check:one', kind: 'knowledge-check', skillSlug: 'communication', xp: 40 }, accountA);
  recordLearningActivity({ id: 'check:one', kind: 'knowledge-check', skillSlug: 'communication', xp: 40 }, accountA);
  assert.equal(getLearningProfile(accountA).totalXp, 40);
  assert.equal(getLearningProfile(accountA).activities.length, 1);
});

test('cloud reconciliation is additive and idempotent', () => {
  reset();
  recordLearningActivity({ id: 'check:one', kind: 'knowledge-check', skillSlug: 'communication', xp: 40 }, accountA);
  const first = mergeLearningActivitiesFromCloud(accountA, [
    cloud('check:one', 999), // cloud conflict may not overwrite original local value
    cloud('check:two', 20),
    cloud('check:two', 20),
    cloud('invalid-xp', -1),
    cloud('invalid-date', 10, 'unparseable'),
  ]);
  assert.equal(first.activities.length, 2);
  assert.equal(first.totalXp, 60);
  assert.equal(first.activities.find((a) => a.id === 'check:one')?.xp, 40);
  const localBeforeRetry = storage.get(keyFor(accountA));
  const second = mergeLearningActivitiesFromCloud(accountA, [cloud('check:two', 20)]);
  assert.equal(second.activities.length, 2);
  assert.equal(second.totalXp, 60);
  assert.equal(storage.get(keyFor(accountA)), localBeforeRetry);
});

test('cloud import never mixes activity records across accounts', () => {
  reset();
  mergeLearningActivitiesFromCloud(accountA, [cloud('check:one', 30)]);
  assert.equal(getLearningProfile(accountA).totalXp, 30);
  assert.equal(getLearningProfile(accountB).totalXp, 0);
  mergeLearningActivitiesFromCloud(accountB, [cloud('check:two', 15)]);
  assert.equal(getLearningProfile(accountA).activities.length, 1);
  assert.equal(getLearningProfile(accountB).activities.length, 1);
});

test('a failed write preserves previously stored progress', () => {
  reset();
  recordLearningActivity({ id: 'check:one', kind: 'knowledge-check', skillSlug: 'communication', xp: 40 }, accountA);
  const before = storage.get(keyFor(accountA));
  const eventsBefore = dispatched;
  denyWrites = true;
  const attempted = recordLearningActivity({ id: 'check:two', kind: 'knowledge-check', skillSlug: 'communication', xp: 30 }, accountA);
  assert.equal(attempted.totalXp, 40);
  assert.equal(dispatched, eventsBefore);
  assert.equal(storage.get(keyFor(accountA)), before);
  mergeLearningActivitiesFromCloud(accountA, [cloud('check:three', 10)]);
  assert.equal(storage.get(keyFor(accountA)), before);
  denyWrites = false;
  assert.equal(getLearningProfile(accountA).totalXp, 40);
});
