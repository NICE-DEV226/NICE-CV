"use client";

import { Eye, RotateCw, Save, ArrowLeft, Crown } from "lucide-react";
import Image from "next/image";
import PersonalDetailsForm from "@/app/components/PersonalDetailsForm";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { prepareCVForAPI } from "@/lib/utils/serialize";
import {
  Education,
  Experience,
  Hobby,
  Language,
  PersonalDetails,
  Skill,
} from "@/type";
import {
  educationsPreset,
  experiencesPreset,
  hobbiesPreset,
  languagesPreset,
  personalDetailsPreset,
  skillsPreset,
} from "@/presets";
import CVPreview from "@/app/components/CVPreview";
import ExperienceForm from "@/app/components/ExperienceForm";
import EducationForm from "@/app/components/EducationForm";
import LanguageForm from "@/app/components/LanguageForm";
import SkillForm from "@/app/components/SkillForm";
import HobbyForm from "@/app/components/HobbyForm";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import confetti from "canvas-confetti";

export default function CreateCV() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>(
    personalDetailsPreset,
  );
  const [file, setFile] = useState<File | null>(null);
  const [theme, setTheme] = useState<string>("cupcake");
  const [zoom, setZoom] = useState<number>(163);
  const [experiences, setExperience] =
    useState<Experience[]>(experiencesPreset);
  const [educations, setEducations] = useState<Education[]>(educationsPreset);
  const [languages, setLanguages] = useState<Language[]>(languagesPreset);
  const [skills, setSkills] = useState<Skill[]>(skillsPreset);
  const [hobbies, setHobbies] = useState<Hobby[]>(hobbiesPreset);
  const [cvTitle, setCvTitle] = useState("Mon CV");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isDraft, setIsDraft] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCvId, setEditingCvId] = useState<string | null>(null);

  // Charger depuis localStorage au montage
  useEffect(() => {
    const savedDraft = localStorage.getItem("cv-draft");
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setCvTitle(draft.title || "Mon CV");
        setPersonalDetails(draft.personalDetails || personalDetailsPreset);
        setExperience(draft.experiences || experiencesPreset);
        setEducations(draft.educations || educationsPreset);
        setLanguages(draft.languages || languagesPreset);
        setSkills(draft.skills || skillsPreset);
        setHobbies(draft.hobbies || hobbiesPreset);
        setTheme(draft.theme || "cupcake");
        setLastSaved(new Date(draft.lastSaved));
        
        // Debug: vérifier si l'image est présente
        if (draft.personalDetails?.profileImage) {
          console.log("✅ Image trouvée dans le draft, taille:", draft.personalDetails.profileImage.length);
        } else {
          console.log("❌ Pas d'image dans le draft");
        }
        
        // Vérifier si on est en mode édition
        if (draft.isEditing && draft.editingId) {
          setIsEditMode(true);
          setEditingCvId(draft.editingId);
        }
      } catch (error) {
        console.error("Erreur lors du chargement du brouillon:", error);
      }
    }
  }, []);

  // Sauvegarde automatique dans localStorage
  useEffect(() => {
    const saveDraft = () => {
      // Debug: vérifier si l'image est toujours là
      if (personalDetails.profileImage) {
        console.log("💾 Sauvegarde auto: image présente");
      } else {
        console.log("⚠️ Sauvegarde auto: image manquante!");
      }
      
      const draft = {
        title: cvTitle,
        personalDetails,
        experiences,
        educations,
        languages,
        skills,
        hobbies,
        theme,
        lastSaved: new Date().toISOString(),
        isEditing: isEditMode,
        editingId: editingCvId,
      };
      localStorage.setItem("cv-draft", JSON.stringify(draft));
      setLastSaved(new Date());
    };

    const timer = setTimeout(saveDraft, 2000); // Sauvegarde après 2 secondes d'inactivité
    return () => clearTimeout(timer);
  }, [cvTitle, personalDetails, experiences, educations, languages, skills, hobbies, theme]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    
    if (!userData || !token) {
      alert("Session expirée. Veuillez vous reconnecter.");
      localStorage.clear();
      router.push("/auth/signin");
      return;
    }
    
    setUser(JSON.parse(userData));
  }, [router]);

  // Charger l'image par défaut uniquement pour un nouveau CV
  useEffect(() => {
    const savedDraft = localStorage.getItem("cv-draft");
    
    // Ne charger l'image par défaut QUE s'il n'y a pas de draft
    if (!savedDraft) {
      const defaultImageUrl = "/profile.jpg";
      fetch(defaultImageUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const defaultFile = new File([blob], "profile.jpg", {
            type: blob.type,
          });

          setFile(defaultFile);
        })
        .catch((err) => console.log("Pas d'image par défaut"));
    }
  }, []); // Exécuter une seule fois au montage

  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ];

  const handleResetPersonalDetails = () =>
    setPersonalDetails({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      postSeeking: "",
      description: "",
    });

  const handleResetExperiences = () => setExperience([]);
  const handleResetEducations = () => setEducations([]);
  const handleResetLanguages = () => setLanguages([]);
  const handleResetSkills = () => setSkills([]);
  const handleResetHobbies = () => setHobbies([]);

  const cvPreviewRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    const element = cvPreviewRef.current;
    if (element) {
      try {
        const canvas = await html2canvas(element, {
          scale: 3,
          useCORS: true,
        });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "A4",
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${cvTitle || "cv"}.pdf`);

        const modal = document.getElementById(
          "my_modal_3",
        ) as HTMLDialogElement;
        if (modal) {
          modal.close();
        }

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          zIndex: 9999,
        });
      } catch (error) {
        console.error("Erreur lors de la génération du PDF :", error);
      }
    }
  };

  const handleSave = async (asDraft = false) => {
    setIsSaving(true);
    try {
      // Récupérer l'utilisateur et le token
      const userData = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      
      if (!userData || !token) {
        alert("Session expirée. Veuillez vous reconnecter.");
        setIsSaving(false);
        router.push("/auth/signin");
        return;
      }
      
      const currentUser = JSON.parse(userData);
      
      // Convertir l'image en base64 si elle existe
      let personalDetailsWithImage = { ...personalDetails };
      if (file) {
        console.log("📸 Conversion de l'image en base64...");
        const reader = new FileReader();
        const base64Promise = new Promise<string>((resolve) => {
          reader.onloadend = () => {
            console.log("✅ Image convertie, taille:", (reader.result as string).length);
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
        personalDetailsWithImage.profileImage = await base64Promise;
        console.log("✅ Image ajoutée à personalDetails");
      } else {
        console.log("⚠️ Pas de fichier image à sauvegarder");
      }
      
      // Préparer les données avec la fonction utilitaire
      const cvData = prepareCVForAPI({
        userId: currentUser.id,
        title: cvTitle,
        personalDetails: personalDetailsWithImage,
        experiences,
        educations,
        languages,
        skills,
        hobbies,
        theme,
        template: "classic",
        isDraft: asDraft,
      });
      
      console.log("📤 Envoi du CV:", { 
        userId: currentUser.id, 
        title: cvTitle, 
        isEditMode, 
        editingCvId,
        apiUrl: isEditMode ? "/api/cv/update" : "/api/cv/save",
        method: isEditMode ? "PUT" : "POST"
      });
      
      // Choisir l'API selon le mode (création ou édition)
      const apiUrl = isEditMode ? "/api/cv/update" : "/api/cv/save";
      const method = isEditMode ? "PUT" : "POST";
      
      // Ajouter l'ID du CV si on est en mode édition
      if (isEditMode && editingCvId) {
        cvData.cvId = editingCvId;
      }
      
      console.log("📦 Données envoyées:", {
        cvId: cvData.cvId,
        title: cvData.title,
        personalDetailsName: cvData.personalDetails?.fullName,
        hasImage: !!cvData.personalDetails?.profileImage
      });
      
      const response = await fetch(apiUrl, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(cvData),
      });

      console.log("Réponse API:", response.status, response.ok);

      if (response.ok) {
        const data = await response.json();
        console.log("Données reçues:", data);
        
        // Mettre à jour l'utilisateur dans localStorage
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          setUser(data.user);
        }
        
        if (!asDraft) {
          console.log("Déclenchement confettis et redirection");
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            zIndex: 9999,
          });
          // Supprimer le brouillon localStorage après sauvegarde finale
          localStorage.removeItem("cv-draft");
          const successMessage = isEditMode ? "✅ CV mis à jour avec succès !" : "✅ CV créé avec succès !";
          alert(successMessage);
          setTimeout(() => {
            router.push("/dashboard");
          }, 500);
        } else {
          setLastSaved(new Date());
          setIsDraft(true);
          alert("✅ Brouillon sauvegardé !");
        }
      } else {
        const error = await response.json();
        console.error("Erreur API:", error);
        alert("❌ " + (error.error || "Erreur lors de la sauvegarde"));
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la sauvegarde du CV");
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="hidden lg:block bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
        {/* Header Global */}
        <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
          <div className="max-w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
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
                <div className="h-8 w-px bg-gray-200"></div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">Éditeur de CV</h2>
                  <p className="text-xs text-gray-600">
                    {isEditMode ? "Mode édition" : "Mode création"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <input
                    type="text"
                    value={cvTitle}
                    onChange={(e) => setCvTitle(e.target.value)}
                    className="input input-bordered input-sm w-64 bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    placeholder="Titre du CV"
                  />
                  {lastSaved && (
                    <span className="text-xs text-gray-500 mt-1">
                      Sauvegardé à {lastSaved.toLocaleTimeString()}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSave(false)}
                    disabled={isSaving}
                    className="btn btn-sm bg-green-600 text-white hover:bg-green-700 border-none gap-2 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Enregistrement...
                      </>
                    ) : (
                      <>
                        <Save className="w-4" />
                        Enregistrer
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleSave(true)}
                    disabled={isSaving}
                    className="btn btn-sm bg-gray-600 text-white hover:bg-gray-700 border-none gap-2 disabled:opacity-50"
                  >
                    <Save className="w-4" />
                    Brouillon
                  </button>
                  <button
                    className="btn btn-sm btn-primary gap-2"
                    onClick={() =>
                      (
                        document.getElementById("my_modal_3") as HTMLDialogElement
                      ).showModal()
                    }
                  >
                    <Eye className="w-4" />
                    Aperçu
                  </button>
                  <Link
                    href="/dashboard"
                    className="btn btn-sm btn-ghost text-gray-600 hover:text-gray-900"
                  >
                    <ArrowLeft className="w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="flex items-center h-screen pt-16">
          <div className="w-1/3 h-full bg-white scrollable no-scrollbar shadow-lg border-r border-gray-200">

            {/* Contenu scrollable */}
            <div className="p-6 space-y-5">
              {/* Section Informations Personnelles */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-base font-semibold text-gray-900">
                    Informations personnelles
                  </h2>
                  <button
                    onClick={handleResetPersonalDetails}
                    className="p-2 rounded hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
                    title="Réinitialiser"
                  >
                    <RotateCw className="w-4" />
                  </button>
                </div>
                <PersonalDetailsForm
                  personalDetails={personalDetails}
                  setPersonalDetails={setPersonalDetails}
                  setFile={setFile}
                />
              </div>

              {/* Section Expériences */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-base font-semibold text-gray-900">
                    Expériences professionnelles
                  </h2>
                  <button
                    onClick={handleResetExperiences}
                    className="p-2 rounded hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
                    title="Réinitialiser"
                  >
                    <RotateCw className="w-4" />
                  </button>
                </div>
                <ExperienceForm
                  experiences={experiences}
                  setExperiences={setExperience}
                />
              </div>

              {/* Section Éducations */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-base font-semibold text-gray-900">
                    Formations
                  </h2>
                  <button
                    onClick={handleResetEducations}
                    className="p-2 rounded hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
                    title="Réinitialiser"
                  >
                    <RotateCw className="w-4" />
                  </button>
                </div>
                <EducationForm
                  educations={educations}
                  setEducations={setEducations}
                />
              </div>

              {/* Section Langues */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-base font-semibold text-gray-900">
                    Langues
                  </h2>
                  <button
                    onClick={handleResetLanguages}
                    className="p-2 rounded hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
                    title="Réinitialiser"
                  >
                    <RotateCw className="w-4" />
                  </button>
                </div>
                <LanguageForm languages={languages} setLanguages={setLanguages} />
              </div>

              {/* Section Compétences & Loisirs */}
              <div className="grid grid-cols-2 gap-4">
                {/* Compétences */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-sm font-semibold text-gray-900">
                      Compétences
                    </h2>
                    <button
                      onClick={handleResetSkills}
                      className="p-2 rounded hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
                      title="Réinitialiser"
                    >
                      <RotateCw className="w-3" />
                    </button>
                  </div>
                  <SkillForm skills={skills} setSkills={setSkills} />
                </div>

                {/* Loisirs */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-sm font-semibold text-gray-900">
                      Loisirs
                    </h2>
                    <button
                      onClick={handleResetHobbies}
                      className="p-2 rounded hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
                      title="Réinitialiser"
                    >
                      <RotateCw className="w-3" />
                    </button>
                  </div>
                  <HobbyForm hobbies={hobbies} setHobbies={setHobbies} />
                </div>
              </div>

              {/* Espace en bas pour le scroll */}
              <div className="h-20"></div>
            </div>
          </div>

          <div className="w-2/3 h-full bg-base-100 bg-[url('/file.svg')] bg-cover bg-center scrollable-preview relative">
            {/* Barre de contrôle en bas */}
            <div className="fixed bottom-8 right-8 z-10 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg p-4">
              <div className="flex flex-col gap-4">
                {/* Contrôle de zoom */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-gray-700">Zoom</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={50}
                      max={200}
                      value={zoom}
                      onChange={(e) => setZoom(Number(e.target.value))}
                      className="range range-xs range-primary w-32"
                    />
                    <span className="text-sm font-medium text-indigo-600 min-w-[45px]">
                      {zoom}%
                    </span>
                  </div>
                </div>

                {/* Sélecteur de thème */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-gray-700">Thème</label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="select select-bordered select-sm w-full bg-white"
                  >
                    {themes.map((themeName) => (
                      <option key={themeName} value={themeName}>
                        {themeName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div
              className="flex justify-center items-center"
              style={{
                transform: `scale(${zoom / 200})`,
              }}
            >
              <CVPreview
                personalDetails={personalDetails}
                file={file}
                theme={theme}
                experiences={experiences}
                educations={educations}
                languages={languages}
                hobbies={hobbies}
                skills={skills}
              />
            </div>
          </div>
        </section>

        <dialog id="my_modal_3" className="modal backdrop-blur-sm">
          <div className="modal-box w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 bg-base-100 shadow-2xl">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 hover:bg-error/10 hover:text-error transition-all">
                ✕
              </button>
            </form>

            <div className="mt-5">
              {/* Header de la modale */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  Aperçu de votre CV
                </h3>
                <p className="text-sm text-base-content/60">
                  Vérifiez votre CV avant de le sauvegarder ou de le télécharger
                </p>
              </div>

              {/* Boutons d'action */}
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={() => handleSave(true)}
                  disabled={isSaving}
                  className="btn btn-outline btn-sm gap-2"
                >
                  <Save className="w-4" />
                  Sauvegarder comme brouillon
                </button>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleSave(false)}
                    disabled={isSaving}
                    className="btn btn-success gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Sauvegarde...
                      </>
                    ) : (
                      <>
                        <Save className="w-4" />
                        Sauvegarder et publier
                      </>
                    )}
                  </button>
                  <button 
                    onClick={handleDownloadPdf} 
                    className="btn btn-primary gap-2 shadow-lg hover:shadow-xl transition-all"
                  >
                    <Save className="w-4" />
                    Télécharger PDF
                  </button>
                </div>
              </div>

              {/* Aperçu du CV */}
              <div className="w-full overflow-auto bg-base-200 rounded-xl p-6 shadow-inner">
                <div className="w-full flex justify-center items-center">
                  <CVPreview
                    personalDetails={personalDetails}
                    file={file}
                    theme={theme}
                    experiences={experiences}
                    educations={educations}
                    languages={languages}
                    hobbies={hobbies}
                    skills={skills}
                    download={true}
                    ref={cvPreviewRef}
                  />
                </div>
              </div>
            </div>
          </div>
        </dialog>
      </div>

      <div className="lg:hidden">
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-3xl font-bold">
                Désolé, le CV Builder est uniquement accessible sur ordinateur.
              </h1>
              <Image
                src="/sad-sorry.gif"
                width={500}
                height={500}
                alt="Picture of the author"
                className="mx-auto my-6"
              />
              <p className="py-6">
                Pour créer et personnaliser votre CV, veuillez utiliser un
                ordinateur. Nous vous remercions de votre compréhension.
              </p>
              <Link href="/dashboard" className="btn btn-primary">
                <ArrowLeft className="w-4 mr-2" />
                Retour au Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
