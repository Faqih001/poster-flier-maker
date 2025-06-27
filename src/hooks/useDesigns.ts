
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface Design {
  id: string;
  title: string;
  template_data: any;
  created_at: string;
  updated_at: string;
}

export const useDesigns = () => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchDesigns = async () => {
    if (!user) {
      setDesigns([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('designs')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error fetching designs:', error);
        toast.error('Failed to load your designs');
      } else {
        setDesigns(data || []);
      }
    } catch (error) {
      console.error('Error fetching designs:', error);
      toast.error('Failed to load your designs');
    } finally {
      setLoading(false);
    }
  };

  const saveDesign = async (title: string, templateData: any) => {
    if (!user) {
      toast.error('Please sign in to save designs');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('designs')
        .insert([
          {
            title,
            template_data: templateData,
            user_id: user.id
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Error saving design:', error);
        toast.error('Failed to save design');
        return null;
      } else {
        toast.success('Design saved successfully!');
        await fetchDesigns(); // Refresh the list
        return data;
      }
    } catch (error) {
      console.error('Error saving design:', error);
      toast.error('Failed to save design');
      return null;
    }
  };

  const updateDesign = async (id: string, title: string, templateData: any) => {
    if (!user) {
      toast.error('Please sign in to update designs');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('designs')
        .update({
          title,
          template_data: templateData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating design:', error);
        toast.error('Failed to update design');
        return null;
      } else {
        toast.success('Design updated successfully!');
        await fetchDesigns(); // Refresh the list
        return data;
      }
    } catch (error) {
      console.error('Error updating design:', error);
      toast.error('Failed to update design');
      return null;
    }
  };

  const deleteDesign = async (id: string) => {
    if (!user) {
      toast.error('Please sign in to delete designs');
      return false;
    }

    try {
      const { error } = await supabase
        .from('designs')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting design:', error);
        toast.error('Failed to delete design');
        return false;
      } else {
        toast.success('Design deleted successfully!');
        await fetchDesigns(); // Refresh the list
        return true;
      }
    } catch (error) {
      console.error('Error deleting design:', error);
      toast.error('Failed to delete design');
      return false;
    }
  };

  useEffect(() => {
    fetchDesigns();
  }, [user]);

  return {
    designs,
    loading,
    saveDesign,
    updateDesign,
    deleteDesign,
    refetch: fetchDesigns
  };
};
