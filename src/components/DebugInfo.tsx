import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { isDemoMode, getEnvironmentInfo } from '@/config/environment';

const DebugInfo = () => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-sm">Debug Info</CardTitle>
      </CardHeader>
      <CardContent className="text-xs space-y-1">
        <p><strong>VITE_DEMO_MODE:</strong> {import.meta.env.VITE_DEMO_MODE || 'undefined'}</p>
        <p><strong>isDemoMode():</strong> {isDemoMode().toString()}</p>
        <p><strong>Environment Info:</strong> {JSON.stringify(getEnvironmentInfo())}</p>
        <p><strong>Type of VITE_DEMO_MODE:</strong> {typeof import.meta.env.VITE_DEMO_MODE}</p>
      </CardContent>
    </Card>
  );
};

export default DebugInfo; 