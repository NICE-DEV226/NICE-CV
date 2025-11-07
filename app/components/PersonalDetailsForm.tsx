import { PersonalDetails } from '@/type';
import React from 'react'

type Props = {
  personalDetails: PersonalDetails;
  setPersonalDetails: (pd: PersonalDetails) => void;
  setFile: (file: File | null) => void;
}

const PersonalDetailsForm: React.FC<Props> = ({ personalDetails, setPersonalDetails, setFile }) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fied: keyof PersonalDetails) => {
    setPersonalDetails({ ...personalDetails, [fied]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <input
        type="text"
        placeholder='Nom complet'
        value={personalDetails.fullName}
        onChange={(e) => handleChange(e, 'fullName')}
        className='input input-bordered w-full'
      />
      <div className='flex'>
        <input
          type="email"
          placeholder='Email'
          value={personalDetails.email}
          onChange={(e) => handleChange(e, 'email')}
          className='input input-bordered w-full'
        />
        <input
          type="email"
          placeholder='Numéro de téléphone'
          value={personalDetails.phone}
          onChange={(e) => handleChange(e, 'phone')}
          className='input input-bordered w-full ml-4'
        />
      </div>

      <input
        type="text"
        placeholder='Addresse'
        value={personalDetails.address}
        onChange={(e) => handleChange(e, 'address')}
        className='input input-bordered w-full'
      />

      <div className='flex flex-col gap-2'>
        <label className='text-sm font-medium text-gray-700'>Photo de profil</label>
        {personalDetails.profileImage && (
          <div className='flex items-center gap-3 mb-2'>
            <img 
              src={personalDetails.profileImage} 
              alt="Photo actuelle" 
              className='w-20 h-20 rounded-full object-cover border-2 border-gray-300'
            />
            <span className='text-sm text-gray-600'>Photo actuelle</span>
          </div>
        )}
        <input
          type="file"
          accept='image/*'
          onChange={handleFileChange}
          className='file-input file-input-bordered w-full file-input-primary'
        />
        <p className='text-xs text-gray-500'>Choisissez une nouvelle photo pour remplacer l&apos;actuelle</p>
      </div>

      <input
        type="text"
        placeholder='Post Recherché'
        value={personalDetails.postSeeking}
        onChange={(e) => handleChange(e, 'postSeeking')}
        className='input input-bordered w-full'
      />

      <textarea
        placeholder='Description de la personne'
        value={personalDetails.description}
        onChange={(e) => handleChange(e, 'description')}
        className='input input-bordered w-full'
      ></textarea>


    </div>
  )
}

export default PersonalDetailsForm
