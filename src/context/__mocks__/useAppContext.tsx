import { IAppContext } from '../AppContext.tsx';
import { resumePreviewData } from '../../constants/resumePreviewData.tsx';

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
      icon: 'email_icon.png',
    },
    {
      info: '+1 234 567 890',
      icon: 'phone_icon.png',
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

const useAppContext = (): IAppContext => {
  return {
    submitResume: mockSubmitResume,
    loadSavedFormData: mockLoadSavedFormData,
    formData: mockFormData,
    resumeData: resumePreviewData,
  };
};

export { mockLoadSavedFormData, mockSubmitResume, mockFormData };
export default useAppContext;
