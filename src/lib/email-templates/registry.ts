import type { ComponentType } from 'react'

export interface TemplateEntry {
  component: ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  displayName?: string
  previewData?: Record<string, any>
  /** Fixed recipient — overrides caller-provided recipientEmail when set. */
  to?: string
}

import { template as clientConfirmation } from './client-confirmation'
import { template as adminNewLead } from './admin-new-lead'
import { template as clientBriefConfirmation } from './client-brief-confirmation'
import { template as adminNewBrief } from './admin-new-brief'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'client-confirmation': clientConfirmation,
  'admin-new-lead': adminNewLead,
  'client-brief-confirmation': clientBriefConfirmation,
  'admin-new-brief': adminNewBrief,
}
