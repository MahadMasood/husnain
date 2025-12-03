"use client";
import React from 'react'
import dynamic from 'next/dynamic';
const TargetCursor = dynamic(() => import('@/components/ui/TargetCursor'), { ssr: false });

export default function CursorProvider() {
  return (
     <TargetCursor
          spinDuration={2}
          hideDefaultCursor={true}
          parallaxOn={true}
        />
  )
}
