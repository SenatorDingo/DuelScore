import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class AppComponent {
  team1Name = '';
  team2Name = '';
  team1Score = 0;
  team2Score = 0;

  lastAction: { team: number, change: number } | null = null;

  updateScore(team: number, change: number) {
    if (team === 1) {
      this.team1Score += change;
    } else if (team === 2) {
      this.team2Score += change;
    }

    this.lastAction = { team, change };
  }

  undo() {
    if (this.lastAction) {
      this.updateScore(this.lastAction.team, -this.lastAction.change);
      this.lastAction = null;
    }
  }
}
