"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Crown,
  Plus,
  FileText,
  LogOut,
  Eye,
  Edit,
  Trash2,
  Download,
  Star,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface CV {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  template: string;
  isPublic: boolean;
}

interface User {
  id: string;
  email: string;
  name?: string;
  plan: string;
  cvCount: number;
  maxCvs: number;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [cvs, setCvs] = useState<CV[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    
    if (!userData || !token) {
      // Pas de données, nettoyage et redirection
      localStorage.clear();
      sessionStorage.clear();
      router.push("/auth/signin");
      return;
    }

    // Vérifier que le token a le bon format
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      console.error("Token malformé, reconnexion requise");
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/auth/signin";
      return;
    }

    setUser(JSON.parse(userData));
    
    // Récupérer les CVs depuis l'API
    const fetchCVs = async () => {
      try {
        console.log("Récupération des CVs...");
        const response = await fetch("/api/cv/list", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Cache-Control": "no-cache",
          },
          cache: "no-store",
        });

        console.log("Réponse API CVs:", response.status);

        const data = await response.json();

        if (response.status === 401) {
          // Token invalide - régénérer automatiquement
          console.log("Token invalide, régénération...");
          
          const refreshResponse = await fetch("/api/auth/refresh", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: JSON.parse(userData).id }),
          });

          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            localStorage.setItem("token", refreshData.token);
            localStorage.setItem("user", JSON.stringify(refreshData.user));
            // Recharger la page pour utiliser le nouveau token
            window.location.reload();
          } else {
            // Impossible de régénérer, reconnexion requise
            localStorage.clear();
            window.location.href = "/auth/signin";
          }
          return;
        }

        if (response.ok) {
          console.log("CVs reçus:", data.cvs?.length || 0, "CVs");
          console.log("Données:", data);
          setCvs(data.cvs || []);
          // Mettre à jour les infos utilisateur
          if (data.user) {
            const updatedUser = { ...JSON.parse(userData), ...data.user };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
          }
        } else {
          console.error("Erreur API:", response.status, data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des CVs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCVs();
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  const handleDeleteCV = async (cvId: string, cvTitle: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${cvTitle}" ?`)) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/cv/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ cvId }),
      });

      if (response.ok) {
        // Retirer le CV de la liste
        setCvs(cvs.filter(cv => cv.id !== cvId));
        // Mettre à jour le compteur
        if (user) {
          const updatedUser = { ...user, cvCount: user.cvCount - 1 };
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
        alert("CV supprimé avec succès !");
      } else {
        alert("Erreur lors de la suppression du CV");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la suppression du CV");
    }
  };

  const handleDownloadCV = (cvId: string) => {
    console.log("Download CV:", cvId);
    alert("Fonctionnalité de téléchargement à venir ! 📄");
    // TODO: Implémenter le téléchargement PDF
  };

  const handleEditCV = (cvId: string) => {
    router.push(`/dashboard/edit/${cvId}`);
  };

  const handleViewCV = (cvId: string) => {
    router.push(`/dashboard/view/${cvId}`);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  const cvCount = user.cvCount || 0;
  const maxCvs = user.maxCvs || 3;
  const canCreateMore = cvCount < maxCvs;
  const isPremium = user.plan === "PREMIUM";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center">
              <Image
                src="/logo.png"
                alt="NICE-CV Logo"
                width={50}
                height={50}
                className="rounded-xl"
              />
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                NICE-CV
              </span>
            </Link>

            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-gray-900 font-semibold text-sm">{user.name}</p>
                <p className="text-gray-600 text-xs">
                  {isPremium ? (
                    <span className="flex items-center justify-end text-indigo-600">
                      <Crown className="h-3 w-3 mr-1" />
                      Premium
                    </span>
                  ) : (
                    "Gratuit"
                  )}
                </p>
              </div>
              <button
                onClick={handleSignOut}
                className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Déconnexion"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bienvenue, {user.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-gray-600">
            Gérez vos CV professionnels
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Connecté en tant que : {user.email} (ID: {user.id?.substring(0, 8)}...)
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-2xl font-bold text-gray-900">
                  {cvCount}
                </h3>
                <p className="text-gray-600 text-xs">CV créés</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-2xl font-bold text-gray-900">
                  {maxCvs - cvCount}
                </h3>
                <p className="text-gray-600 text-xs">Restants</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Star className="h-5 w-5 text-purple-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-bold text-gray-900">
                  {isPremium ? "Premium" : "Gratuit"}
                </h3>
                <p className="text-gray-600 text-xs">Plan</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <Crown className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-bold text-gray-900">Actif</h3>
                <p className="text-gray-600 text-xs">Statut</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {canCreateMore ? (
            <Link
              href="/dashboard/create"
              onClick={() => {
                localStorage.removeItem("cv-draft");
              }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center hover:shadow-lg hover:scale-105 transition-all"
            >
              <Plus className="h-5 w-5 mr-2" />
              Créer un nouveau CV
            </Link>
          ) : (
            <button
              disabled
              className="bg-gray-300 text-gray-500 px-6 py-3 rounded-lg font-semibold flex items-center justify-center cursor-not-allowed"
            >
              <Plus className="h-5 w-5 mr-2" />
              Limite atteinte
            </button>
          )}

          {!isPremium && (
            <button
              onClick={() => alert("Fonctionnalité de paiement à venir ! 🚀")}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center hover:shadow-lg hover:scale-105 transition-all"
            >
              <Crown className="h-5 w-5 mr-2" />
              Passer à Premium - 5€
            </button>
          )}
        </div>

        {/* Brouillon en cours */}
        {typeof window !== 'undefined' && localStorage.getItem("cv-draft") && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-yellow-600" />
                  Brouillon en cours
                </h3>
                <p className="text-gray-700 text-sm">
                  Vous avez un CV non sauvegardé. Continuez votre travail ou supprimez-le.
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/dashboard/create"
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
                >
                  Continuer
                </Link>
                <button
                  onClick={() => {
                    if (confirm("Êtes-vous sûr de vouloir supprimer ce brouillon ?")) {
                      localStorage.removeItem("cv-draft");
                      window.location.reload();
                    }
                  }}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CV List */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Mes CV</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                🔄 Actualiser
              </button>
              <div className="text-gray-600 text-sm">
                {cvs.length} CV{cvs.length > 1 ? "s" : ""}
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-100 rounded-lg h-20"
                ></div>
              ))}
            </div>
          ) : cvs.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Aucun CV créé
              </h3>
              <p className="text-gray-600 mb-6">
                Commencez par créer votre premier CV professionnel
              </p>
              {canCreateMore && (
                <Link
                  href="/dashboard/create"
                  onClick={() => {
                    localStorage.removeItem("cv-draft");
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Créer mon premier CV
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cvs.map((cv) => (
                <div
                  key={cv.id}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {cv.title}
                    </h3>
                    {cv.isPublic && (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                        Public
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-gray-600 mb-4">
                    <p>Créé le {new Date(cv.createdAt).toLocaleDateString()} à {new Date(cv.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
                    {new Date(cv.updatedAt).getTime() !== new Date(cv.createdAt).getTime() && (
                      <p>
                        Modifié le {new Date(cv.updatedAt).toLocaleDateString()} à {new Date(cv.updatedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 capitalize">
                      {cv.template}
                    </span>
                    <div className="flex space-x-1">
                      <button 
                        onClick={() => handleViewCV(cv.id)}
                        className="p-2 rounded hover:bg-gray-200 transition-colors text-gray-600 hover:text-gray-900" 
                        title="Voir"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleEditCV(cv.id)}
                        className="p-2 rounded hover:bg-gray-200 transition-colors text-gray-600 hover:text-gray-900" 
                        title="Modifier"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDownloadCV(cv.id)}
                        className="p-2 rounded hover:bg-gray-200 transition-colors text-gray-600 hover:text-gray-900" 
                        title="Télécharger"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteCV(cv.id, cv.title)}
                        className="p-2 rounded hover:bg-red-100 transition-colors text-gray-600 hover:text-red-600" 
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upgrade Banner */}
        {!isPremium && (
          <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Passez à Premium
                </h3>
                <p className="text-gray-700 text-sm">
                  Débloquez 10 CV supplémentaires et des templates exclusifs
                </p>
              </div>
              <button
                onClick={() => alert("Fonctionnalité de paiement à venir ! 🚀")}
                className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors flex items-center"
              >
                <Crown className="h-5 w-5 mr-2" />
                5€ seulement
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
