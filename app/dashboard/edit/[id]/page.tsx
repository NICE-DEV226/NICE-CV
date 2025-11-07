"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EditCV() {
  const router = useRouter();
  const params = useParams();
  const cvId = params.id as string;
  const [isLoading, setIsLoading] = useState(true);
  const [cv, setCv] = useState<any>(null);

  useEffect(() => {
    const loadCV = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/auth/signin");
          return;
        }

        // Ajouter un timestamp pour éviter le cache
        const timestamp = new Date().getTime();
        const response = await fetch(`/api/cv/get/${cvId}?t=${timestamp}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Cache-Control": "no-cache",
          },
          cache: "no-store",
        });

        if (response.ok) {
          const data = await response.json();
          setCv(data.cv);
          
          // Sauvegarder dans le localStorage pour l'éditeur
          localStorage.setItem("cv-draft", JSON.stringify({
            ...data.cv,
            isEditing: true,
            editingId: cvId,
          }));
          
          // Rediriger vers la page de création qui gère aussi l'édition
          router.push("/dashboard/create");
        } else {
          alert("Erreur lors du chargement du CV");
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Erreur:", error);
        alert("Erreur lors du chargement du CV");
        router.push("/dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    loadCV();
  }, [cvId, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du CV...</p>
        </div>
      </div>
    );
  }

  return null;
}
