import { authorizePermission } from "./roles"
import type {
  AuthorizationResult,
  Permission,
  RoleConfig,
  RoleKey,
  UserSession,
} from "../types/roles"

export interface ExportAuthorizationContextValue {
  roleConfig: RoleConfig
  userSession: UserSession
}

export interface ExportAuthorizationChecker {
  checkAuthorization: (
    permission?: Permission,
    requiredActiveRole?: RoleKey,
  ) => AuthorizationResult
  getActiveRole: () => RoleKey | null
}

export function createExportAuthorizationChecker(
  getContext: () => ExportAuthorizationContextValue | null,
): ExportAuthorizationChecker {
  const getActiveRole = () => getContext()?.userSession.activeRoleKey ?? null

  const checkAuthorization = (
    permission?: Permission,
    requiredActiveRole?: RoleKey,
  ): AuthorizationResult => {
    if (!permission) return { allowed: true }

    const context = getContext()
    if (!context) {
      return {
        allowed: false,
        requiredPermission: permission,
        reason: "Exporting this data requires verified permissions.",
        requiresVerification: true,
      }
    }

    const authorization = authorizePermission(
      context.userSession,
      permission,
      context.roleConfig,
    )
    if (
      requiredActiveRole &&
      (context.userSession.activeRoleKey !== requiredActiveRole ||
        context.roleConfig.key !== requiredActiveRole)
    ) {
      return {
        allowed: false,
        requiredPermission: permission,
        reason: "This action requires verified permissions.",
        requiresVerification: true,
      }
    }
    return authorization
  }

  return { checkAuthorization, getActiveRole }
}
