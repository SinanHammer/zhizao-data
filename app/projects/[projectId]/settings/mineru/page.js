import MinerUSettings from '@/components/settings/MinerUSettings';

export default function MinerUSettingsPage({ params }) {
    const { projectId } = params;
    return <MinerUSettings projectId={projectId} />;
} 