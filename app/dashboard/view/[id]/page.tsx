"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Edit } from "lucide-react";
import CVPreview from "@/app/components/CVPreview";
import type { PersonalDetails, Experience, Education, Language, Skill, Hobby } from "@/type";

interface CVData {
  id: string;
  title: string;
  personalDetails: PersonalDetails;
  experiences: Experience[];
  educations: Education[];
  languages: Language[];
  skills: Skill[];
  hobbies: Hobby[];
  theme: string;
  template: string;
}

export default function ViewCV() {
  const router = useRouter();
  const params = useParams();
  const cvId = params.id as string;
  const [isLoading, setIsLoading] = useState(true);
  const [cv, setCv] = useState<CVData | null>(null);

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

  if (!cv) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Retour au dashboard
            </Link>
            <h1 className="text-lg font-semibold text-gray-900">{cv.title}</h1>
            <div className="flex gap-3">
              <button
                onClick={() => window.location.reload()}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                🔄 Actualiser
              </button>
              <button
                onClick={() => router.push(`/dashboard/edit/${cvId}`)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
              >
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </button>
              <button
                onClick={() => alert("Téléchargement à venir !")}
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Télécharger PDF
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* CV Preview - Utilise le même composant que l'éditeur */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          <CVPreview
            personalDetails={cv.personalDetails}
            experiences={cv.experiences}
            educations={cv.educations}
            languages={cv.languages}
            skills={cv.skills}
            hobbies={cv.hobbies}
            theme={cv.theme || "cupcake"}
            zoom={100}
          />
        </div>
      </div>
    </div>
  );
}
