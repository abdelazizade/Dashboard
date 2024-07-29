import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { UserService } from './../../services/user.service';
import { User } from '../../interface/userInterface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  searchResults: User[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  validInput: boolean = true;
  searchId: string = '';
  isLoading: boolean = false;

  private cachedUsers = new Map<number, User[]>();
  private cachedUser = new Map<number, User>();

  @ViewChild('searchInput', { static: true }) input: ElementRef;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userPage(this.currentPage);
  }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'input')
      .pipe(
        tap(() => {
          this.isLoading = true;
        }),
        debounceTime(300),

        distinctUntilChanged(),

        switchMap((event: any) => {
          this.searchId = event.target.value;

          const id = parseInt(this.searchId, 10);

          if (id >= 1 && id <= 12) {
            this.validInput = true;

            if (this.cachedUser.has(id)) {
              console.log('caching');
              this.isLoading = false;

              return of(this.cachedUser.get(id)!);
            } else {
              console.log(this.cachedUser);
              return this.userService.getUser(id);
            }
            //
          } else {
            this.validInput = false;
            this.isLoading = false;
            return of([]);
          }
        })
      )
      .subscribe((response: any) => {
        this.isLoading = false;
        if (this.validInput && response) {
          this.searchResults = [response.data ? response.data : response];
          if (response.data) {
            this.cachedUser.set(response.data.id, response.data);
          }
        } else {
          this.searchResults = [];
        }
      });
  }

  userPage(page: number) {
    if (this.cachedUsers.has(page)) {
      this.users = this.cachedUsers.get(page)!;
      this.currentPage = page;
    } else {
      this.userService.getUsers(page).subscribe((response) => {
        this.users = response.data;
        this.currentPage = response.page;
        this.totalPages = response.total_pages;
        this.cachedUsers.set(page, response.data);
      });
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.userPage(this.currentPage);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.userPage(this.currentPage);
    }
  }
}
