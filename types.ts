import React from 'react';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  avatar: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ProjectImage {
  id: string;
  url: string;
  title: string;
  isGenerated?: boolean;
}

export enum NavigationLinks {
  HOME = '/',
  SERVICES = '/services',
  PROJECTS = '/projects', // Gallery
  ABOUT = '/about',
  CONTACT = '/contact',
}