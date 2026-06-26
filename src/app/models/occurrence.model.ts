export interface OccurrenceModel {
  idOccurrence: number;
  dayOfWeek: string; // "MONDAY", "TUESDAY", ecc.
  hours: number[];
  courseId: number;
  courseName: string;
}
