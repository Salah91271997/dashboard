export interface AuthUser {
  id: number;
  username: string;
  sessionId: string;
  isGuest: boolean;
  expiresAt?: string; // For guest sessions
}
export interface AuthUser {
  id: number;
  username: string;
  sessionId: string;
  isGuest: boolean;
  expiresAt?: string;
}

export interface RequestTokenResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface SessionResponse {
  success: boolean;
  session_id: string;
}

export interface AccountResponse {
  id: number;
  username: string;
  name: string;
  avatar?: {
    gravatar?: {
      hash: string;
    };
    tmdb?: {
      avatar_path: string;
    };
  };
}
export interface CreateUserRequest {
  username: string;
  password: string;
  email: string;
  name?: string;
}

export interface CreateUserResponse {
  success: boolean;
  status_code?: number;
  status_message?: string;
}
