/*
 * FILE: student-card.ts
 * WHAT: The student card component. Shows one student's photo, name, faculty and quote.
 * WHY:  Keeps the card reusable. The directory page hands each student in through an input.
 */

import { Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-card',
  imports: [RouterLink],
  templateUrl: './student-card.html',
  styleUrl: './student-card.css',
})
export class StudentCard {
  // The parent page will give us one student through this input.
  readonly student = input.required<Student>();

  // Did the portrait fail to load? Starts as false (everything fine).
  private readonly imageFailed = signal(false);

  // The path actually shown: placeholder if the real image failed.
  protected readonly photoSrc = computed(() =>
    this.imageFailed() ? 'images/placeholder-portrait.svg' : this.student().photo,
  );

  // Called by the template when the image cannot be loaded.
  protected onImageError(): void {
    this.imageFailed.set(true);
  }
}