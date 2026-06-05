import React from 'react'

const DoctorCardSkeleton = () => {
  return (
    <div className="group bg-[var(--color-canvas-white)] border border-[var(--border)] rounded-xl overflow-hidden animate-pulse">
      <div className="relative">
        <div className="bg-[var(--surface)] w-full aspect-[4/3]" />
        <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[var(--border)]" />
      </div>
      <div className="p-3">
        <div className="h-4 bg-[var(--surface)] rounded w-3/4 mb-2" />
        <div className="h-3 bg-[var(--surface)] rounded w-1/2 mt-0.5" />
        <div className="h-3 bg-[var(--surface)] rounded w-1/4 mt-2" />
      </div>
    </div>
  )
}

export const DoctorGridSkeleton = ({ count = 10 }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <DoctorCardSkeleton key={index} />
      ))}
    </div>
  )
}

export default DoctorCardSkeleton
