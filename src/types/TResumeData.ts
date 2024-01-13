import { ReactNode } from 'react';

interface IUserInterest {
  name: string;
  icon: string;
}

interface IUserEducation {
  speciality: string;
  institution: string;
  educationPeriod: string;
  description: string;
}

interface ISkillDetails {
  variant?: string; // different variants of a skill
  level: string; // level in percentages
}
interface IUserSkill {
  name: string;
  details: ISkillDetails[];
}

interface IPositionExplore {
  positionName: string;
  companyName: string;
  workingPeriod: string;
  description: string;
}

type TInfoTypes = 'dayOfBirth' | 'city' | 'languages';
interface IInfoItem {
  type: TInfoTypes;
  value: string;
}

interface IContactElement {
  info: string;
  icon: ReactNode;
}

interface IPersonPhoto {
  photoLink: string;
}

interface IPersonProfile {
  profile: string;
}

interface IUserSectionProps {
  userName: string;
  desiredJob: string;
}

type TResumeData = IUserSectionProps &
  IPersonProfile &
  IPersonPhoto & {
    info: IInfoItem[];
    contacts: IContactElement[];
    experience: IPositionExplore[];
    skills: IUserSkill[];
    education: IUserEducation[];
    interests: IUserInterest[];
  };

export type {
  TResumeData,
  TInfoTypes,
  IUserSkill,
  IUserEducation,
  IUserInterest,
  IPositionExplore,
  IInfoItem,
  IContactElement,
  IPersonPhoto,
  IPersonProfile,
  IUserSectionProps,
  ISkillDetails,
};
