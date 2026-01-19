
export enum ContentType {
  VIDEO = 'Video',
  CHAT = 'Chat',
  BUTTON = 'Button'
}

export interface ActionButton {
  label: string;
  nextNode: string;
  variant?: 'primary' | 'secondary' | 'danger';
}

export interface AppNode {
  id: string;
  epNum?: string;
  title: string;
  contentType: ContentType;
  actions: ActionButton[];
  chatPrompt?: string;
  dialogue?: string;
  chatGoal?: string;
}

export interface TrainingState {
  currentNodeId: string;
  trainingDay: number;
  gymAccess: boolean | null;
  history: string[];
}
