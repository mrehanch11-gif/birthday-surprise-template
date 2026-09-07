import { CREATOR } from '../creator';

export default function CreatorCredit({ prefix = 'Template by' }: { prefix?: string }) {
  return <>{prefix} <a href={CREATOR.repository} target="_blank" rel="noreferrer">{CREATOR.name}</a></>;
}
