import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const values = {
  utm_source: "meta",
  utm_medium: "paid_social",
  utm_campaign: "mygcover_launch",
  utm_content: "test_setup",
  utm_term: "",
};

const evaluationForm = await readFile("components/evaluation-form.tsx", "utf8");
const schema = await readFile("lib/lead-schema.ts", "utf8");
const route = await readFile("app/api/leads/route.ts", "utf8");
const supabase = await readFile("lib/supabase-server.ts", "utf8");
const migration = await readFile("supabase/migrations/20260906130000_add_utm_attribution_to_leads.sql", "utf8");
const metaPixel = await readFile("components/meta-pixel.tsx", "utf8");

test("captures the campaign UTM values and preserves new URL values", () => {
  const url = new URL("https://mygcover.com/evaluacion");
  Object.entries(values).forEach(([key, value]) => url.searchParams.set(key, value));

  const stored = {
    utm_source: "",
    utm_medium: "",
    utm_campaign: "old_campaign",
    utm_content: "",
    utm_term: "",
  };
  const merged = { ...stored };
  for (const key of Object.keys(values)) {
    const value = url.searchParams.get(key);
    if (value) merged[key] = value;
  }

  assert.deepEqual(merged, { ...values });
  assert.match(evaluationForm, /new URLSearchParams\(window\.location\.search\)/);
  assert.match(evaluationForm, /\.\.\.utmParams\.current/);
});

test("keeps UTM values in the server persistence contract", () => {
  for (const key of Object.keys(values)) {
    assert.match(schema, new RegExp(`${key}:`));
    assert.match(route, new RegExp(`${key}`));
    assert.match(supabase, new RegExp(`${key}`));
    assert.match(migration, new RegExp(`add column if not exists ${key} text`));
  }

  assert.match(evaluationForm, /window\.fbq\?\.\("track", "Lead"\)/);
  assert.doesNotMatch(evaluationForm, /fbq\?\.\("track", "Lead",/);
});

test("initializes Meta Pixel once and tracks ready navigations without personal data", () => {
  assert.equal((metaPixel.match(/id=\"meta-pixel\"/g) ?? []).length, 1);
  assert.equal((metaPixel.match(/fbq\('init', '\$\{pixelId\}'\)/g) ?? []).length, 1);
  assert.match(metaPixel, /onReady=\{\(\) => setPixelReady\(true\)\}/);
  assert.match(metaPixel, /window\.fbq\?\.\("track", "PageView"\)/);
  assert.doesNotMatch(metaPixel, /fullName|email|phone|country|answers|leadForm/);
});