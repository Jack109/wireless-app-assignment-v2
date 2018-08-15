export interface Task {
    id?: number;
    title: string;
    content: string;
    pinned: 0 | 1;
    completed: 0 | 1;
    reminder: number; // epoch time in minutes
}