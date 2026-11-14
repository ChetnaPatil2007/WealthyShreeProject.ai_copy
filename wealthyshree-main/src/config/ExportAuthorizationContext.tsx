import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react"
import { createExportAuthorizationChecker } from "./exportAuthorization"
import type {
  ExportAuthorizationChecker,
  ExportAuthorizationContextValue,
} from "./exportAuthorization"
import type { AuthorizationResult, Permission, RoleKey } from "../types/roles"

const ExportAuthorizationContext =
  createContext<ExportAuthorizationChecker | null>(null)

const missingContextChecker = createExportAuthorizationChecker(() => null)

export function ExportAuthorizationProvider({
  value,
  children,
}: {
  value: ExportAuthorizationContextValue
  children: ReactNode
}) {
  const latestValue = useRef(value)
  useLayoutEffect(() => {
    latestValue.current = value
  }, [value])

  const checker = useMemo(
    () => createExportAuthorizationChecker(() => latestValue.current),
    [],
  )

  return (
    <ExportAuthorizationContext.Provider value={checker}>
      {children}
    </ExportAuthorizationContext.Provider>
  )
}

export function useExportAuthorizationChecker(): ExportAuthorizationChecker {
  return useContext(ExportAuthorizationContext) ?? missingContextChecker
}

export function useExportAuthorization(
  permission?: Permission,
  requiredActiveRole?: RoleKey,
): AuthorizationResult {
  return useExportAuthorizationChecker().checkAuthorization(
    permission,
    requiredActiveRole,
  )
}
