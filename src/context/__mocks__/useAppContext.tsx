import { IAppContext } from '../AppContext.tsx';
import { TResumeData } from '../../types/TResumeData.ts';
import phoneIcon from '../../assets/icons/phone.svg';
import emailIcon from '../../assets/icons/email.svg';

const mockSubmitResume = vi.fn();
const mockLoadSavedFormData = vi.fn();
const mockFormData = {
  userName: 'John Doe',
  desiredJob: 'Software Engineer',
  profile: 'A highly skilled software engineer with 5 years of experience in web development.',
  photoLink: {
    photo: 'https://example.com/photo.jpg',
    crop: {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    },
  },
  dayOfBirth: '1990-01-01',
  city: 'New York',
  languages: 'English, Spanish',
  contacts: [
    {
      info: 'john.doe@example.com',
      icon: emailIcon,
    },
    {
      info: '+1 234 567 890',
      icon: phoneIcon,
    },
  ],
  experience: [
    {
      positionName: 'Frontend Developer',
      companyName: 'Tech Corp',
      startDate: '2019-05-01',
      endDate: '2021-12-31',
      description: 'Worked on various frontend projects using React and TypeScript.',
    },
    {
      positionName: 'Backend Developer',
      companyName: 'Innovate Solutions',
      startDate: '2017-01-01',
      endDate: '2019-04-30',
      description: 'Developed backend services using Node.js and MongoDB.',
    },
  ],
  skills: [
    {
      name: 'JavaScript',
      details: [
        {
          variant: 'ES6+',
          level: '90%',
        },
      ],
    },
    {
      name: 'React',
      details: [
        {
          level: '85%',
        },
      ],
    },
  ],
  education: [
    {
      speciality: 'Computer Science',
      institution: 'University of Technology',
      startDate: '2012-09-01',
      endDate: '2016-06-30',
      description: 'Focused on software development and data structures.',
    },
  ],
  interests: [
    {
      name: 'Photography',
      icon: 'https://example.com/photo_icon.jpg',
    },
    {
      name: 'Traveling',
      icon: 'https://example.com/travel_icon.jpg',
    },
  ],
};

const mockResumeData: TResumeData = {
  userName: mockFormData.userName,
  desiredJob: mockFormData.desiredJob,
  profile: mockFormData.profile,
  photoLink: mockFormData.photoLink.photo,
  info: [
    { type: 'dayOfBirth', value: mockFormData.dayOfBirth },
    { type: 'city', value: mockFormData.city },
    { type: 'languages', value: mockFormData.languages },
  ],
  contacts: mockFormData.contacts,
  experience: mockFormData.experience.map(exp => ({
    positionName: exp.positionName,
    companyName: exp.companyName,
    workingPeriod: `${exp.startDate} - ${exp.endDate}`,
    description: exp.description,
  })),
  skills: mockFormData.skills.map(skill => ({
    name: skill.name,
    details: skill.details.map(detail => ({
      variant: 'variant' in detail ? detail.variant : '',
      level: detail.level,
    })),
  })),
  education: mockFormData.education.map(edu => ({
    speciality: edu.speciality,
    institution: edu.institution,
    educationPeriod: `${edu.startDate}-${edu.endDate}`,
    description: edu.description,
  })),
  interests: mockFormData.interests,
};

const useAppContext = (): IAppContext => {
  return {
    submitResume: mockSubmitResume,
    loadSavedFormData: mockLoadSavedFormData,
    formData: mockFormData,
    resumeData: mockResumeData,
  };
};

export { mockLoadSavedFormData, mockSubmitResume, mockFormData };
export default useAppContext;
