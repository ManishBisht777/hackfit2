export interface AuthState {
  email: string;
  userName: string;
  id: string;
  photoUrl: string;
}

export interface Comment {
  userName: string;
  comment: string;
  photoUrl: string;
}

export interface Goal {
  name: string;
  description: string;
  user: AuthState;
  comments: Array<Comment> | null;
}
