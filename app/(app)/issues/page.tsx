'use client'

import { redirect } from 'next/navigation'
import { mockRepositories } from '@/lib/mock-data'

export default function IssuesPage() {
  // Redirect to the first repository's issues
  if (mockRepositories.length > 0) {
    redirect(`/repo/${mockRepositories[0].name}/issues`)
  }

  return <div>No repositories found</div>
}
