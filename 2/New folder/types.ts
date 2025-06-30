import React from 'react';

export type NavItemType = 'dashboard' | 'outline' | 'characters' | 'storyboard' | 'locations' | 'voice' | 'marketing';

export interface NavItem {
  id: NavItemType;
  label: string;
  icon: React.ReactElement<{ className?: string }>;
}

export interface Character {
  name: string;
  description: string;
  imageUrl: string;
}

export interface Location {
    name: string;
    description: string;
    imageUrl: string;
}

export interface StoryboardPanel {
  scene: number;
  description: string;
  shotType: string;
  imageUrl: string;
}

export interface Outline {
  title: string;
  logline: string;
  acts: {
    act: number;
    title: string;
    summary: string;
    scenes: {
        scene: number;
        description: string;
    }[];
  }[];
}