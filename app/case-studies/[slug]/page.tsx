import { notFound } from 'next/navigation'
import {
  caseStudies,
  getCaseStudyBySlug,
  type CaseStudy,
} from '@/lib/case-studies'
import CaseStudyDetailView from './case-study-detail-view'

export const dynamicParams = false

export function generateStaticParams(): { slug: string }[] {
  return caseStudies.map((study) => ({ slug: study.slug }))
}

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params
  const study: CaseStudy | undefined = getCaseStudyBySlug(slug)

  if (!study) {
    notFound()
  }

  return <CaseStudyDetailView study={study} />
}
