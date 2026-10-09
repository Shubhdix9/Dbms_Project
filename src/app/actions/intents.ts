'use server'

import fs from 'fs';
import path from 'path';

const INTENTS_FILE = path.join(process.cwd(), 'uninest_intents_db.json');

export async function getIntentsAction() {
  try {
    if (fs.existsSync(INTENTS_FILE)) {
      const data = fs.readFileSync(INTENTS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading intents:', e);
  }
  return [];
}

export async function saveIntentAction(intent: any) {
  try {
    let intents = [];
    if (fs.existsSync(INTENTS_FILE)) {
      intents = JSON.parse(fs.readFileSync(INTENTS_FILE, 'utf8'));
    }
    const existingIndex = intents.findIndex((i: any) => i.id === intent.id);
    if (existingIndex > -1) {
      intents[existingIndex] = intent;
    } else {
      intents.push(intent);
    }
    fs.writeFileSync(INTENTS_FILE, JSON.stringify(intents, null, 2));
    return intents;
  } catch (e) {
    console.error('Error saving intent:', e);
    return [];
  }
}

export async function removeIntentAction(id: string) {
  try {
    let intents = [];
    if (fs.existsSync(INTENTS_FILE)) {
      intents = JSON.parse(fs.readFileSync(INTENTS_FILE, 'utf8'));
    }
    const filtered = intents.filter((i: any) => i.id !== id);
    fs.writeFileSync(INTENTS_FILE, JSON.stringify(filtered, null, 2));
    return filtered;
  } catch (e) {
    console.error('Error removing intent:', e);
    return [];
  }
}
