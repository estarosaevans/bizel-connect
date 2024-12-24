import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Plus, Share2, Pencil, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ProfileCreator } from "@/components/ProfileWizard/ProfileCreator";

interface Page {
  id: string;
  title: string;
  created_at: string;
  profile_id: string | null;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState<Page[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPages();
    
    // Check if user is authenticated
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        navigate("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchPages = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: pagesData, error } = await supabase
        .from('pages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPages(pagesData || []);
    } catch (error) {
      console.error('Error fetching pages:', error);
      toast({
        title: "Error",
        description: "Failed to fetch your pages. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async (pageId: string) => {
    const url = `${window.location.origin}/page/${pageId}`;
    await navigator.clipboard.writeText(url);
    toast({
      title: "Link copied!",
      description: "The page URL has been copied to your clipboard.",
    });
  };

  const handleEdit = (pageId: string) => {
    navigate(`/edit-page/${pageId}`);
  };

  const handleDelete = async (pageId: string) => {
    try {
      const { error } = await supabase
        .from('pages')
        .delete()
        .eq('id', pageId);

      if (error) throw error;

      setPages(pages.filter(page => page.id !== pageId));
      toast({
        title: "Success",
        description: "Page deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting page:', error);
      toast({
        title: "Error",
        description: "Failed to delete the page. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Error logging out",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleProfileCreatorComplete = async () => {
    setIsCreating(false);
    await fetchPages();
  };

  if (isCreating) {
    return <ProfileCreator onComplete={handleProfileCreatorComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Pages</h1>
            <p className="text-gray-600 mt-2">Manage your professional profiles and pages</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => setIsCreating(true)} className="whitespace-nowrap">
              <Plus className="h-4 w-4 mr-2" />
              Create New Page
            </Button>
            <Button onClick={handleLogout} variant="outline">
              Log out
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading your pages...</div>
        ) : pages.length === 0 ? (
          <Card className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">No Pages Yet</h2>
            <p className="text-gray-600 mb-6">Create your first professional page to showcase your profile.</p>
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create New Page
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page) => (
              <Card key={page.id} className="p-6">
                <h3 className="text-xl font-semibold mb-4">{page.title}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Created on {new Date(page.created_at).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare(page.id)}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(page.id)}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(page.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;