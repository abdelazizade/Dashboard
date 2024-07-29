import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../interface/userInterface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit {
  userId: number;
  user: User[] = [];
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userId = +this.route.snapshot.paramMap.get('id');
    this.getUserDetails();
  }

  getUserDetails() {
    this.userService.getUser(this.userId).subscribe((response) => {
      this.user = response.data;
      this.isLoading = false;
    });
  }
}
