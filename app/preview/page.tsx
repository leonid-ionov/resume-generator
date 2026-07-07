'use client';
import { Suspense } from 'react';
import { ResumePreviewPage } from '../../src/views/ResumePreviewPage/ResumePreviewPage';

export default function Page() {
  return (
    <Suspense>
      <ResumePreviewPage />
    </Suspense>
  );
}
