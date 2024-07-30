import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  of,
  Subscribable,
  Subscriber,
  Subscription,
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
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {
  users: User[] = [];
  searchResults: User[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  validInput: boolean = true;
  searchId: string = '';
  isLoading: boolean = false;

  private subscriptoin: Subscription = new Subscription();

  private cachedUsers = new Map<number, User[]>();
  private cachedUser = new Map<number, User>();

  @ViewChild('searchInput', { static: true }) input: ElementRef;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userPage(this.currentPage);
  }

  ngAfterViewInit(): void {
    const inputSub = fromEvent(this.input.nativeElement, 'input')
      .pipe(
        tap(() => {
          this.isLoading = true;
        }),
        map((event: any) => {
          this.searchId = event.target.value;
          const id = parseInt(this.searchId, 10);
          return id;
        }),

        debounceTime(300),

        distinctUntilChanged(),

        switchMap((id) => {
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

    this.subscriptoin.add(inputSub);
  }

  userPage(page: number) {
    if (this.cachedUsers.has(page)) {
      this.users = this.cachedUsers.get(page)!;
      this.currentPage = page;
    } else {
      const userPageSub = this.userService
        .getUsers(page)
        .subscribe((response) => {
          this.users = response.data;
          this.currentPage = response.page;
          this.totalPages = response.total_pages;
          this.cachedUsers.set(page, response.data);
        });

      this.subscriptoin.add(userPageSub);
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

  ngOnDestroy(): void {
    this.subscriptoin.unsubscribe();
  }
}

//
//
//
//this code when i thring to implemant NGRX I was know it 50% but i search for it and tring to implement it
// import {
//   AfterViewInit,
//   Component,
//   ElementRef,
//   OnDestroy,
//   OnInit,
//   ViewChild,
// } from '@angular/core';
// import { fromEvent, of, Subscription } from 'rxjs';
// import {
//   debounceTime,
//   distinctUntilChanged,
//   map,
//   switchMap,
// } from 'rxjs/operators';
// import { Store, select } from '@ngrx/store';

// import { loadUsers, loadUser } from '../../store/user.actions';
// import { UserState } from '../../store/user.reducer';
// @Component({
//   selector: 'app-users',
//   templateUrl: './users.component.html',
//   styleUrls: ['./users.component.css'],
// })
// export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {
//   users$ = this.store.pipe(select((state) => state.usersState.users));
//   searchResults$ = this.store.pipe(
//     select((state) => state.usersState.searchResults)
//   );
//   currentPage$ = this.store.pipe(
//     select((state) => state.usersState.currentPage)
//   );
//   totalPages$ = this.store.pipe(select((state) => state.usersState.totalPages));
//   isLoading$ = this.store.pipe(select((state) => state.usersState.loading));
//   validInput: boolean = true;
//   searchId: string = '';

//   private subscriptions: Subscription = new Subscription();

//   @ViewChild('searchInput', { static: true }) input: ElementRef;

//   constructor(private store: Store<{ usersState: UserState }>) {}

//   ngOnInit(): void {
//     this.userPage(1);
//   }

//   ngAfterViewInit(): void {
//     const inputSub = fromEvent(this.input.nativeElement, 'input')
//       .pipe(
//         debounceTime(300),
//         distinctUntilChanged(),
//         map((event: any) => {
//           this.searchId = event.target.value;
//           return parseInt(this.searchId, 10);
//         }),
//         switchMap((id) => {
//           if (id >= 1 && id <= 12) {
//             this.validInput = true;
//             return of(this.store.dispatch(loadUser({ id })));
//           } else {
//             this.validInput = false;
//             return of(null);
//           }
//         })
//       )
//       .subscribe();

//     this.subscriptions.add(inputSub);
//   }

//   userPage(page: number) {
//     this.store.dispatch(loadUsers({ page }));
//   }

//   nextPage() {
//     const nextPageSub = this.currentPage$.subscribe((currentPage) => {
//       this.totalPages$.subscribe((totalPages) => {
//         if (currentPage < totalPages) {
//           this.userPage(currentPage + 1);
//         }
//       });
//     });

//     this.subscriptions.add(nextPageSub);
//   }

//   previousPage() {
//     const previousPageSub = this.currentPage$.subscribe((currentPage) => {
//       if (currentPage > 1) {
//         this.userPage(currentPage - 1);
//       }
//     });

//     this.subscriptions.add(previousPageSub);
//   }

//   ngOnDestroy(): void {
//     this.subscriptions.unsubscribe();
//   }
// }
