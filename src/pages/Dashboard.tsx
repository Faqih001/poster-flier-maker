
import React from 'react';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDesigns } from '@/hooks/useDesigns';
import { Plus, Edit, Download, Trash2, Printer } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { designs, loading, deleteDesign } = useDesigns();

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Sign In Required</h1>
            <p className="text-xl mb-8">Please sign in to access your dashboard</p>
            <Button
              onClick={() => navigate('/auth')}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              Sign In
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">My Posters</h1>
              <p className="text-gray-600">Manage and download your poster designs</p>
            </div>
            <Button
              onClick={() => navigate('/create')}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Poster
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="text-xl text-gray-600">Loading your designs...</div>
            </div>
          ) : designs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-600 mb-4">You haven't created any posters yet.</div>
              <Button
                onClick={() => navigate('/create')}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                Create Your First Poster
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {designs.map((design) => (
                <Card key={design.id} className="group hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg mb-3 flex items-center justify-center">
                      <div className="text-4xl text-purple-600">🎨</div>
                    </div>
                    <CardTitle className="text-lg truncate">{design.title}</CardTitle>
                    <p className="text-sm text-gray-500">
                      Created {new Date(design.created_at).toLocaleDateString()}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 mb-3">
                      <Badge variant="secondary">Template</Badge>
                      <Badge variant="outline">Ready</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          // TODO: Implement edit functionality
                          console.log('Edit design:', design.id);
                        }}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          // TODO: Implement download functionality
                          console.log('Download design:', design.id);
                        }}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate('/order-prints', { state: { design } })}
                      >
                        <Printer className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteDesign(design.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
