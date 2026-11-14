import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Student } from '../../models/student.model';
import { SavedService } from '../../services/saved.service';

@Component({
  imports: [RouterLink],
  selector: 'app-student-card',
  styleUrl: './student-card.css',
  templateUrl: './student-card.html',
})
export class StudentCard {
  readonly student = input.required<Student>();

  private readonly saved = inject(SavedService);

  protected readonly isSaved = computed(() => this.saved.isSaved(this.student().id));

  // Becomes true if the photo file cannot be loaded.
  private readonly imageFailed = signal(false);

  // The photo to show: the student's photo, or a placeholder if it failed.
  protected readonly photoSrc = computed(() =>
    this.imageFailed() ? 'icons/user-round.svg' : this.student().photo,
  );

  // Called by (error) in the template when the <img> fails to load.
  protected onImageError(): void {
    this.imageFailed.set(true);
  }

  protected onToggleSaved(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.saved.toggle(this.student().id);
  }
}