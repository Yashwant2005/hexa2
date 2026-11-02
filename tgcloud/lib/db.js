import { db } from 'sdk';
import { eq } from 'sdk/db';
import { users, kv, battles, sessions } from '../schema.js';

export async function getUserData(userId) {
  try {
    const id = String(userId);
    const row = await db.select().from(users).where(eq(users.id, id)).get();
    if (!row || !row.data) return {};
    return typeof row.data === 'string' ? JSON.parse(row.data) : row.data;
  } catch (err) {
    console.error('Error in getUserData:', err);
    return {};
  }
}

export async function saveUserData(userId, userData) {
  try {
    const id = String(userId);
    const dataStr = typeof userData === 'string' ? userData : JSON.stringify(userData);
    const now = Math.floor(Date.now() / 1000);

    await db.insert(users)
      .values({
        id,
        data: dataStr,
        reset: 0,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: users.id,
        set: {
          data: dataStr,
          updatedAt: now,
        },
      })
      .run();
    return true;
  } catch (err) {
    console.error('Error in saveUserData:', err);
    return false;
  }
}

export async function getKV(key) {
  try {
    const row = await db.select().from(kv).where(eq(kv.id, String(key))).get();
    if (!row || !row.data) return null;
    return typeof row.data === 'string' ? JSON.parse(row.data) : row.data;
  } catch (err) {
    console.error('Error in getKV:', err);
    return null;
  }
}

export async function setKV(key, value) {
  try {
    const id = String(key);
    const dataStr = typeof value === 'string' ? value : JSON.stringify(value);
    const now = Math.floor(Date.now() / 1000);

    await db.insert(kv)
      .values({
        id,
        data: dataStr,
        reset: 0,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: kv.id,
        set: {
          data: dataStr,
          updatedAt: now,
        },
      })
      .run();
    return true;
  } catch (err) {
    console.error('Error in setKV:', err);
    return false;
  }
}

export async function getBattleData(battleId) {
  try {
    const row = await db.select().from(battles).where(eq(battles.id, String(battleId))).get();
    if (!row || !row.data) return {};
    return typeof row.data === 'string' ? JSON.parse(row.data) : row.data;
  } catch (err) {
    console.error('Error in getBattleData:', err);
    return {};
  }
}

export async function saveBattleData(battleId, data) {
  try {
    const id = String(battleId);
    const dataStr = typeof data === 'string' ? data : JSON.stringify(data);
    const now = Math.floor(Date.now() / 1000);

    await db.insert(battles)
      .values({
        id,
        data: dataStr,
        reset: 0,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: battles.id,
        set: {
          data: dataStr,
          updatedAt: now,
        },
      })
      .run();
    return true;
  } catch (err) {
    console.error('Error in saveBattleData:', err);
    return false;
  }
}

export async function deleteBattleData(battleId) {
  try {
    await db.delete(battles).where(eq(battles.id, String(battleId))).run();
    return true;
  } catch (err) {
    console.error('Error in deleteBattleData:', err);
    return false;
  }
}

export async function getSession(sessionKey) {
  try {
    const row = await db.select().from(sessions).where(eq(sessions.id, String(sessionKey))).get();
    if (!row || !row.data) return {};
    return typeof row.data === 'string' ? JSON.parse(row.data) : row.data;
  } catch (err) {
    return {};
  }
}

export async function saveSession(sessionKey, data) {
  try {
    const id = String(sessionKey);
    const dataStr = typeof data === 'string' ? data : JSON.stringify(data);
    const now = Math.floor(Date.now() / 1000);

    await db.insert(sessions)
      .values({
        id,
        data: dataStr,
        reset: 0,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: sessions.id,
        set: {
          data: dataStr,
          updatedAt: now,
        },
      })
      .run();
    return true;
  } catch (err) {
    console.error('Error in saveSession:', err);
    return false;
  }
}

export async function loadMessageData() {
  const kvData = await getKV('msg_data');
  if (kvData) {
    if (kvData.value) return kvData.value;
    return kvData;
  }
  return { battle: [], moves: {}, tutor: {}, _battleTimestamps: {} };
}

export async function saveMessageData(data) {
  return setKV('msg_data', data);
}

export async function getAllUserData() {
  try {
    const rows = await db.select().from(users).all();
    return rows.map((r) => {
      try {
        const parsed = typeof r.data === 'string' ? JSON.parse(r.data) : r.data;
        return { user_id: r.id, data: parsed };
      } catch (e) {
        return { user_id: r.id, data: {} };
      }
    });
  } catch (e) {
    console.error('Error getAllUserData:', e);
    return [];
  }
}
