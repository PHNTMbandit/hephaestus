import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import { CurrentPageTitle } from '#/components/current-page-title'
import { ExploreDashboard } from '#/features/explore/components/dashboard'
import { Palette } from '#/features/palette/components/palette'

export const Route = createFileRoute('/_app/')({ component: Home })

function Home() {
  return (
    <div className="flex size-full min-h-0 flex-col overflow-hidden">
      <CurrentPageTitle />
      <React.Suspense fallback={<Palette.GridSkeleton />}>
        <ExploreDashboard />
      </React.Suspense>
    </div>
  )
}
