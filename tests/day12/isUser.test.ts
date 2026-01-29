/**
 * Day12: 型述語（Type Predicate）のテスト
 */

import {
  isUser,
  isAdmin,
  isGuest,
  type Account,
} from '../../solutions/day12/isUser';

describe('isUser', () => {
  const user: Account = {
    type: 'user',
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',
  };

  const admin: Account = {
    type: 'admin',
    id: 2,
    name: 'Bob',
    permissions: ['read', 'write', 'delete'],
  };

  const guest: Account = {
    type: 'guest',
    sessionId: 'session-abc123',
    expiresAt: new Date('2025-12-31'),
  };

  test('正常系: User型のアカウントに対してtrueを返す', () => {
    expect(isUser(user)).toBe(true);
  });

  test('正常系: Admin型のアカウントに対してfalseを返す', () => {
    expect(isUser(admin)).toBe(false);
  });

  test('正常系: Guest型のアカウントに対してfalseを返す', () => {
    expect(isUser(guest)).toBe(false);
  });

  test('型の絞り込み: isUserがtrueの場合、emailプロパティにアクセスできる', () => {
    if (isUser(user)) {
      // 型述語によりUser型として扱える
      expect(user.email).toBe('alice@example.com');
    }
  });
});

describe('isAdmin', () => {
  const user: Account = {
    type: 'user',
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',
  };

  const admin: Account = {
    type: 'admin',
    id: 2,
    name: 'Bob',
    permissions: ['read', 'write', 'delete'],
  };

  const guest: Account = {
    type: 'guest',
    sessionId: 'session-abc123',
    expiresAt: new Date('2025-12-31'),
  };

  test('正常系: Admin型のアカウントに対してtrueを返す', () => {
    expect(isAdmin(admin)).toBe(true);
  });

  test('正常系: User型のアカウントに対してfalseを返す', () => {
    expect(isAdmin(user)).toBe(false);
  });

  test('正常系: Guest型のアカウントに対してfalseを返す', () => {
    expect(isAdmin(guest)).toBe(false);
  });

  test('型の絞り込み: isAdminがtrueの場合、permissionsプロパティにアクセスできる', () => {
    if (isAdmin(admin)) {
      // 型述語によりAdmin型として扱える
      expect(admin.permissions).toEqual(['read', 'write', 'delete']);
    }
  });
});

describe('isGuest', () => {
  const user: Account = {
    type: 'user',
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',
  };

  const admin: Account = {
    type: 'admin',
    id: 2,
    name: 'Bob',
    permissions: ['read', 'write', 'delete'],
  };

  const guest: Account = {
    type: 'guest',
    sessionId: 'session-abc123',
    expiresAt: new Date('2025-12-31'),
  };

  test('正常系: Guest型のアカウントに対してtrueを返す', () => {
    expect(isGuest(guest)).toBe(true);
  });

  test('正常系: User型のアカウントに対してfalseを返す', () => {
    expect(isGuest(user)).toBe(false);
  });

  test('正常系: Admin型のアカウントに対してfalseを返す', () => {
    expect(isGuest(admin)).toBe(false);
  });

  test('型の絞り込み: isGuestがtrueの場合、sessionIdプロパティにアクセスできる', () => {
    if (isGuest(guest)) {
      // 型述語によりGuest型として扱える
      expect(guest.sessionId).toBe('session-abc123');
    }
  });
});

describe('配列のフィルタリングでの活用', () => {
  const accounts: Account[] = [
    { type: 'user', id: 1, name: 'Alice', email: 'alice@example.com' },
    { type: 'admin', id: 2, name: 'Bob', permissions: ['read'] },
    { type: 'guest', sessionId: 'sess1', expiresAt: new Date() },
    { type: 'user', id: 3, name: 'Charlie', email: 'charlie@example.com' },
    { type: 'admin', id: 4, name: 'Diana', permissions: ['read', 'write'] },
  ];

  test('filterでUser型のみを抽出できる', () => {
    const users = accounts.filter(isUser);
    expect(users).toHaveLength(2);
    expect(users[0]!.email).toBe('alice@example.com');
    expect(users[1]!.email).toBe('charlie@example.com');
  });

  test('filterでAdmin型のみを抽出できる', () => {
    const admins = accounts.filter(isAdmin);
    expect(admins).toHaveLength(2);
    expect(admins[0]!.permissions).toEqual(['read']);
    expect(admins[1]!.permissions).toEqual(['read', 'write']);
  });

  test('filterでGuest型のみを抽出できる', () => {
    const guests = accounts.filter(isGuest);
    expect(guests).toHaveLength(1);
    expect(guests[0]!.sessionId).toBe('sess1');
  });
});
