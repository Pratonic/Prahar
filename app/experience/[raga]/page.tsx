import { notFound } from 'next/navigation';
import { ragas, getRagaById } from '@/data/ragas';
import QrExperienceClient from './QrExperienceClient';

export function generateStaticParams() {
  return ragas.map((raga) => ({
    raga: raga.id,
  }));
}

export default async function RagaExperiencePage({
  params,
}: {
  params: Promise<{ raga: string }>;
}) {
  const resolvedParams = await params;
  const raga = getRagaById(resolvedParams.raga);

  if (!raga) {
    notFound();
  }

  return <QrExperienceClient raga={raga} />;
}
