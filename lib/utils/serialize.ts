/**
 * Utilitaire de sérialisation pour éliminer les références circulaires
 * et les objets React des données avant envoi à l'API
 */

export function serializeCVData(data: any) {
  // Fonction récursive pour nettoyer les objets
  function clean(obj: any): any {
    // Valeurs primitives
    if (obj === null || obj === undefined) return null;
    if (typeof obj === 'string') return obj;
    if (typeof obj === 'number') return obj;
    if (typeof obj === 'boolean') return obj;
    
    // Tableaux
    if (Array.isArray(obj)) {
      return obj.map(item => clean(item));
    }
    
    // Objets
    if (typeof obj === 'object') {
      // Éviter les objets React et DOM
      if (obj.$$typeof || obj._owner || obj._store || obj.nodeType) {
        return null;
      }
      
      const cleaned: any = {};
      for (const key in obj) {
        // Ignorer les propriétés React internes
        if (key.startsWith('_') || key.startsWith('$') || key === 'ref') {
          continue;
        }
        
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];
          // Ignorer les fonctions
          if (typeof value === 'function') {
            continue;
          }
          cleaned[key] = clean(value);
        }
      }
      return cleaned;
    }
    
    return null;
  }
  
  return clean(data);
}

/**
 * Sérialise les données du CV pour l'envoi à l'API
 */
export function prepareCVForAPI(cvData: {
  userId: string;
  title: string;
  personalDetails: any;
  experiences: any[];
  educations: any[];
  languages: any[];
  skills: any[];
  hobbies: any[];
  theme: string;
  template: string;
  isDraft: boolean;
}) {
  return {
    userId: String(cvData.userId),
    title: String(cvData.title),
    personalDetails: {
      fullName: String(cvData.personalDetails?.fullName || ''),
      email: String(cvData.personalDetails?.email || ''),
      phone: String(cvData.personalDetails?.phone || ''),
      address: String(cvData.personalDetails?.address || ''),
      postSeeking: String(cvData.personalDetails?.postSeeking || ''),
      description: String(cvData.personalDetails?.description || ''),
      profileImage: cvData.personalDetails?.profileImage || null,
    },
    experiences: (cvData.experiences || []).map(exp => ({
      company: String(exp?.company || ''),
      position: String(exp?.position || ''),
      startDate: String(exp?.startDate || ''),
      endDate: String(exp?.endDate || ''),
      description: String(exp?.description || ''),
    })),
    educations: (cvData.educations || []).map(edu => ({
      school: String(edu?.school || ''),
      degree: String(edu?.degree || ''),
      startDate: String(edu?.startDate || ''),
      endDate: String(edu?.endDate || ''),
      description: String(edu?.description || ''),
    })),
    languages: (cvData.languages || []).map(lang => ({
      name: String(lang?.name || ''),
      level: String(lang?.level || ''),
    })),
    skills: (cvData.skills || []).map(skill => ({
      name: String(skill?.name || ''),
      level: String(skill?.level || ''),
    })),
    hobbies: (cvData.hobbies || []).map(hobby => ({
      name: String(hobby?.name || ''),
    })),
    theme: String(cvData.theme),
    template: String(cvData.template),
    isDraft: Boolean(cvData.isDraft),
  };
}
