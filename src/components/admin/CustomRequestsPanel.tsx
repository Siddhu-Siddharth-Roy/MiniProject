
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

interface CustomRequest {
  id: string;
  title: string;
  status: string;
  date: string;
}

interface CustomRequestsPanelProps {
  customRequests: CustomRequest[];
  pendingRequests: number;
}

const CustomRequestsPanel = ({ customRequests }: CustomRequestsPanelProps) => {
  const navigate = useNavigate();
  const recentRequests = customRequests.slice(0, 3);

  return (
    <div className="glass-panel p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Custom Design Requests</h3>
        {/* Removed the pending requests count */}
      </div>
      
      {recentRequests.length > 0 ? (
        <div className="space-y-4">
          {recentRequests.map(request => (
            <div key={request.id} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
              <div className="flex items-center">
                <FileText size={18} className="text-towel-blue mr-3" />
                <div>
                  <h4 className="text-sm font-medium">{request.title}</h4>
                  <p className="text-xs text-towel-gray">
                    {new Date(request.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                request.status === 'pending' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : request.status === 'approved'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {request.status}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center py-4 text-towel-gray">No custom requests yet.</p>
      )}
      
      <Button 
        variant="outline" 
        className="w-full mt-4"
        onClick={() => navigate('/admin/custom-requests')}
      >
        View All Requests
      </Button>
    </div>
  );
};

export default CustomRequestsPanel;
