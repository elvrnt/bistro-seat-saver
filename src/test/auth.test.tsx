/**
 * 10 test cases for authentication module (auth-storage + AuthContext).
 *
 * TC-01: Password hash is deterministic for the same input
 * TC-02: Different passwords produce different hashes
 * TC-03: Email lookup is case-insensitive
 * TC-04: Saved user can be found by email
 * TC-05: Public user object does not expose password hash
 * TC-06: Session id can be stored and cleared
 * TC-07: Successful user registration
 * TC-08: Registration fails for duplicate email
 * TC-09: Registration fails for password shorter than 6 characters
 * TC-10: Login succeeds with valid credentials and fails with wrong password
 */

import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import {
  clearSession,
  findUserByEmail,
  getSessionUserId,
  hashPassword,
  saveUser,
  setSessionUserId,
  toPublicUser,
} from "@/lib/auth-storage";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import type { StoredUser } from "@/types/auth";

const wrapper = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

async function createStoredUser(
  email: string,
  password: string,
  overrides: Partial<StoredUser> = {}
): Promise<StoredUser> {
  const user: StoredUser = {
    id: "existing-user-id",
    name: "Existing User",
    email: email.trim().toLowerCase(),
    passwordHash: await hashPassword(password),
    ...overrides,
  };
  saveUser(user);
  return user;
}

describe("Authentication test suite", () => {
  // TC-01
  it("TC-01: password hash is deterministic for the same input", async () => {
    const hash1 = await hashPassword("secret123");
    const hash2 = await hashPassword("secret123");
    expect(hash1).toBe(hash2);
    expect(hash1).toHaveLength(64);
  });

  // TC-02
  it("TC-02: different passwords produce different hashes", async () => {
    const hashA = await hashPassword("passwordA");
    const hashB = await hashPassword("passwordB");
    expect(hashA).not.toBe(hashB);
  });

  // TC-03
  it("TC-03: email lookup is case-insensitive", async () => {
    await createStoredUser("user@example.com", "password123");
    expect(findUserByEmail("USER@EXAMPLE.COM")?.email).toBe("user@example.com");
  });

  // TC-04
  it("TC-04: saved user can be found by email", async () => {
    await createStoredUser("anna@example.com", "password123", { name: "Anna" });
    const found = findUserByEmail("anna@example.com");
    expect(found).toBeDefined();
    expect(found?.name).toBe("Anna");
  });

  // TC-05
  it("TC-05: public user object does not expose password hash", async () => {
    const stored = await createStoredUser("public@example.com", "password123");
    const publicUser = toPublicUser(stored);
    expect(publicUser).toEqual({
      id: stored.id,
      name: stored.name,
      email: stored.email,
    });
    expect("passwordHash" in publicUser).toBe(false);
  });

  // TC-06
  it("TC-06: session id can be stored and cleared", () => {
    setSessionUserId("session-user-1");
    expect(getSessionUserId()).toBe("session-user-1");
    clearSession();
    expect(getSessionUserId()).toBeNull();
  });

  // TC-07
  it("TC-07: successful user registration", async () => {
    vi.spyOn(crypto, "randomUUID").mockReturnValue("test-user-id-0001");

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    let registerResult: Awaited<ReturnType<typeof result.current.register>> | undefined;
    await act(async () => {
      registerResult = await result.current.register({
        name: "Ivan Ivanov",
        email: "ivan@example.com",
        phone: "+7 900 000-00-00",
        password: "password123",
      });
    });

    expect(registerResult).toEqual({ ok: true });
    expect(result.current.user).toEqual({
      id: "test-user-id-0001",
      name: "Ivan Ivanov",
      email: "ivan@example.com",
      phone: "+7 900 000-00-00",
    });
    expect(getSessionUserId()).toBe("test-user-id-0001");
  });

  // TC-08
  it("TC-08: registration fails for duplicate email", async () => {
    await createStoredUser("duplicate@example.com", "password123");
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    let registerResult: Awaited<ReturnType<typeof result.current.register>> | undefined;
    await act(async () => {
      registerResult = await result.current.register({
        name: "Another User",
        email: "duplicate@example.com",
        password: "password456",
      });
    });

    expect(registerResult).toEqual({
      ok: false,
      error: "Пользователь с таким email уже зарегистрирован.",
    });
    expect(result.current.user).toBeNull();
  });

  // TC-09
  it("TC-09: registration fails for password shorter than 6 characters", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    let registerResult: Awaited<ReturnType<typeof result.current.register>> | undefined;
    await act(async () => {
      registerResult = await result.current.register({
        name: "Short Pass",
        email: "short@example.com",
        password: "12345",
      });
    });

    expect(registerResult).toEqual({
      ok: false,
      error: "Пароль должен быть не короче 6 символов.",
    });
    expect(findUserByEmail("short@example.com")).toBeUndefined();
  });

  // TC-10
  it("TC-10: login succeeds with valid credentials and fails with wrong password", async () => {
    await createStoredUser("login@example.com", "correct-pass");
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    let wrongLogin: Awaited<ReturnType<typeof result.current.login>> | undefined;
    await act(async () => {
      wrongLogin = await result.current.login({
        email: "login@example.com",
        password: "wrong-pass",
      });
    });

    expect(wrongLogin).toEqual({
      ok: false,
      error: "Неверный email или пароль.",
    });
    expect(result.current.user).toBeNull();

    let successLogin: Awaited<ReturnType<typeof result.current.login>> | undefined;
    await act(async () => {
      successLogin = await result.current.login({
        email: "login@example.com",
        password: "correct-pass",
      });
    });

    expect(successLogin).toEqual({ ok: true });
    expect(result.current.user?.email).toBe("login@example.com");
    expect(getSessionUserId()).toBe("existing-user-id");
  });
});
