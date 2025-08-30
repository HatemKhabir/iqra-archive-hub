import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Download, LogOut, Edit, Trash, FileText, Clock } from "lucide-react";
import Navigation from "@/components/Navigation"; // adjust import
import { deleteKhotba as deleteKhotbaService } from "@/services/khotbaService"; // adjust import
import { Khotba } from "@/data/khotbaInterface";



const AdminDashboard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mosqueName] = useState(localStorage.getItem("mosqueName") || "Mosque");

  // 🟢 Mutation for deletion with optimistic update
  const {
    mutate: khotbaDeletion,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (khotbaId: string) => {
      return deleteKhotbaService(khotbaId);
    },
    /* onMutate: async (khotbaId: string) => {
      await queryClient.cancelQueries({ queryKey: ["khotbas"] });

      const previous = queryClient.getQueryData<PendingKhutbah[]>(["khotbas"]);

      queryClient.setQueryData<PendingKhutbah[]>(["khotbas"], (old) =>
        old ? old.filter((k) => k.id !== khotbaId) : []
      );

      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["khotbas"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["khotbas"] });
    }, */
  });

  const [mosqueKhotbas, setMosqueKhotbas] = useState<Khotba[]>([]);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (auth === "true") {
      setIsAuthenticated(true);
    } else {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/admin");
  };

  const approveKhutbah = (id: string) => {
    setMosqueKhotbas((prev) =>
      prev.map((k) =>
        k.id === id ? { ...k, status: "approved" as const } : k
      )
    );
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {mosqueName} Manager Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage mosque khutbah submissions
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button
              onClick={() =>
                alert("Upload Khotba functionality coming soon!")
              }
              className="bg-gray-300 space-x-2 hover:bg-gray-400 text-gray-800 rounded-xl font-bold p-4 inline-flex items-center"
            >
              <Download className="h-4 w-4 text-primary" />
              <span>Upload Khotba</span>
            </button>
            <button
              onClick={handleLogout}
              className="btn-accent flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <div className="mosque-card">
          <h2 className="text-xl font-bold text-foreground mb-6">
            {mosqueName} Khotbas Overview
          </h2>

          <div className="space-y-4">
            {mosqueKhotbas
              .filter((k) => k.status === "pending")
              .map((k) => (
                <div
                  key={k.id}
                  className="border border-border rounded-lg p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-lg mb-2">
                        {k.title}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                        <div>
                          <p>
                            <span className="font-medium">Mosque:</span>{" "}
                            {k.mosqueName}
                          </p>
                          <p>
                            <span className="font-medium">Location:</span>{" "}
                            {k.city}, {k.country}
                          </p>
                          <p>
                            <span className="font-medium">Language:</span>{" "}
                            {k.language}
                          </p>
                        </div>
                        <div>
                          <p>
                            <span className="font-medium">Topic:</span>{" "}
                            {k.topic}
                          </p>
                          <p>
                            <span className="font-medium">Date:</span>{" "}
                            {k.date}
                          </p>
                          <p>
                            <span className="font-medium">Type:</span>{" "}
                            {k.type}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mb-3">
                        {k.hasAudio && (
                          <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded">
                            Audio
                          </span>
                        )}
                        {k.hasVideo && (
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                            Video
                          </span>
                        )}
                        <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>Pending Review</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 ml-4">
                      <button
                        onClick={() => approveKhutbah(k.id)}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => khotbaDeletion(k.id)}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors"
                      >
                        <Trash className="h-4 w-4" />
                        <span>
                          {isPending ? "Deleting..." : "Delete"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {mosqueKhotbas.filter((k) => k.status === "pending").length === 0 && (
            <div className="text-center py-8">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No previous khutbah submissions
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
