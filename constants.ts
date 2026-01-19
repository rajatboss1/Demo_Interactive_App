
import { AppNode, ContentType } from './types';

export const APP_FLOW: Record<string, AppNode> = {
  '1': {
    id: '1',
    epNum: 'Ep1',
    title: 'Intro – Cricket Journey',
    contentType: ContentType.VIDEO,
    dialogue: '“Cricket sirf talent nahi… repeat performance ka game hai.”',
    actions: [{ label: 'Start', nextNode: '2' }]
  },
  '2': {
    id: '2',
    title: 'Pick Your Struggle',
    contentType: ContentType.BUTTON,
    dialogue: '“Har player ka silent killer hota hai. Choose yours.”',
    actions: [
      { label: 'Guidance', nextNode: '3' },
      { label: 'Fatigue', nextNode: '12' }, // Directly to Gym Access Check as requested
      { label: 'Shot Technique', nextNode: '7' },
      { label: 'Power', nextNode: '7' }
    ]
  },
  '3': {
    id: '3',
    epNum: 'Ep2',
    title: 'Professional Cricket Journey Intro',
    contentType: ContentType.VIDEO,
    chatGoal: 'Commitment Filter',
    chatPrompt: '“Are you serious about professional cricket?”',
    dialogue: '“Yeh path sirf disciplined players ke liye hai.”',
    actions: [{ label: 'Continue', nextNode: '4' }]
  },
  '4': {
    id: '4',
    title: 'Select Pro Level',
    contentType: ContentType.BUTTON,
    actions: [
      { label: 'Ep2A U14', nextNode: '5A' },
      { label: 'Ep2B U19', nextNode: '5B' },
      { label: 'Ep2C U23', nextNode: '5C' },
      { label: 'Ep2D 23+', nextNode: '5D' }
    ]
  },
  '5A': {
    id: '5A',
    epNum: 'Ep2A',
    title: 'U14 Path',
    contentType: ContentType.VIDEO,
    chatGoal: 'Foundation Awareness',
    chatPrompt: '“Academy training regular?”',
    dialogue: 'Junior discipline intro. Basics are the foundation of your career.',
    actions: [{ label: 'Continue', nextNode: '15' }] // Leads to State Application Help
  },
  '5B': {
    id: '5B',
    epNum: 'Ep2B',
    title: 'U19 Path',
    contentType: ContentType.VIDEO,
    chatGoal: 'Pressure Prep',
    chatPrompt: '“Trials ready?”',
    dialogue: 'Competitive mindset intro. The field gets narrower here.',
    actions: [{ label: 'Continue', nextNode: '15' }] // Leads to State Application Help
  },
  '5C': {
    id: '5C',
    epNum: 'Ep2C',
    title: 'U23 Path',
    contentType: ContentType.VIDEO,
    chatGoal: 'Career Clarity',
    chatPrompt: '“State ambition?”',
    dialogue: 'Semi-pro direction. This is where you separate from the crowd.',
    actions: [{ label: 'Continue', nextNode: '15' }] // Leads to State Application Help
  },
  '5D': {
    id: '5D',
    epNum: 'Ep2D',
    title: '23+ Senior Path',
    contentType: ContentType.VIDEO,
    chatGoal: 'Reality Check',
    chatPrompt: '“Still chasing pro?”',
    dialogue: 'Elite survival tone. Only the strongest mindsets survive.',
    actions: [{ label: 'Continue', nextNode: '15' }] // Leads to State Application Help
  },
  '15': {
    id: '15',
    title: 'State Cricket Application Help',
    contentType: ContentType.CHAT,
    chatGoal: 'Career Support',
    chatPrompt: '“Need help applying for state cricket?”',
    actions: [{ label: 'Start Assistance', nextNode: '6' }] // Leads to Professional Mindset
  },
  '6': {
    id: '6',
    epNum: 'Ep3',
    title: 'Professional Mindset',
    contentType: ContentType.VIDEO,
    chatGoal: 'Mental Conditioning',
    chatPrompt: '“Ready to commit to structured training?”',
    dialogue: '“Game dimaag se jeeta jaata hai.”',
    actions: [{ label: 'Continue', nextNode: '10' }]
  },
  '7': {
    id: '7',
    epNum: 'Ep4',
    title: 'Skill Hub Intro',
    contentType: ContentType.VIDEO,
    dialogue: '“Weakest shot pe kaam karna hi growth hai.”',
    actions: [
      { label: 'Drive On', nextNode: '8A' },
      { label: 'Drive Off', nextNode: '8B' },
      { label: 'Pull', nextNode: '8C' },
      { label: 'Cut', nextNode: '8D' },
      { label: 'Step Out', nextNode: '8E' },
      { label: 'Range Hitting', nextNode: '8F' },
      { label: 'Proceed to Training', nextNode: '10' }
    ]
  },
  '8A': { id: '8A', epNum: 'Ep4A', title: 'Drive On', contentType: ContentType.VIDEO, dialogue: 'Shot correction drills for the Drive On.', actions: [{ label: 'Back', nextNode: '7' }] },
  '8B': { id: '8B', epNum: 'Ep4B', title: 'Drive Off', contentType: ContentType.VIDEO, dialogue: 'Shot correction drills for the Drive Off.', actions: [{ label: 'Back', nextNode: '7' }] },
  '8C': { id: '8C', epNum: 'Ep4C', title: 'Pull Shot', contentType: ContentType.VIDEO, dialogue: 'Shot correction drills for the Pull Shot.', actions: [{ label: 'Back', nextNode: '7' }] },
  '8D': { id: '8D', epNum: 'Ep4D', title: 'Cut Shot', contentType: ContentType.VIDEO, dialogue: 'Shot correction drills for the Cut Shot.', actions: [{ label: 'Back', nextNode: '7' }] },
  '8E': { id: '8E', epNum: 'Ep4E', title: 'Step Out Six', contentType: ContentType.VIDEO, dialogue: 'Shot correction drills for Step Out hitting.', actions: [{ label: 'Back', nextNode: '7' }] },
  '8F': { id: '8F', epNum: 'Ep4F', title: 'Range Hitting', contentType: ContentType.VIDEO, dialogue: 'Shot correction drills for explosive Range Hitting.', actions: [{ label: 'Back', nextNode: '7' }] },
  '10': {
    id: '10',
    epNum: 'Ep5',
    title: 'Season Intro',
    contentType: ContentType.VIDEO,
    dialogue: '“Season decide karta hai training.”',
    actions: [
      { label: 'Off Season', nextNode: '11A' },
      { label: 'Pre Season', nextNode: '11B' },
      { label: 'In Season', nextNode: '11C' },
      { label: 'Post Season', nextNode: '11D' }
    ]
  },
  '11A': { id: '11A', epNum: 'Ep5A', title: 'Off Season Intro', contentType: ContentType.VIDEO, chatGoal: 'Weakness Eval', chatPrompt: '“Biggest physical weakness?”', dialogue: '“Off-season growth phase hai.”', actions: [{ label: 'Start', nextNode: '12' }] },
  '11B': { id: '11B', epNum: 'Ep5B', title: 'Pre Season Intro', contentType: ContentType.VIDEO, chatGoal: 'Readiness', chatPrompt: '“Match preparation started?”', dialogue: '“Explosive banna zaroori hai.”', actions: [{ label: 'Start', nextNode: '12' }] },
  '11C': { id: '11C', epNum: 'Ep5C', title: 'In Season Intro', contentType: ContentType.VIDEO, chatGoal: 'Consistency', chatPrompt: '“Training regular?”', dialogue: '“Maintain nahi, sharpen karo.”', actions: [{ label: 'Start', nextNode: '12' }] },
  '11D': { id: '11D', epNum: 'Ep5D', title: 'Post Season Intro', contentType: ContentType.VIDEO, chatGoal: 'Recovery Reflection', chatPrompt: '“Restart stronger?”', dialogue: '“Recovery bhi training hai.”', actions: [{ label: 'Start', nextNode: '12' }] },
  '12': {
    id: '12',
    title: 'Gym Access Check',
    contentType: ContentType.CHAT,
    chatGoal: 'Environment Detection',
    chatPrompt: '“Do you have gym access?”',
    actions: [
      { label: 'Gym', nextNode: '13G' },
      { label: 'No Gym', nextNode: '13NG' }
    ]
  },
  '13G': {
    id: '13G',
    epNum: 'Ep6',
    title: 'Gym Program',
    contentType: ContentType.VIDEO,
    chatGoal: 'Accountability',
    chatPrompt: '“Workout complete?”',
    dialogue: 'Strength & conditioning in the gym environment.',
    actions: [
      { label: 'Day 1 Complete', nextNode: '14' },
      { label: 'Day 2 Complete', nextNode: '14' },
      { label: 'Day 3 Complete', nextNode: '14' },
      { label: 'Day 4 Complete', nextNode: '14' }
    ]
  },
  '13NG': {
    id: '13NG',
    epNum: 'Ep6A',
    title: 'No Gym Program',
    contentType: ContentType.VIDEO,
    chatGoal: 'Accountability',
    chatPrompt: '“Home session done?”',
    dialogue: 'Bodyweight cricket fitness at home.',
    actions: [
      { label: 'Day 1 Complete', nextNode: '14' },
      { label: 'Day 2 Complete', nextNode: '14' },
      { label: 'Day 3 Complete', nextNode: '14' },
      { label: 'Day 4 Complete', nextNode: '14' }
    ]
  },
  '14': {
    id: '14',
    title: 'Daily Completion Check',
    contentType: ContentType.CHAT,
    chatGoal: 'Retention',
    chatPrompt: '“Ready for next session?”',
    actions: [{ label: 'Continue Training', nextNode: 'loop' }]
  }
};
