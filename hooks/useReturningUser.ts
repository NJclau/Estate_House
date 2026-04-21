// hooks/useReturningUser.ts
// Detects returning users based on localStorage timestamps
// Runs once on mount — does not re-evaluate during session
//
// Source: Estate2.0 Website Spec Section 8

"use client";

import { useState, useEffect } from "react";
import { isReturningUser, markReturningUser } from "@/lib/storage";

interface ReturningUserState {
  isReturning: boolean;
  isReady: boolean;
}

export function useReturningUser(): ReturningUserState {
  const [isReturning, setIsReturning] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Detect
    const returning = isReturningUser();
    setIsReturning(returning);

    // Mark for next visit (idempotent — sets flag + timestamp)
    markReturningUser();
    setIsReady(true);
  }, []);

  return { isReturning, isReady };
}
